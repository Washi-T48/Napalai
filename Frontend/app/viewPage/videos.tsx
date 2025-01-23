import React, { useEffect, useState } from "react";
import CardLiveCamera from "./cardLiveCamera";
import { StaticImageData } from "next/image";

interface videoProp {
  typeLayout: string;
  zones: {
    id: number;
    name: string;
    cameras: { cameraName: string; imges: StaticImageData }[];
  }[];
  selectedZoneId: number; // รับค่าของ zone ที่เลือก
}

const Videos: React.FC<videoProp> = ({ typeLayout, zones, selectedZoneId }) => {
  const [displayCameras, setDisplayCameras] = useState<
    { cameraName: string; imges: StaticImageData }[]
  >([]);

  useEffect(() => {
    const selectedZone = zones.find((zone) => zone.id === selectedZoneId); // Using selectZone as the chosen zone
    if (selectedZone) {
      let camerasToDisplay: { cameraName: string; imges: StaticImageData }[] = []; // Define type clearly

      if (typeLayout === "nineLayout") {
        camerasToDisplay = selectedZone.cameras.slice(0, 9);
      } else if (typeLayout === "sixLayout") {
        camerasToDisplay = selectedZone.cameras.slice(0, 6);
      } else if (typeLayout === "fourLayout") {
        camerasToDisplay = selectedZone.cameras.slice(0, 4);
      }

      setDisplayCameras(camerasToDisplay);
    }
  }, [typeLayout, selectedZoneId, zones]); // Only depend on the necessary values: typeLayout, selectZone, zones


  if (displayCameras.length === 0) {
    return <div>No cameras available for the selected zone or layout.</div>;
  }

  return (
    <>
      {typeLayout === "nineLayout" && (
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {displayCameras.map((camera, index) => (
            <CardLiveCamera
              key={index}
              src={camera.imges ? camera.imges : null} // ใช้ null หากไม่มีข้อมูล
              camName={camera.cameraName}
            />
          ))}

          {/* เติม card สีดำเมื่อข้อมูลไม่ครบ 9 */}
          {displayCameras.length < 9 &&
            Array.from({ length: 9 - displayCameras.length }).map((_, index) => (
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
            <CardLiveCamera
              src={displayCameras[0]?.imges}
              camName={displayCameras[0]?.cameraName}
            />
          </div>

          {displayCameras.slice(1, 6).map((camera, index) => (
            <CardLiveCamera
              key={index + 1}
              src={camera.imges}
              camName={camera.cameraName}
            />
          ))}
          {displayCameras.length < 6 &&
            Array.from({ length: 6 - displayCameras.length }).map((_, index) => (
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
              key={index}
              src={camera.imges}
              camName={camera.cameraName}
            />
          ))}
          {displayCameras.length < 4 &&
            Array.from({ length: 4 - displayCameras.length }).map((_, index) => (
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
