import React, { useRef } from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

function EditNameViolenceCard() {
  const [isClose, SetisClose] = useState(true);

  const closeModal = () => {
    SetisClose(false);
  };
  if (!isClose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue rounded-md">
        <div className="flex justify-end p-4 text-white text-xl">
          <Icon
            onClick={closeModal}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <div className="flex flex-col gap-4 pb-16 pl-16 pr-16 pt-5 w-auto h-auto ">
          <div className="flex justify-start pt-2 w-96 h-12 border-b text-2xl">
            Macbook
          </div>
          <div className="flex justify-center items-center p-2  w-full h-44 bg-customwhite text-gray-600 text-tiny rounded-sm">
            Upload File...
          </div>
          <div className="flex justify-start gap-2 w-full">
            <div className="">Return item detail</div>
            <div className="flex justify-center items-center px-1 bg-red-700 text-tiny rounded-sm">
              Unreturn
            </div>
          </div>
          <div className="w-full">
            <div className="pb-1 text-tiny">Name</div>
            <input
              className="p-1 w-full text-black bg-customwhite rounded-sm"
              type="text"
            />
          </div>
          <div className="w-full">
            <div className="pb-1 text-tiny">Time to return</div>
            <input
              className="p-1 w-full text-black bg-customwhite rounded-sm"
              type="text"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button className="flex justify-center items-center p-2 w-24 h-9 bg-customwhite text-black rounded-sm hover:bg-gray-500">
              cancle
            </button>
            <button className="flex justify-center items-center p-2 w-24 h-9 bg-customฺButton text-white rounded-sm hover:bg-customฺButtomHover">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNameViolenceCard;
