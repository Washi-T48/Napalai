import React, { useState } from "react";
import { Icon } from "@iconify/react";

function AddCamera() {
  const [isClose, setIsClose] = useState(true); 

  const closeModal = () => {
    setIsClose(false); 
  };


  if (!isClose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[550px] h-auto bg-customBlue p-8 shadow-lg rounded-2xl">
        <div className="flex justify-end w-full cursor-pointer">
          <Icon
            onClick={closeModal}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <h1 className="pb-2 text-2xl font-bold">Add ONVIF Camera</h1>
        <div className="bg-customwhite w-auto h-32 text-black p-2 rounded-sm">
          Something...
        </div>
        <div className="pt-8">
          <div className="flex justify-between items-center pb-2">
            <div className="flex justify-between items-center gap-2">
            <div>Auto Scane</div>
              <Icon
                className=" text-green-400"
                icon="healthicons:yes-outline"
                width="24"
                height="24"
              
              />
            </div>
            
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center pb-2">
            <div>Name</div>
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center pb-2">
            <div>URL</div>
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center pb-2">
            <div>ONVIF Username</div>
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center pb-2">
            <div>ONVIF Password</div>
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
          <div className="flex justify-between items-center">
            <div>Connections Test</div>
            <input className="flex justify-center items-center bg-customwhite w-[230px] h-7 text-black text-sm rounded-sm p-2  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100" />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button className="flex justify-center items-center w-28 bg-customฺButton p-2 rounded-md hover:bg-customฺButtomHover">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCamera;
