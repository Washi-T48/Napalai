"use client";
import React, { useState, useEffect } from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Port from "../port";
import { Icon } from "@iconify/react";

interface Camera {
  id: number;
  name: string;
  location: string;
  status?: string;
  ip?: string;
  created: string;
  zone_id: number;
  stream_url?: string;
}

interface Zone {
  id: number;
  name: string;
  cameras: Camera[];
  zone_id: number;
}

function Page() {
  const [typeLayout, setTypeLayout] = useState<string>("nineLayout");
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1); // default to zone 1
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [selectedCamerasNineLayout, setSelectedCamerasNineLayout] = useState<number[]>([]);
  const [selectedCamerasFourLayout, setSelectedCamerasFourLayout] = useState<number[]>([]);
  const [selectedCamerasByZone, setSelectedCamerasByZone] = useState<Record<number, number[]>>({});
  const [groupedCameras, setGroupedCameras] = useState<Zone[]>([]);

  const [expandedZoneId, setExpandedZoneId] = useState<number | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Port.URL}/cameras`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched Camera Data:", data);
        setGroupedCameras(data);
        console.log(setGroupedCameras)

        if (data.length > 0) {
          setSelectedZoneId(data[0].zone_id);
        }
      } catch (error) {
        console.error("Error fetching camera data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedTypeLayout = localStorage.getItem("typeLayout");
    const storedNine = localStorage.getItem("selectedCamerasNineLayout");
    const storedFour = localStorage.getItem("selectedCamerasFourLayout");

    if (storedTypeLayout) setTypeLayout(storedTypeLayout);
    if (storedNine) setSelectedCamerasNineLayout(JSON.parse(storedNine));
    if (storedFour) setSelectedCamerasFourLayout(JSON.parse(storedFour));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCamerasNineLayout", JSON.stringify(selectedCamerasNineLayout));
    localStorage.setItem("selectedCamerasFourLayout", JSON.stringify(selectedCamerasFourLayout));
    localStorage.setItem("typeLayout", typeLayout);
    localStorage.setItem("selectedZoneId", String(selectedZoneId));
  }, [selectedCamerasNineLayout, selectedCamerasFourLayout, selectedCamerasByZone, typeLayout, selectedZoneId]);

  const handleCameraSelectionChange = (cameraId: number) => {
    const updateSelection = (layout: string) => {
      if (layout === "nineLayout") {
        setSelectedCamerasNineLayout((prevSelected) => {
          const newSelected = prevSelected.includes(cameraId)
            ? prevSelected.filter((id) => id !== cameraId)
            : [...prevSelected, cameraId];
          setSelectedCount(newSelected.length);
          return newSelected;
        });
      } else if (layout === "fourLayout") {
        setSelectedCamerasFourLayout((prevSelected) => {
          const newSelected = prevSelected.includes(cameraId)
            ? prevSelected.filter((id) => id !== cameraId)
            : [...prevSelected, cameraId];
          setSelectedCount(newSelected.length);
          return newSelected;
        });
      }
    };

    updateSelection(typeLayout);
  };

  const togglePopup = () => setShowPopup(!showPopup);

  const camerasInSelectedZone = groupedCameras
    .filter((camera) => camera.zone_id === selectedZoneId)
    .filter((camera) => {
      return typeLayout === "nineLayout"
        ? selectedCamerasNineLayout.includes(camera.id)
        : selectedCamerasFourLayout.includes(camera.id);
    });

  const camerasToShow =
    typeLayout === "nineLayout"
      ? groupedCameras
        .filter((camera) => selectedCamerasNineLayout.includes(camera.id))
        .slice(0, 9)
      : groupedCameras
        .filter((camera) => selectedCamerasFourLayout.includes(camera.id))


  const remainingBoxes =
    typeLayout === "nineLayout" ? 9 - camerasToShow.length : 4 - camerasToShow.length;
  const emptyCameras = new Array(remainingBoxes).fill("No Signal");
  const allCamerasToShow = [...camerasToShow, ...emptyCameras];

  const groupedData = groupedCameras.reduce((acc, camera) => {
    if (!acc[camera.zone_id]) {
      acc[camera.zone_id] = [];
    }
    acc[camera.zone_id].push(camera as any);
    return acc;
  }, {} as Record<number, Camera[]>);

  const toggleZone = (zoneId: number) => {
    setExpandedZoneId(expandedZoneId === zoneId ? null : zoneId);
  };

  const getZoneName = (zoneId: string) => {
    const zoneInfo = groupedCameras.find((zone) => String(zone.zone_id) === zoneId);
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };


  return (
    <>
      <Navber />
      <div className="min-h-screen bg-black">
        <div className="flex w-full h-full">
          <Sidebar
            setTypeLayout={setTypeLayout}
            setSelectZone={(zoneId: number) => setSelectedZoneId(zoneId)}
            togglePopup={togglePopup}
          />
          <div className="flex justify-center items-center w-full h-screen pt-16">
            <div className="bg-customLinear w-full h-full">
              <div
                className="grid gap-0 w-full h-full"
                style={{
                  gridTemplateRows:
                    typeLayout === "nineLayout" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                  gridTemplateColumns:
                    typeLayout === "nineLayout" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                }}
              >
                {allCamerasToShow.map((item, index) => (
                  <div key={index} className="bg-black  flex items-center justify-center text-white">
                    <div className="text-center">
                      {typeof item === "string" ? (
                        <h4 className="font-bold text-sm p-2 px-4 border-2 border-opacity-50 border-customRed">{item}</h4>
                      ) : (
                        <div className="relative w-full h-[280px] bg-black">
                          {/* Video Background */}
                          <video className="w-full h-full object-cover" autoPlay muted loop>
                            <source src={item.stream_url || "default-video-url.mp4"} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Item Name in the Bottom Left */}
                          <div className="absolute bottom-0 left-0 text-white text-xs font-bold px-4 py-2 rounded-md">
                            {item.name}
                          </div>
                        </div>

                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-customBlue text-white p-5 w-[550px] rounded-2xl overflow-auto">
            <h2 className="text-xl mb-4 w-96 ">Select Camera ({selectedCount}/{typeLayout === "nineLayout" ? 9 : 4})</h2>
            <div className="flex justify-start">
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-l-md text-sm bg-customButton transition-all duration-300  ${typeLayout === "nineLayout" ? "bg-customฺButtomHover" : "bg-customฺButton"}`}
                onClick={() => setTypeLayout("nineLayout")}
              >
                <Icon icon="material-symbols-light:grid-on" width="24" height="24" />
              </button>
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-r-md text-sm bg-customButton transition-all duration-300  ${typeLayout === "fourLayout" ? "bg-customฺButtomHover" : "bg-customฺButton"}`}
                onClick={() => setTypeLayout("fourLayout")}
              >
                <Icon icon="flowbite:grid-solid" width="24" height="24" />
              </button>
            </div>
            <div className="space-y-4 ">

              {Object.entries(groupedData).map(([zoneId, cameras]) => (
                <div key={zoneId}>
                  <div
                    className="w-full text-xl cursor-pointer min-w-96 "
                    onClick={() => toggleZone(Number(zoneId))}
                  >
                    <div className="flex justify-between p-6 shadow-md duration-300 rounded-md m-1 hover:bg-customSlateBlue hover:bg-opacity-20">
                      <span>{getZoneName(String(zoneId))}</span>

                    </div>
                  </div>

                  {expandedZoneId === Number(zoneId) && (
                    <ul className="max-h-96 overflow-auto transition-all duration-300 ease-in-out">
                      {cameras.map((camera) => (
                        <div
                          className="ml-2 mr-2 duration-300  hover:bg-customSlateBlue hover:bg-opacity-20"
                          key={camera.id}
                        >
                          <div className="flex justify-between items-center w-full p-4">
                            <div>{camera.name}</div>
                            <input
                              type="checkbox"
                              id={`camera-${camera.id}`}
                              value={camera.id}
                              checked={
                                typeLayout === "nineLayout"
                                  ? selectedCamerasNineLayout.includes(camera.id)
                                  : selectedCamerasFourLayout.includes(camera.id)
                              }
                              onChange={() => handleCameraSelectionChange(camera.id)} // เลือกกล้องที่ต้องการ
                              disabled={
                                (typeLayout === "nineLayout" && selectedCamerasNineLayout.length >= 9) ||
                                (typeLayout === "fourLayout" && selectedCamerasFourLayout.length >= 4)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => setShowPopup(false)} className="btn btn-cancle">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;