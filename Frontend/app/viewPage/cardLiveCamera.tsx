import React from "react";

interface CardLiveCameraProps {
  src: string;  
  camName: string;  
}

const CardLiveCamera: React.FC<CardLiveCameraProps> = ({ src, camName }) => {
  return (
    <div className="relative w-full h-full">
      <video src={src} autoPlay muted loop className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 bg-opacity-75 p-2 px-4 text-sm text-white drop-shadow-2xl">
        {camName}
      </div>
    </div>
  );
};

export default CardLiveCamera;