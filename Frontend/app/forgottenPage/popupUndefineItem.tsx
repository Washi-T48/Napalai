import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Port from "../port";

interface PopupUndefineItemProps {
  setStatePopup: (option: boolean) => void;
}
interface eventCard {
  id: number;
  created: string;
  camera_id: number;
  type: string;
  position:string;
}
type CameraData = {
  id: string;
  created: string;
  camera_id: string;
  type: string;
  position: string | null;
  first_detected: string | null;
  last_seen: string | null;
  warning_triggered: boolean | null;
};



const PopupUndefineItem: React.FC<PopupUndefineItemProps> = ({ setStatePopup }) => {
  const [itemName , setItemName ] = useState("")
  const [positionName , setPositionName ] = useState("")
  const [popupEvent, setPupupEvent] = useState<eventCard[]>([]);
  useEffect(() => {
    const getPopupEvent = async () => {
      try {
        const getCameraId = await fetch(`${Port.URL}/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!getCameraId.ok) {
          const errorData = await getCameraId.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        const cameraIdData = await getCameraId.json();
        console.log(cameraIdData)
        let cameraId: any;

        if (cameraIdData.length !== 0) {
          const maxId = Math.max(...cameraIdData.map((item: CameraData) => Number(item.id))); 
          cameraId = (maxId + 1).toString(); 
        }
        else {
          cameraId = 1
        }
        console.log(cameraId)
        
        




        const popupEventResponse = await fetch(`${Port.URL}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify ({
            camera_id:cameraId,
            type:itemName,
            // position:,
            // first_detected:,
            // last_seen:,
            // warning_triggered:
          })
        });
        if (!popupEventResponse.ok) {
          const errorData = await popupEventResponse.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        const popEventData = await popupEventResponse.json();
        
        setPupupEvent(popupEvent)
      } catch (error) {

      }
    };
    getPopupEvent();
    return () => {
    };
  }, []);




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue text-white rounded-md">
        <div className="flex justify-end p-4 pt-6 text-white text-xl">
          <Icon
            onClick={() => setStatePopup(false)}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <div className="flex flex-col gap-4 pb-16 pl-16 pr-16 pt-5 w-auto h-auto ">
          <div className="flex justify-start pt-2 w-96 h-12 border-b text-2xl">
            {/* {item.created}  */}
          </div>
          <div className="pt-16 pb-8">Add detail undefined item</div>
          <div className="w-full">
            <div className="pb-1 text-tiny">Item Name</div>
            <input
              className="p-1 w-full text-black bg-customwhite rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
              type="text"
            />
          </div>
          <div className="w-full">
            <div className="pb-1 text-tiny">Detail Item</div>
            <input
              className="p-1 w-full text-black bg-customwhite rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
              type="text"
            />
          </div>
          <div className="flex justify-between gap-2 pt-16 pb-">
            <div className="flex justify-between gap-2">
              <button className="flex justify-center items-center p-2 w-24 h-9 bg-customwhite text-black rounded-sm hover:bg-gray-500">
                cancel
              </button>
              <button className="flex justify-center items-center p-2 w-24 h-9 bg-customButton bg-customฺButton text-white rounded-sm hover:bg-customButtonHover">
                change
              </button>
            </div>
            <div>
              <button className="flex justify-center items-center p-2 w-24 h-9 bg-customButton bg-customฺButton text-white rounded-sm hover:bg-customButtonHover">
                edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupUndefineItem;
