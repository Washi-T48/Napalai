import React, { useState } from "react";
import { Icon } from "@iconify/react";
interface setPopup {
  setOpenPopup: (option: boolean) => void;
}

const EditPopup:React.FC<setPopup> = ({ setOpenPopup }) =>  {
  const [zoneName, setZoneName] = useState("")
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue p-2 rounded-2xl">
        <div className=" w-80 h-auto bg-customBlue p-4 pb-6 shadow-lg rounded-2xl">
          <div className="flex justify-between w-full">
            <div className="text-2xl font-bold pb-4">Detections Detail</div>
            <div>
              <Icon
                onClick={() => setOpenPopup(false)}
                icon="icon-park-solid:close-one"
                width="30"
                height="30"
              />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <div className="flex justify-center items-center pb-2 gap-2">
              Zone Name
              <Icon
                className=""
                icon="healthicons:yes-outline"
                width="24"
                height="24"
                style={{ color: "green" }}
              />
            </div>
            <input className="flex justify-center items-center bg-customwhite w-32 h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          {/* <div className="flex justify-between pt-2">
            <div>Camera Name</div>
            <input className="flex justify-center items-center bg-customwhite w-32 h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div> */}
          <div className="flex justify-end pt-6">
            <button className="flex justify-center items-center w-24 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
