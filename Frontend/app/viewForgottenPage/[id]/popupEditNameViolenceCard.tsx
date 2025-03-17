import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Port from "@/app/port";
interface ForgottenItem {
  id: string;
  created: string; // *
  event_id: string;
  description: string | null; //*
  item_type: string;
  status: string; // *
  item_name: string | null;
  camera_id: string;
  type: string;
  position: number[];
  first_detected: string;
  last_seen: string | null;
  warning_triggered: string;
  image: string | null;
  video: string | null;
  zone_id: string;
  name: string;
  location: string;
  rtsp_url: string | null; // *
  cameraname: string; // *
  zonename: string; // *
  createdtime: string;
}

interface Props {
  setOpenPopup: (open: boolean) => void;
  selectedId: string | undefined | string[];
}

const PopupEditNameViolenceCard: React.FC<Props> = ({ setOpenPopup, selectedId }) => {
  const [text, setText] = useState("");
  const maxLength = 50;
  const isError = text.length === 0;
  const [getData, setGetData] = useState<ForgottenItem[]>([]);
  const [changeDetail, setChangDetail] = useState({
    created: "",
    event_id: "",
    description: "",
    item_type: "",
    status: "",
    item_name: "",
    camera_id: "",
    type: "",
    position: "",
    first_detected: "",
    last_seen: "",
    warning_triggered: "",
    image: "",
    video: "",
    zone_id: "",
    name: "",
    location: "",
    rtsp_url: "",
    cameraname: "",
    zonename: "",
    createdtime: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      if (selectedId === null) return;

      try {
        const response = await fetch(`${Port.URL}/utils/forgotten/${selectedId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();
        setGetData(data);
        setChangDetail({
          created: data.created,
          event_id: data.event_id,
          description: data.description,
          item_type: data.item_type,
          status: data.status,
          item_name: data.item_name,
          camera_id: data.camera_id,
          type: data.type,
          position: data.position,
          first_detected: data.first_detected,
          last_seen: data.last_seen,
          warning_triggered: data.warning_triggered,
          image: data.image,
          video: data.video,
          zone_id: data.zone_id,
          name: data.name,
          location: data.location,
          rtsp_url: data.rtsp_url,
          cameraname: data.cameraname,
          zonename: data.zonename,
          createdtime: data.createdtime,
        })
        console.log("showdata", data)
      } catch (error) {
        console.error("Error fetching camera and zone data:", error);
      }
    };

    fetchData();

  }, [selectedId]);
  console.log("show changeDetail", changeDetail)

  const changeData = async () => {
    if (selectedId === null) return;

    try {
      const putResponceEditDetail = await fetch(`${Port.URL}/forgotten/${selectedId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          created: changeDetail.created,
          event_id: changeDetail.event_id,
          description: changeDetail.description,
          item_type: changeDetail.item_type,
          status: changeDetail.status,
          item_name: changeDetail.item_name,
          camera_id: changeDetail.camera_id,
          type: changeDetail.type,
          position: changeDetail.position,
          first_detected: changeDetail.first_detected,
          last_seen: changeDetail.last_seen,
          warning_triggered: changeDetail.warning_triggered,
          image: changeDetail.image,
          video: changeDetail.video,
          zone_id: changeDetail.zone_id,
          name: changeDetail.name,
          location: changeDetail.location,
          rtsp_url: changeDetail.rtsp_url,
          cameraname: changeDetail.cameraname,
          zonename: changeDetail.zonename,
          createdtime: changeDetail.createdtime,


        })
      });

      if (!putResponceEditDetail.ok) {
        const errorData = await putResponceEditDetail.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const putData = await putResponceEditDetail.json();
      setGetData(putData);

    } catch (error) {
      console.error("Error fetching camera and zone data:", error);
    }
  };
  console.log("get data", getData)


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue rounded-md">
        <div className="flex justify-end p-4 text-white text-xl">
          <Icon
            onClick={() => setOpenPopup(false)}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <div className="flex flex-col gap-4 p-10 w-full h-auto ">
          <div className="w-full">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-white">
                Name (Must be specified.) <span className="text-gray-400">?</span>
              </label>
              <input
                type="text"
                onChange={(e) => { setChangDetail({ ...changeDetail, item_name: e.target.value }) }}
                value={changeDetail.item_name || ""}
                placeholder="Add a title that describes your video."
                className={`w-96  px-3 py-2 mt-1 pb-8  border ${isError ? "border" : "border-gray-600"
                  } bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 ${isError ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500"
                  }`}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={changeData}
              className="flex justify-center items-center px-4 py-2 rounded-md bg-customฺButton text-white  hover:bg-customฺButtomHover">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupEditNameViolenceCard;