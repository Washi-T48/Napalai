import React from "react";
import Image from "next/image";


interface CardLiveCameraProps {
  src: any;  
  camName: string;  
}

const CardLiveCamera: React.FC<CardLiveCameraProps> = ({ src, camName }) => {
  return (
    <div className="relative w-full h-full">
      <Image src={src} alt={camName} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-opacity-75 p-2 px-4 text-sm text-white  drop-shadow-2xl ">
        {camName}
      </div>
    </div>
  );
};

export default CardLiveCamera;
