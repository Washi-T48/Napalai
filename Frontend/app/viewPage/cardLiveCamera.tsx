import React, { useState, useEffect } from "react";
import Port from "../port";

interface CardLiveCameraProps {
  camName: string;
  location: string;
  rtspUrl: string;
}

const CardLiveCamera: React.FC<CardLiveCameraProps> = ({ camName, location, rtspUrl }) => {
  const [responseCameras, setResponseCameras] = useState<any[]>([]);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {responseCameras.length > 0 ? (
        responseCameras.map((camera, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{camera.camName}</h3>
            <p className="text-sm text-gray-600">{camera.location}</p>
            <p className="text-sm text-gray-600">{camera.rtspUrl}</p>
          </div>
        ))
      ) : (
        <p>Loading cameras...</p>
      )}
    </div>
  );
};

export default CardLiveCamera;
