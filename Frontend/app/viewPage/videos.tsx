import React, { useEffect, useState } from "react";
import CardLiveCamera from "./cardLiveCamera";
import Port from "../port";

interface VideoProp {
  typeLayout: string;
  responseZone: {
    id: number;
    name: string;
    cameras: { cameraName: string; video: any }[];
  }[];
  selectedZoneId: number;
}

interface Camera {
  cameraName: string;
  video: any;
}

interface Zone {
  id: number;
  name: string;
  cameras: any
}

const Videos: React.FC<VideoProp> = ({ typeLayout, selectedZoneId }) => {
  const [responseZone, setResponseZone] = useState<Zone[]>([]);
  const [displayCameras, setDisplayCameras] = useState<{ cameraName: string; video: any }[]>([]);

  useEffect(() => {
    const getZones = async () => {
      try {
        const responseZone = await fetch(`${Port.URL}/zones`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!responseZone.ok) {
          const errorData = await responseZone.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        const dataZone = await responseZone.json();
        setResponseZone(dataZone);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    getZones();
  }, []);

  useEffect(() => {
    if (!Array.isArray(responseZone) || responseZone.length === 0) {
      console.warn("Zones data is missing or not an array:", responseZone);
      return;
    }

    const selectedZone = responseZone.find((zone) => zone.id === selectedZoneId);
    if (!selectedZone) {
      console.warn(`Zone with ID ${selectedZoneId} not found`);
      return;
    }

    let camerasToDisplay: { cameraName: string; video: any }[] = [];

    switch (typeLayout) {
      case "nineLayout":
        camerasToDisplay = selectedZone.cameras.slice(0, 9);
        break;
      case "sixLayout":
        camerasToDisplay = selectedZone.cameras.slice(0, 6);
        break;
      case "fourLayout":
        camerasToDisplay = selectedZone.cameras.slice(0, 4);
        break;
      default:
        console.warn("Unknown layout type:", typeLayout);
        break;
    }

    setDisplayCameras(camerasToDisplay);
  }, [typeLayout, selectedZoneId, responseZone]);

  // if (displayCameras.length === 0) {
  //   return <div className="flex justify-center items-center bg-black w-full h-full text-white">No cameras available for the selected zone or layout.</div>;
  // }

  return (
    <>
      {typeLayout === "nineLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {displayCameras.map((camera, index) => (
            <CardLiveCamera
              key={camera.cameraName || index}
              src={camera.video?.rtsp_url || ""}
              camName={camera.cameraName}
              location={camera.video?.location || ""}
              rtspUrl={camera.video?.rtsp_url || ""}
            />
          ))}
          {Array.from({ length: Math.max(0, 9 - displayCameras.length) }).map((_, index) => (
            <div key={`black-card-${index}`} className="w-full h-full bg-gradient-to-bl from-slate-900 to-zinc-900">
              <div className="flex justify-center items-center w-full h-full text-white text-xxs shadow-lg">
                No Signal
              </div>
            </div>
          ))}
        </div>
      )}

      {typeLayout === "fourLayout" && (
        <div className="w-full h-full grid grid-cols-2 grid-rows-2">
          {displayCameras.map((camera, index) => (
            <CardLiveCamera
              key={camera.cameraName || index}
              src={camera.video?.rtsp_url || ""}
              camName={camera.cameraName}
              location={camera.video?.location || ""}
              rtspUrl={camera.video?.rtsp_url || ""}
            />
          ))}
          {Array.from({ length: Math.max(0, 4 - displayCameras.length) }).map((_, index) => (
            <div key={`black-card-${index}`} className="w-full h-full bg-gradient-to-bl from-slate-900 to-zinc-900">
              <div className="flex justify-center items-center w-full h-full text-white text-xxs shadow-lg">No Signal</div>
            </div>
          ))}
        </div>
      )}

    </>
  );
};

export default Videos;
