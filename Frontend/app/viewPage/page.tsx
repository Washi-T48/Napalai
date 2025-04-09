"use client";
import React, { useState, useEffect } from "react";
import HLSVideoPlayer from "../component/HLSVideoPlayer";
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
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedCamerasNineLayout, setSelectedCamerasNineLayout] = useState<number[]>([]);
  const [selectedCamerasFourLayout, setSelectedCamerasFourLayout] = useState<number[]>([]);
  const [selectedCamerasByZone, setSelectedCamerasByZone] = useState<Record<number, number[]>>({});
  const [groupedCameras, setGroupedCameras] = useState<Camera[]>([]);
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
        // Sort cameras by name
        const sortedCameras = data.sort((a: Camera, b: Camera) =>
          a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
        );
        setGroupedCameras(sortedCameras);
        console.log(setGroupedCameras);

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
    const fetchZones = async () => {
      try {
        const res = await fetch(`${Port.URL}/zones`);
        const data = await res.json();
        // Sort zones by name
        const sortedZones = data.sort((a: Zone, b: Zone) =>
          a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
        );
        setZones(sortedZones);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };
    fetchZones();
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

  const [selectedZoneNineLayout, setSelectedZoneNineLayout] = useState<Record<number, number[]>>({});
  const [selectedZoneFourLayout, setSelectedZoneFourLayout] = useState<Record<number, number[]>>({});

  const handleCameraSelectionChange = (cameraId: number, zoneId: number) => {
    const updateSelection = (
      layout: "nineLayout" | "fourLayout",
      selectedState: number[],
      setSelectedState: React.Dispatch<React.SetStateAction<number[]>>,
      zoneMap: Record<number, number[]>,
      setZoneMap: React.Dispatch<React.SetStateAction<Record<number, number[]>>>
    ) => {
      const alreadySelected = selectedState.includes(cameraId);
      let updatedSelected;

      if (alreadySelected) {
        updatedSelected = selectedState.filter((id) => id !== cameraId);
      } else {
        updatedSelected = [...selectedState, cameraId];
      }

      const updatedZone = {
        ...zoneMap,
        [zoneId]: alreadySelected
          ? (zoneMap[zoneId] || []).filter((id) => id !== cameraId)
          : [...(zoneMap[zoneId] || []), cameraId],
      };

      setSelectedState(updatedSelected);
      setZoneMap(updatedZone);
      setSelectedCount(updatedSelected.length);
    };

    if (typeLayout === "nineLayout") {
      updateSelection(
        "nineLayout",
        selectedCamerasNineLayout,
        setSelectedCamerasNineLayout,
        selectedZoneNineLayout,
        setSelectedZoneNineLayout
      );
    } else if (typeLayout === "fourLayout") {
      updateSelection(
        "fourLayout",
        selectedCamerasFourLayout,
        setSelectedCamerasFourLayout,
        selectedZoneFourLayout,
        setSelectedZoneFourLayout
      );
    }
  };

  const clearSelection = () => {
    if (typeLayout === "nineLayout") {
      setSelectedCamerasNineLayout([]);
      setSelectedZoneNineLayout({});
      setSelectedCount(0);
    } else {
      setSelectedCamerasFourLayout([]);
      setSelectedZoneFourLayout({});
      setSelectedCount(0);
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);

  const getZoneName = (zoneId: string | number) => {
    if (Number(zoneId) === 0) return "Unassigned";
    const zoneInfo = zones.find((zone) => String(zone.id) === String(zoneId));
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };

  // Sort cameras to show by zone name and camera name
  const getSortedCamerasToShow = () => {
    const selectedCameras = typeLayout === "nineLayout" ? selectedCamerasNineLayout : selectedCamerasFourLayout;
    return groupedCameras
      .filter((camera) => selectedCameras.includes(camera.id))
      .sort((a, b) => {
        const zoneAName = a.zone_id ? getZoneName(String(a.zone_id)) : "Unassigned";
        const zoneBName = b.zone_id ? getZoneName(String(b.zone_id)) : "Unassigned";
        const zoneComparison = zoneAName.localeCompare(zoneBName, undefined, {
          numeric: true,
          sensitivity: "base",
        });
        if (zoneComparison !== 0) return zoneComparison;
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
      })
      .slice(0, typeLayout === "nineLayout" ? 9 : 4);
  };

  const camerasToShow = getSortedCamerasToShow();

  const remainingBoxes = typeLayout === "nineLayout" ? 9 - camerasToShow.length : 4 - camerasToShow.length;
  const emptyCameras = new Array(remainingBoxes).fill(null).map((_, idx) => ({
    id: -1 * (idx + 1),
    stream_url: null,
    name: "",
  }));

  const allCamerasToShow = [...camerasToShow, ...emptyCameras];

  const groupedData = groupedCameras.reduce((acc, camera) => {
    const zoneId = camera.zone_id || 0;
    if (!acc[zoneId]) {
      acc[zoneId] = [];
    }
    acc[zoneId].push(camera as any);
    // Sort cameras within each zone
    acc[zoneId].sort((a: Camera, b: Camera) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
    );
    return acc;
  }, {} as Record<number, Camera[]>);

  const toggleZone = (zoneId: number) => {
    setExpandedZoneId(expandedZoneId === zoneId ? null : zoneId);
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
                className={`grid gap-0 w-full h-full ${
                  typeLayout === "nineLayout" ? "grid-cols-1 md:grid-cols-3" : "sm:grid-cols-2"
                }`}
                style={{
                  gridAutoRows: "1fr",
                }}
              >
                {allCamerasToShow.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black flex items-center justify-center text-white relative"
                  >
                    {item.stream_url ? (
                      <HLSVideoPlayer src={`${item.stream_url}/index.m3u8`} name={item.name} />
                    ) : (
                      <div className="w-full h-full bg-black border border-gray-700 flex items-center justify-center">
                        <h4 className="font-bold text-sm text-white border-2 py-2 px-2 border-opacity-50 border-customRed">
                          No Signal
                        </h4>
                        <div className="absolute bottom-0 left-0 text-white text-xs font-bold px-4 py-2">
                          {item.name}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-customBlue text-white p-5 w-[550px] h-[600px] rounded-2xl">
            <h2 className="text-xl mb-4 w-96">
              Select Camera (
              {typeLayout === "nineLayout"
                ? `${selectedCamerasNineLayout.length}/${9}`
                : `${selectedCamerasFourLayout.length}/${4}`}
              )
            </h2>

            <div className="flex justify-start">
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-l-md text-sm bg-customButton transition-all duration-300 ${
                  typeLayout === "nineLayout" ? "bg-customฺButtomHover" : "bg-customฺButton"
                }`}
                onClick={() => setTypeLayout("nineLayout")}
              >
                <Icon icon="material-symbols-light:grid-on" width="24" height="24" />
              </button>
              <button
                className={`flex justify-center items-center w-20 p-2 rounded-r-md text-sm bg-customButton transition-all duration-300 ${
                  typeLayout === "fourLayout" ? "bg-customฺButtomHover" : "bg-customฺButton"
                }`}
                onClick={() => setTypeLayout("fourLayout")}
              >
                <Icon icon="flowbite:grid-solid" width="24" height="24" />
              </button>
            </div>
            <div className="h-[430px] overflow-auto space-y-4">
              {Object.entries(groupedData)
                .sort(([zoneIdA], [zoneIdB]) =>
                  getZoneName(zoneIdA).localeCompare(getZoneName(zoneIdB), undefined, {
                    numeric: true,
                    sensitivity: "base",
                  })
                )
                .map(([zoneId, cameras]) => (
                  <div key={zoneId}>
                    <div
                      className="w-full text-xl cursor-pointer min-w-96"
                      onClick={() => toggleZone(Number(zoneId))}
                    >
                      <div className="flex justify-between p-6 shadow-md duration-300 rounded-md m-1 hover:bg-customSlateBlue hover:bg-opacity-20">
                        <span>{getZoneName(String(zoneId))}</span>
                      </div>
                    </div>

                    {expandedZoneId === Number(zoneId) && (
                      <ul className="transition-all duration-300 ease-in-out">
                        {cameras.map((camera) => (
                          <div
                            className="ml-2 mr-2 duration-300 hover:bg-customSlateBlue hover:bg-opacity-20"
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
                                onChange={() =>
                                  handleCameraSelectionChange(camera.id, camera.zone_id)
                                }
                                disabled={
                                  (typeLayout === "nineLayout" &&
                                    selectedCamerasNineLayout.length >= 9 &&
                                    !selectedCamerasNineLayout.includes(camera.id)) ||
                                  (typeLayout === "fourLayout" &&
                                    selectedCamerasFourLayout.length >= 4 &&
                                    !selectedCamerasFourLayout.includes(camera.id))
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

            <div className="bg-customBlue flex justify-end mt-2">
              <button onClick={clearSelection} className="btn btn-cancle mr-2">
                Clear
              </button>
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