import cv2
import time
import os
import json
import sys
import requests
from ultralytics import YOLO

#  API URLs
SERVER_URL = "https://cloud9.phraya.net/api/ai/forgotten"
UPLOAD_URL = "https://cloud9.phraya.net/api/upload/forgotten/image"

# Check command-line args
if len(sys.argv) < 3:
    print("Usage: python testVideo.py <stream_url> <camera_id>")
    sys.exit(1)

stream_url = sys.argv[1]
camera_id = int(sys.argv[2])

# Add index.m3u8 if needed
if not stream_url.endswith(".m3u8"):
    stream_url = stream_url.rstrip("/") + "/index.m3u8"

print(f" Starting camera {camera_id} with stream: {stream_url}")

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "./forgotten_detection_model.pt"
)

model = YOLO(MODEL_PATH)


#  Connect to camera stream
def connect_to_stream(path):
    print(f"🔗 Connecting to stream: {path}")
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
    print(" Connected to stream.")
    return cap


cap = connect_to_stream(stream_url)
if cap is None:
    sys.exit(1)

fps = int(cap.get(cv2.CAP_PROP_FPS)) or 15
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) or 640
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) or 480
frame_skip = max(1, fps // 15)
frame_count = 0

#  Output writer
fourcc = cv2.VideoWriter_fourcc(*"mp4v")

# Class labels
class_labels = {0: "Bag", 3: "Laptop", 2: "Person", 1: "Phone"}

# Object filtering rules
max_object_sizes = {"Laptop": 0.15, "Phone": 0.02, "Person": 0.4}
max_aspect_ratios = {"Phone": 0.7}

# State trackers
previous_objects = set()
last_capture_time = 0
capture_interval = 5

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print(" Reconnecting stream...")
        cap.release()
        cap = connect_to_stream(stream_url)
        continue

    frame_count += 1

    if frame_count % frame_skip == 0:
        results = model(frame)
        annotated_frame = frame.copy()

        detected_classes = []
        person_positions = []
        highest_confidence_objects = {}

        current_time = time.time()

        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                confidence = box.conf[0].item()
                class_id = int(box.cls[0])
                obj_name = class_labels.get(class_id, "Unknown")

                width = x2 - x1
                height = y2 - y1
                object_area = width * height
                frame_area = frame_width * frame_height

                max_size = max_object_sizes.get(obj_name, 0.4)
                if object_area > (frame_area * max_size):
                    continue

                if obj_name == "Phone":
                    aspect_ratio = width / height
                    if aspect_ratio > max_aspect_ratios[obj_name]:
                        continue

                detected_classes.append(class_id)

                if class_id == 2:
                    person_positions.append(True)
                elif class_id in class_labels:
                    if (
                        obj_name not in highest_confidence_objects
                        or confidence
                        > highest_confidence_objects[obj_name]["confidence"]
                    ):
                        highest_confidence_objects[obj_name] = {
                            "position": [x1, y1, x2, y2],
                            "confidence": confidence,
                        }

        # Draw bounding boxes
        for obj_name, obj_data in highest_confidence_objects.items():
            x1, y1, x2, y2 = obj_data["position"]
            confidence = obj_data["confidence"]
            label = f"{obj_name}: {confidence:.2f}"
            cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                annotated_frame,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2,
            )

        #  ALERT if item is left behind
        if previous_objects and not person_positions and highest_confidence_objects:
            if current_time - last_capture_time >= capture_interval:
                print("⚠ ALERT: Someone forgot an item!")
                last_capture_time = current_time

                for obj_name, obj_data in highest_confidence_objects.items():
                    json_position = json.dumps(obj_data["position"])
                    data = {
                        "camera_id": camera_id,
                        "position": json_position,
                        "image": None,
                        "video": None,
                        "item_type": obj_name,
                    }

                    try:
                        response = requests.post(SERVER_URL, json=data)
                        if response.status_code in [200, 201]:
                            response_json = response.json()
                            print(f"📌 Data sent: {response_json}")

                            event_id = response_json.get("id")
                            image_path = f"captured_frame_{int(time.time())}.jpg"
                            cv2.imwrite(image_path, annotated_frame)

                            with open(image_path, "rb") as f:
                                files = {"file": f}
                                upload_data = {"id": event_id}
                                upload_response = requests.post(
                                    UPLOAD_URL, files=files, data=upload_data
                                )

                                if upload_response.status_code in [200, 201]:
                                    print("✅ Image uploaded and linked.")
                                else:
                                    print(
                                        f"❌ Upload failed: {upload_response.status_code}, {upload_response.text}"
                                    )
                            os.remove(image_path)

                        else:
                            print(
                                f"❌ Server response: {response.status_code}, {response.text}"
                            )

                    except requests.exceptions.RequestException as e:
                        print(f"❌ Request error: {e}")

        if person_positions:
            last_capture_time = 0

        previous_objects = set(highest_confidence_objects.keys())

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

cap.release()
cv2.destroyAllWindows()
print(f"✅ Processing complete!")
