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


def upload_frame(frame, is_violent=False):
    temp_dir = "temp_frames"
    os.makedirs(temp_dir, exist_ok=True)

    prefix = "violence" if is_violent else "normal"
    temp_filename = (
        f"{prefix}_{camera_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    )
    temp_path = os.path.join(temp_dir, temp_filename)

    cv2.imwrite(temp_path, frame)

    violence_type = "physical" if is_violent else "normal"
    data = {"camera_id": camera_id, "position": None, "violence_type": violence_type}

    try:
        with open(temp_path, "rb") as file:
            files = {"image": file}
            response = requests.post(API_URL, files=files, data=data)
            if response.status_code == 201:
                print(f"Uploaded successfully: {response.json()}")
            else:
                print(
                    f"Upload failed: {response.status_code}, Message: {response.text}"
                )
    except Exception as e:
        print(f"Error during upload {str(e)}")
    finally:
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
                print(f"Deleted temporary file {temp_path}")
            except Exception as e:
                print(f"Unable to delete file {str(e)}")


def main():
    print(f"Connecting to video stream: {video_path}")
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Could not open stream")
        return

    print("Connected to stream")

    optical_flow_extractor = OpticalFlowExtractor()
    fgbg = cv2.createBackgroundSubtractorMOG2()

    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 30

    print(f"Video stream FPS: {fps}")

    prediction_history = deque(maxlen=round(fps / 3))
    frame_skip = 2
    frame_count = 0
    last_upload_time = 0
    upload_cooldown = 10
    is_violent = False

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
            current_time = time.time()

            if is_violent and (
                not was_violent or (current_time - last_upload_time) > upload_cooldown
            ):
                print(f"Violence detected {avg_prediction:.2f}")
                upload_frame(frame, is_violent=True)
                last_upload_time = current_time

            if frame_count % 100 == 0:
                status = "VIOLENT" if is_violent else "Normal"
                print(
                    f"Processing frame {frame_count}: {status} ({avg_prediction:.2f})"
                )

    except KeyboardInterrupt:
        print("Detection stopped by user")
    except Exception as e:
        print(f"Error {str(e)}")
    finally:
        cap.release()
        print("Detection ended")


if __name__ == "__main__":
    main()
