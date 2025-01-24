import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image"; 
import { StaticImageData } from 'next/image';

interface PopupUndefineItemProps {
  item: {
    image: StaticImageData;
    title: string;
    time: string;
    Zone: string;
    Camera: string;
  };
}

const PopupUndefineItem: React.FC<PopupUndefineItemProps> = ({ item }) => {
  const [isClose, setIsClose] = useState(false); // ตั้งค่าเริ่มต้นเป็น false เพื่อให้ Modal เปิดอยู่

  const closeModal = () => {
    setIsClose(true); // ปิด Modal เมื่อคลิก
  };

  if (isClose) return null; // ถ้า isClose เป็น true, ไม่แสดง modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customBlue rounded-md">
        <div className="flex justify-end p-4 pt-6 text-white text-xl">
          <Icon
            onClick={closeModal}
            icon="icon-park-solid:close-one"
            width="30"
            height="30"
          />
        </div>
        <div className="flex flex-col gap-4 pb-16 pl-16 pr-16 pt-5 w-auto h-auto ">
          <div className="flex justify-start pt-2 w-96 h-12 border-b text-2xl">
            {item.title} 
          </div>
          <div className="pt-16 pb-8">Add detail undefined item</div>
          <div className="w-full">
            <div className="pb-1 text-tiny">Item Name</div>
            <input
              className="p-1 w-full text-black bg-customwhite rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
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
