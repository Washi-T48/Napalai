import React from "react";
import { useState, useEffect } from "react";
import Port from "../port";

interface CardLiveCameraProps {
  src: string;
  camName: string;
  location: string;
  rtspUrl: string;
}

const CardLiveCamera: React.FC<CardLiveCameraProps> = ({ src, camName, location, rtspUrl }) => {
  const [responseCameras, setResponseCameras] = useState<any>(null);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const response = await fetch(`${Port.URL}/cameras`, {
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
        setResponseCameras(data);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };
    getCameras();
  }, []);

  return (
    <div className="relative w-full h-full">
    <video src={rtspUrl} autoPlay muted loop className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 bg-opacity-75 p-2 px-4 text-sm text-white drop-shadow-2xl">
      {camName} - {location}
    </div>
    <div className="absolute top-0 right-0 bg-opacity-50 p-2 text-white">
      {responseCameras && responseCameras.length > 0 ? (
        <ul>
          {responseCameras.map((camera: any, index: number) => (
            <li key={index}>{camera.cameraName}</li>
          ))}
        </ul>
      ) : (
        <p>No cameras data available</p>
      )}
    </div>
  </div>
  );
};

export default CardLiveCamera;
