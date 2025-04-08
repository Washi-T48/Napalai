import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AddCamera from "./popupAddCamera";
import Port from "../port";

interface Zone {
  id: number;
  created: string;
  name: string;
  location: string;
}

interface SidebarProp {
  setTypeLayout: (type: string) => void;
  setSelectZone: (zoneId: any) => void;
  togglePopup: (value: boolean) => void;
}

interface Camera {
  id: number;
  name: string;
  location: string;
  zone_id: number | null;
  created: string;
}

const Sidebar: React.FC<SidebarProp> = ({ setTypeLayout, setSelectZone, togglePopup }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [layoutActive, setLayoutActive] = useState(false);
  const toggleLayout = () => setLayoutActive(!layoutActive);

  const [renamePopup, setRenamePopup] = useState<{
    cameraId: number;
    currentName: string;
  } | null>(null);

  const getZoneName = (zoneId: string) => {
    const zoneInfo = groupedZone.find((zone) => String(zone.id) === zoneId);
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };
  
  const [expandedZoneId, setExpandedZoneId] = useState(null);
  const toggleZone = (zoneId: any) => {
    setExpandedZoneId((prevZoneId) => (prevZoneId === zoneId ? null : zoneId));
  };

  const [groupedCameras, setGroupedCameras] = useState<Camera[]>([]);
  const [groupedZone, setGroupedZone] = useState<Zone[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const UNASSIGNED_ID = "unassigned";
  
  const groupedData = groupedZone.reduce(
    (acc: { [key: string]: Camera[] }, zone) => {
      acc[zone.id] = groupedCameras.filter((camera) => camera.zone_id === zone.id);
      return acc;
    },
    {}
  );
  
  const unassignedCameras = groupedCameras.filter(
    (camera) => !camera.zone_id || camera.zone_id === 0
  );
  
  if (unassignedCameras.length > 0) {
    groupedData[UNASSIGNED_ID] = unassignedCameras;
  }

  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);

  useEffect(() => {
    console.log("Updated Selected Cameras:", selectedCameras);
  }, [selectedCameras]);

  const [fetchPage, setFetchPage] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${Port.URL}/cameras`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseZone = await fetch(`${Port.URL}/zones`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      if (!responseZone.ok) {
        const errorData = await responseZone.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      const dataZone = await responseZone.json();

      setGroupedCameras(data);
      setGroupedZone(dataZone);
    } catch (error) {
      console.error("Error fetching camera and zone data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchPage]);

  const [deletePopupData, setDeletePopupData] = useState<Camera | null>(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  
  const confirmDeleteCamera = (camera: Camera) => {
    setDeletePopupData(camera);
    setOpenDeletePopup(true);
  };

  const deleteCamera = async () => {
    if (!deletePopupData) return;

    try {
      setIsLoading(true);
      const deleteResponse = await fetch(
        `${Port.URL}/cameras/${deletePopupData.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!deleteResponse.ok) throw new Error("Failed to delete camera");

      setGroupedCameras((prev) =>
        prev.filter((cam) => cam.id !== deletePopupData.id)
      );
      setOpenDeletePopup(false);
    } catch (error) {
      console.error("Error deleting camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [newCameraName, setNewCameraName] = useState("");
  
  const renameCamera = async (cameraId: number, newName: string) => {
    if (!newName.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      const renameResponseCamera = await fetch(
        `${Port.URL}/cameras/${cameraId}/rename`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
        }
      );

      if (!renameResponseCamera.ok) {
        const errorData = await renameResponseCamera.json().catch(() => ({}));
        console.error("Server response:", errorData);
        
        setGroupedCameras(prevCameras => 
          prevCameras.map(camera => 
            camera.id === cameraId ? { ...camera, name: newName } : camera
          )
        );
        
        fetchData();
      } else {
        setGroupedCameras(prevCameras => 
          prevCameras.map(camera => 
            camera.id === cameraId ? { ...camera, name: newName } : camera
          )
        );
      }
      
      setRenamePopup(null);
      setNewCameraName("");
    } catch (error) {
      console.error("Error renaming camera:", error);
      fetchData();
    } finally {
      setIsLoading(false);
    }
  };

  const [renameZonePopup, setRenameZonePopup] = useState<{
    zoneId: number;
    currentName: string;
  } | null>(null);
  const [newZoneName, setNewZoneName] = useState("");

  const renameZone = async (zoneId: number, newName: string) => {
    if (!newName.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      const renameResponseZone = await fetch(`${Port.URL}/zones/${zoneId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
        }),
      });

      if (!renameResponseZone.ok) {
        const errorData = await renameResponseZone.json().catch(() => ({}));
        console.error("Server response for zone rename:", errorData);
        fetchData();
      } else {
        setGroupedZone(prevZones => 
          prevZones.map(zone => 
            zone.id === zoneId ? { ...zone, name: newName } : zone
          )
        );
      }
      
      setRenameZonePopup(null);
      setNewZoneName("");
    } catch (error) {
      console.error("Error renaming zone:", error);
      fetchData();
    } finally {
      setIsLoading(false);
    }
  };

  const [deleteZonePopup, setDeleteZonePopup] = useState<Zone | null>(null);

  const deleteZone = async (zoneId: number) => {
    try {
      setIsLoading(true);
      const deleteResponseZone = await fetch(`${Port.URL}/zones/${zoneId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!deleteResponseZone.ok) throw new Error("Failed to delete zone");

      setGroupedZone((prev) => prev.filter((zone) => zone.id !== zoneId));
      setGroupedCameras((prev) => prev.filter((camera) => camera.zone_id !== zoneId));
      
      setDeleteZonePopup(null);
    } catch (error) {
      console.error("Error deleting zone:", error);
      fetchData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const renderCamerasList = (cameras: Camera[]) => {
    return cameras.map((camera) => (
      <div
        className="duration-300 rounded-md m-3 bg-customBlue bg-opacity-90 border-b border-opacity-20 border-gray-500 hover:bg-customSlateBlue hover:bg-opacity-20"
        key={camera.id}
      >
        <div className="flex justify-between items-center w-full p-4">
          <div>{camera.name}</div>

          <div className="flex justify-end gap-2">
            <button
              onClick={(e) => {
                handleStopPropagation(e);
                setRenamePopup({
                  cameraId: camera.id,
                  currentName: camera.name,
                });
                setNewCameraName(camera.name); 
              }}
            >
              <Icon icon="mdi:rename" width="20" height="20" />
            </button>
            <button
              onClick={(e) => {
                handleStopPropagation(e);
                confirmDeleteCamera(camera);
              }}
              className="text-white"
            >
              <Icon icon="ic:baseline-delete" width="20" height="20" />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex h-screen bg-gray-90">
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16 overflow-auto relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <div className="">
          {/* Unassigned cameras section first */}
          {unassignedCameras.length > 0 && (
            <div key={UNASSIGNED_ID}>
              <div
                className="w-full text-xl cursor-pointer"
                onClick={() => {
                  setSelectZone(UNASSIGNED_ID);
                  toggleZone(UNASSIGNED_ID);
                }}
              >
                <div
                  tabIndex={1}
                  className="flex justify-between p-6 border-b border-opacity-20 border-gray-500 duration-300 hover:bg-customSlateBlue hover:bg-opacity-20 focus:bg-customSlateBlue focus:bg-opacity-20"
                >
                  Unassigned
                  <div className="flex gap-2">
                    {/* No rename or delete options for Unassigned section */}
                  </div>
                </div>
              </div>
              <ul
                className="max-h-96 overflow-auto"
                style={{
                  display: expandedZoneId === UNASSIGNED_ID ? "block" : "none",
                }}
              >
                {renderCamerasList(unassignedCameras)}
              </ul>
            </div>
          )}

          {/* Regular zones */}
          {Object.entries(groupedData)
            .filter(([zoneId]) => zoneId !== UNASSIGNED_ID)
            .map(([zoneId, cameras]) => (
              <div key={zoneId}>
                <div
                  className="w-full text-xl cursor-pointer"
                  onClick={() => {
                    setSelectZone(zoneId);
                    toggleZone(zoneId);
                  }}
                >
                  <div
                    tabIndex={1}
                    className="flex justify-between p-6 border-b border-opacity-20 border-gray-500 duration-300 hover:bg-customSlateBlue hover:bg-opacity-20 focus:bg-customSlateBlue focus:bg-opacity-20"
                  >
                    {getZoneName(zoneId)}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          handleStopPropagation(e);
                          setRenameZonePopup({
                            zoneId: Number(zoneId),
                            currentName: getZoneName(zoneId),
                          });
                          setNewZoneName(getZoneName(zoneId));
                        }}
                      >
                        <Icon icon="mdi:rename" width="20" height="20" />
                      </button>
                      <button
                        onClick={(e) => {
                          handleStopPropagation(e);
                          setDeleteZonePopup({
                            id: Number(zoneId),
                            name: getZoneName(zoneId),
                            created: "",
                            location: "",
                          });
                        }}
                        className="text-white"
                      >
                        <Icon icon="ic:baseline-delete" width="20" height="20" />
                      </button>
                    </div>
                  </div>
                </div>
                <ul
                  className="max-h-96 overflow-auto"
                  style={{
                    display: expandedZoneId === zoneId ? "block" : "none",
                  }}
                >
                  {renderCamerasList(cameras)}
                </ul>
              </div>
            ))}
        </div>

        {renamePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
            <div className="bg-customBlue w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Rename Camera</h2>
              <input
                type="text"
                className="border h-8 p-2 rounded text-black w-full focus:outline-none"
                value={newCameraName}
                onChange={(e) => setNewCameraName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setRenamePopup(null);
                    setNewCameraName("");
                  }}
                  className="w-24 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newCameraName.trim()) {
                      renameCamera(renamePopup.cameraId, newCameraName);
                    }
                  }}
                  className="w-24 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover"
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        )}

        {openDeletePopup && deletePopupData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h2 className="flex justify-start text-xl font-bold mb-4 text-center">
                Delete Camera
              </h2>
              <p className="text-white">
                Are you sure you want to delete <b>{deletePopupData.name}</b> ?
              </p>
              <div className="flex flex-col justify-center bg-red-200 p-2 my-2 border-l-8 border-red-950">
                <div className="text-red-800 text-lg">warning</div>
                <div className="text-gray-500 text-sm">
                  By Deleteing this camera, you won't be able to access the
                  system.
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setOpenDeletePopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCamera}
                  className="px-4 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {renameZonePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
            <div className="bg-customBlue w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Rename Zone</h2>
              <input
                type="text"
                className="border h-8 p-2 rounded text-black w-full focus:outline-none"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setRenameZonePopup(null);
                    setNewZoneName("");
                  }}
                  className="w-24 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newZoneName.trim()) {
                      renameZone(renameZonePopup.zoneId, newZoneName);
                    }
                  }}
                  className="w-24 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover"
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteZonePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Delete Zone
              </h2>
              <p className="text-white">
                Are you sure you want to delete <b>{deleteZonePopup.name}</b> ?
              </p>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setDeleteZonePopup(null)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteZone(deleteZonePopup.id)}
                  className="px-4 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Layout and Actions */}
        <div className="mt-auto">
          <div>
            {/* Layout Options */}
            {layoutActive && (
              <div className="flex justify-end pr-2">
                <div className="flex justify-center bg-customSlateBlue bg-opacity-30 rounded-md">
                  <div
                    onClick={() => setTypeLayout("nineLayout")}
                    className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md"
                  >
                    <Icon
                      icon="material-symbols-light:grid-on"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div
                    onClick={() => setTypeLayout("fourLayout")}
                    className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md"
                  >
                    <Icon icon="flowbite:grid-solid" width="24" height="24" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end p-2 w-full">
            {/* Add Camera Button */}
            <div className="flex">
              <button 
                onClick={() => togglePopup(true)}
                className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
              >
                <Icon icon="carbon:select-window" width="24" height="24" />
              </button>
              <button
                onClick={() => setOpenPopup(true)}
                className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
              >
                <Icon icon="gg:add" width="24" height="24" />
              </button>
              {openPopup && <AddCamera setOpenPopup={setOpenPopup} />}
            </div>

            {/* Layout Button */}
            <button
              onClick={toggleLayout}
              className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
            >
              <Icon icon="mingcute:layout-6-fill" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;