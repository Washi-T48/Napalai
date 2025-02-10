import React, { useEffect, useState } from "react";
import CardLiveCamera from "./cardLiveCamera";

interface VideoProp {
  typeLayout: string;
  responseZone: {
    id: number;
    name: string;
    cameras: { cameraName: string; video: any }[];
  }[];
  selectedZoneId: number;
  responseCameras : any;
}

const Videos: React.FC<VideoProp> = ({ typeLayout, responseZone, selectedZoneId }) => {
  const [displayCameras, setDisplayCameras] = useState<{ cameraName: string; video: any }[]>([]);

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

  if (displayCameras.length === 0) {
    return <div className="flex justify-center items-center bg-black w-full h-full text-white ">No cameras available for the selected zone or layout.</div>;
  }

  return (
    <>
      {typeLayout === "nineLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {displayCameras.map((camera, index) => (
            <CardLiveCamera key={index} src={camera.video || null} camName={camera.cameraName} />
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

      {typeLayout === "sixLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          <div className="relative w-full h-full col-span-2 row-span-2">
            <CardLiveCamera src={displayCameras[0]?.video} camName={displayCameras[0]?.cameraName} />
          </div>
          {displayCameras.slice(1, 6).map((camera, index) => (
            <CardLiveCamera key={index + 1} src={camera.video} camName={camera.cameraName} />
          ))}
          {Array.from({ length: Math.max(0, 6 - displayCameras.length) }).map((_, index) => (
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
            <CardLiveCamera key={index} src={camera.video} camName={camera.cameraName} />
          ))}
          {Array.from({ length: Math.max(0, 4 - displayCameras.length) }).map((_, index) => (
            <div key={`black-card-${index}`} className="w-full h-full bg-gradient-to-bl from-slate-900 to-zinc-900">
              <div className="flex justify-center items-center w-full h-full text-white text-xxs shadow-lg">
                No Signal
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Videos;
