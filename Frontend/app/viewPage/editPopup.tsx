import React, { useRef } from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

function EditPopup() {
  const [isClose, setIsClose] = useState(true); // Control modal visibility

  // Close the modal
  const closeModal = () => {
    setIsClose(false); // Set isClose to false to hide the modal
  };

  // Render the modal if isClose is true
  if (!isClose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue p-2 rounded-md">
        <div className="flex justify-end w-full cursor-pointer p-2">
          <Icon
            onClick={closeModal}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <div className="w-80 h-auto bg-customBlue p-6 shadow-lg rounded-2xl">
          <div className="text-2xl font-bold pb-2">Detections Detail</div>
          <div className="flex justify-between pt-2">
            <div className="flex justify-center items-center">
              Zone Name
              <Icon
                className="p-1"
                icon="healthicons:yes-outline"
                width="24"
                height="24"
                style={{ color: "green" }}
              />
            </div>
            <input className="flex justify-center items-center bg-customwhite w-32 h-[30px] text-black text-sm rounded-sm p-2" />
          </div>
          <div className="flex justify-between pt-2">
            <div>Camera Name</div>
            <input className="flex justify-center items-center bg-customwhite w-32 h-[30px] text-black text-sm rounded-sm p-2" />
          </div>
          <div className="flex justify-end pt-6">
            <button className="flex justify-center items-center w-28 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
