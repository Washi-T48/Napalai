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
    print("Usage: python violence.py <stream_url> <camera_id>")
    sys.exit(1)

video_path = sys.argv[1]
camera_id = int(sys.argv[2])

# ✅ Append /index.m3u8 if needed
if not video_path.endswith(".m3u8"):
    video_path = video_path.rstrip("/") + "/index.m3u8"

print(f"🎥 Starting camera {camera_id} with stream: {video_path}")

API_URL = "https://cloud9.phraya.net/api/ai/violence"
UPLOAD_URL = "https://cloud9.phraya.net/api/upload/violence/image"

COOLDOWN_SECONDS = 30
last_upload_time = 0

try:
    model = load_model(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "./violence_detection_model.h5")
    )
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
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
    if current_time - last_upload_time < COOLDOWN_SECONDS:
        return False
    return True


def upload_frame(frame):
    global last_upload_time

    if not check_cooldown():
        return False

    temp_dir = "temp_frames"
    os.makedirs(temp_dir, exist_ok=True)

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"violence_{camera_id}_{timestamp}.jpg"
    filepath = os.path.join(temp_dir, filename)

    success = cv2.imwrite(filepath, frame)
    if not success or not os.path.exists(filepath):
        return False

    data = {"camera_id": camera_id}
    upload_success = False
    event_id = None

    try:
        response = requests.post(API_URL, json=data)
        if response.status_code in [200, 201]:
            response_json = response.json()
            event_id = response_json.get("id")
            upload_success = True
        else:
            return False
    except Exception:
        return False

    if event_id:
        try:
            with open(filepath, "rb") as f:
                files = {"file": (filename, f, "image/jpeg")}
                upload_data = {"id": event_id}
                upload_response = requests.post(UPLOAD_URL, files=files, data=upload_data)

                if upload_response.status_code in [200, 201]:
                    upload_url = upload_response.text.strip()

                    # ✅ Set as thumbnail
                    patch_url = f"{API_URL}/{event_id}"
                    patch_data = {"thumbnail_url": upload_url}
                    patch_response = requests.patch(patch_url, json=patch_data)

        except Exception:
            return False

    try:
        os.remove(filepath)
    except Exception:
        pass

    if upload_success:
        last_upload_time = time.time()
        return True

    return False


def connect_to_stream(path):
    print(f"🔗 Connecting to video stream: {path}")
    cap = cv2.VideoCapture(path)
    retry = 0

    while not cap.isOpened() and retry < 5:
        print(f"❌ Could not open stream. Retrying ({retry + 1}/5)...")
        time.sleep(5)
        cap = cv2.VideoCapture(path)
        retry += 1

    if not cap.isOpened():
        print("❌ Failed to connect to stream after retries.")
        return None

    print("✅ Connected to stream.")
    return cap


def main():
    global last_upload_time

    cap = connect_to_stream(video_path)
    if cap is None:
        print("🛑 Exiting. Stream is unavailable.")
        return

    optical_flow_extractor = OpticalFlowExtractor()
    fgbg = cv2.createBackgroundSubtractorMOG2()

    fps = cap.get(cv2.CAP_PROP_FPS) or 30
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
                print("🔁 End of stream or read error. Reconnecting...")
                cap.release()
                time.sleep(5)
                cap = connect_to_stream(video_path)
                continue

            frame_count += 1
            if frame_count % frame_skip != 0:
                continue

            frame = cv2.resize(frame, (320, 180))
            fgmask = fgbg.apply(frame)
            if cv2.countNonZero(fgmask) < 500:
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
                if not was_violent or consecutive_violent_frames % 50 == 0:
                    upload_frame(frame)
            else:
                if consecutive_violent_frames > 0:
                    consecutive_violent_frames = 0

    except KeyboardInterrupt:
        print("🛑 Detection stopped by user")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    finally:
        cap.release()
        print("📴 Stream closed")


if __name__ == "__main__":
    main()
