import cv2
import numpy as np
import sys
import os
import time
import requests
from datetime import datetime
from collections import deque
from tensorflow.keras.models import load_model

if len(sys.argv) < 3:
    print("Usage: python violence_detector.py <stream_url> <camera_id>")
    sys.exit(1)

video_path = sys.argv[1]
camera_id = int(sys.argv[2])
print(f"Starting {camera_id} with stream: {video_path}")

API_URL = "https://cloud9.phraya.net/api/ai/violence"
UPLOAD_URL = "https://cloud9.phraya.net/api/upload/violence/image"

COOLDOWN_SECONDS = 30
last_upload_time = 0

try:
    model = load_model(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "./violence_detection_model.h5"
        )
    )
    print("Model loaded successfully")
except Exception as e:
    print(f"Error {str(e)}")
    sys.exit(1)


class OpticalFlowExtractor:
    def __init__(self, frame_size=(64, 64), max_frames=15):
        self.frame_size = frame_size
        self.max_frames = max_frames
        self.prev_frame = None
        self.flow_queue = deque(maxlen=max_frames)

    def process_frame(self, frame):
        gray = cv2.cvtColor(cv2.resize(frame, self.frame_size), cv2.COLOR_BGR2GRAY)
        if self.prev_frame is None:
            self.prev_frame = gray
            return None

        flow = cv2.calcOpticalFlowFarneback(
            self.prev_frame, gray, None, 0.5, 3, 5, 3, 5, 1.1, 0
        )
        self.prev_frame = gray

        self.flow_queue.append(flow)
        if len(self.flow_queue) < self.max_frames:
            return None

        return np.expand_dims(np.array(self.flow_queue), axis=0)


def check_cooldown():
    global last_upload_time
    current_time = time.time()
    time_since_last_upload = current_time - last_upload_time
    
    if time_since_last_upload < COOLDOWN_SECONDS:
        remaining = COOLDOWN_SECONDS - time_since_last_upload
        print(f"COOLDOWN ACTIVE: {remaining:.1f} seconds remaining until next upload")
        return False
    
    return True


def upload_frame(frame):
    global last_upload_time
    
    if not check_cooldown():
        print("Upload skipped due to cooldown")
        return False
    
    temp_dir = "temp_frames"
    os.makedirs(temp_dir, exist_ok=True)

    prefix = "violence"
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    temp_filename = f"{prefix}_{camera_id}_{timestamp}.jpg"
    temp_path = os.path.join(temp_dir, temp_filename)

    success = cv2.imwrite(temp_path, frame)
    if not success or not os.path.exists(temp_path):
        print(f"Failed to save temp file at {temp_path}")
        return False

    data = {"camera_id": camera_id}
    upload_success = False

    try:
        print(f"Sending violence event to API (First call in {COOLDOWN_SECONDS} seconds)")
        response = requests.post(API_URL, data=data)
        if response.status_code == 200 or response.status_code == 201:
            print(f"API update successful: {response.text}")
            upload_success = True
        else:
            print(f"API update failed: {response.status_code}, Message: {response.text}")

    except Exception as e:
        print(f"Error during API update: {str(e)}")

    try:
        with open(temp_path, "rb") as f:
            files = {"file": (temp_filename, f, "image/jpeg")}
            upload_response = requests.post(UPLOAD_URL, files=files, data=data)
            
            print(f"Image upload response: {upload_response.status_code}")
            print(f"Image upload content: {upload_response.text}")

            if upload_response.status_code == 200 or upload_response.status_code == 201:
                print(f"Image uploaded successfully")
                upload_success = True
            else:
                print(f"Image upload failed: {upload_response.status_code}")
                
    except Exception as e:
        print(f"Error during image upload: {str(e)}")

    finally:
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
                print(f"Deleted temporary file {temp_path}")
            except Exception as e:
                print(f"Unable to delete file: {str(e)}")
    
    if upload_success:
        last_upload_time = time.time()
        print(f"✓ Upload complete - Next upload allowed after: {datetime.fromtimestamp(last_upload_time + COOLDOWN_SECONDS).strftime('%H:%M:%S')}")
        return True
    
    return False


def main():
    global last_upload_time
    
    print(f"Connecting to video stream: {video_path}")
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Could not open stream")
        return

    print("Connected to stream")
    print(f"Violence detection cooldown set to {COOLDOWN_SECONDS} seconds")

    optical_flow_extractor = OpticalFlowExtractor()
    fgbg = cv2.createBackgroundSubtractorMOG2()

    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 30

    print(f"Video stream FPS: {fps}")

    prediction_history = deque(maxlen=round(fps / 3))
    frame_skip = 2
    frame_count = 0
    is_violent = False
    consecutive_violent_frames = 0
    
    last_upload_time = time.time() - COOLDOWN_SECONDS 

    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("End of stream")
                cap.release()
                time.sleep(5)
                cap = cv2.VideoCapture(video_path)
                continue

            frame_count += 1
            if frame_count % frame_skip != 0:
                continue

            frame = cv2.resize(frame, (320, 180))

            fgmask = fgbg.apply(frame)
            non_zero_count = cv2.countNonZero(fgmask)

            if non_zero_count < 500:
                continue

            optical_flow = optical_flow_extractor.process_frame(frame)
            if optical_flow is None:
                continue

            prediction = model.predict(optical_flow, verbose=0)[0][0]
            prediction_history.append(prediction)
            avg_prediction = np.mean(prediction_history)

            was_violent = is_violent
            is_violent = avg_prediction > 0.70
            
            if is_violent:
                consecutive_violent_frames += 1
                
                if (not was_violent) or (consecutive_violent_frames % 50 == 0):
                    print(f"Violence detected {avg_prediction:.2f} - Attempting upload (consecutive frames: {consecutive_violent_frames})")
                    upload_frame(frame)
            else:
                if consecutive_violent_frames > 0:
                    print(f"Violence ended after {consecutive_violent_frames} consecutive frames")
                consecutive_violent_frames = 0

            if frame_count % 100 == 0:
                status = "VIOLENT" if is_violent else "Normal"
                current_time = time.time()
                time_since_last_upload = current_time - last_upload_time
                cooldown_status = ""
                
                if time_since_last_upload < COOLDOWN_SECONDS:
                    remaining = COOLDOWN_SECONDS - time_since_last_upload
                    cooldown_status = f"(Cooldown: {remaining:.1f}s remaining)"
                else:
                    cooldown_status = "(Ready to upload)"
                
                print(
                    f"Processing frame {frame_count}: {status} ({avg_prediction:.2f}) {cooldown_status}"
                )

    except KeyboardInterrupt:
        print("Detection stopped by user")
    except Exception as e:
        print(f"Error {str(e)}")
    finally:
        cap.release()
        print("Detection ended")


if __name__ == "__main__":
    print(video_path, camera_id)
    main()