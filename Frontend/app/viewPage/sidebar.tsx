import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AddCamera from "./popupAddCamera";
import Port from "../port";


interface Zone {
  id: number;
  created: string;
  name: string;
  location: string;
};

interface SidebarProp {
  setTypeLayout: (type: string) => void;
  setSelectZone: (zoneId: number) => void;
}

interface Camera {
  id: number;
  name: string;
  location: string;
  zone_id: number;
  created: string;
}


const Sidebar: React.FC<SidebarProp> = ({
  setTypeLayout,
  setSelectZone,
}) => {

  const [openPopup, setOpenPopup] = useState(false)
  const [layoutActive, setLayoutActive] = useState(false);
  const toggleLayout = () => setLayoutActive(!layoutActive);

  const [renamePopup, setRenamePopup] = useState<{ cameraId: number, currentName: string } | null>(null);


  const getZoneName = (zoneId: number) => {
    console.log(zoneId)
    const zoneInfo = groupedZone.find((zone) => zone.id === zoneId);
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };
  const [expandedZoneId, setExpandedZoneId] = useState(null);
  const toggleZone = (zoneId: any) => {
    setExpandedZoneId(prevZoneId => (prevZoneId === zoneId ? null : zoneId));
  };

  const [groupedCameras, setGroupedCameras] = useState<Camera[]>([]);
  const [groupedZone, setGroupedZone] = useState<Zone[]>([]);

  const groupedData = groupedCameras.reduce((acc: { [key: string]: typeof groupedCameras }, item) => {
    if (!acc[item.zone_id]) acc[item.zone_id] = [];
    acc[item.zone_id].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const getCamera = async () => {
      try {
        const response = await fetch(`${Port.URL}/cameras`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });

        const responseZone = await fetch(`${Port.URL}/zones`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
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

        console.log(data);
      } catch (error) {
        console.error("Error fetching camera and zone data:", error);
      }
    };
    getCamera();
  }, []);


  const [deletePopupData, setDeletePopupData] = useState<Camera | null>(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const confirmDeleteCamera = (camera: Camera) => {
    setDeletePopupData(camera);
    setOpenDeletePopup(true);
  };

  const deleteCamera = async () => {
    if (!deletePopupData) return;

    try {
      const deleteResponse = await fetch(`${Port.URL}/cameras/${deletePopupData.id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      if (!deleteResponse.ok) throw new Error("Failed to delete camera");

      // อัปเดต state หลังจากลบสำเร็จ
      setGroupedCameras(prev => prev.filter(cam => cam.id !== deletePopupData.id));
      setOpenDeletePopup(false);

    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };

  const [newCameraName, setNewCameraName] = useState("");
  const renameCamera = async (cameraId: number, newName: string) => {
    console.log(`Renaming camera ID: ${cameraId} to "${newName}"`);

    try {
      const renameResponseCamera = await fetch(`${Port.URL}/cameras/${cameraId}/rename`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName
        }),
      });

      const responseText = await renameResponseCamera.text();
      console.log("API Response:", responseText); // ดูว่า API คืนค่าอะไร

      if (!renameResponseCamera.ok) {
        throw new Error("Failed to rename camera");
      }

      console.log(`Renamed camera with ID: ${cameraId} to "${newName}"`);
    } catch (error) {
      console.error("Error renaming camera:", error);
    }
  };

  const [renameZonePopup, setRenameZonePopup] = useState<{ zoneId: number, currentName: string } | null>(null);
  const [newZoneName, setNewZoneName] = useState("");



  // Rename Zone API call
  const renameZone = async (zoneId: number, newName: string) => {
    console.log(`Renaming zone ID: ${zoneId} to "${newName}"`);

    try {
      const renameResponseZone = await fetch(`${Port.URL}/zones/${zoneId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName
        }),
      });

      if (!renameResponseZone.ok) {
        throw new Error("Failed to rename zone");
      }

      console.log(`Renamed zone with ID: ${zoneId} to "${newName}"`);
    } catch (error) {
      console.error("Error renaming zone:", error);
    }
  };


  const [deleteZonePopup, setDeleteZonePopup] = useState<Zone | null>(null);

  const deleteZone = async (zoneId: number) => {
    console.log("this zone :", zoneId)
    try {
      const deleteResponseZone = await fetch(`${Port.URL}/zones/${zoneId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      if (!deleteResponseZone.ok) throw new Error("Failed to delete zone");

      // ลบโซนจาก state
      setGroupedZone(prev => prev.filter(zone => zone.id !== zoneId));
      setDeleteZonePopup(null);

    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };



  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16 overflow-auto ">
        <div className="">
          {Object.entries(groupedData).map(([zoneId, cameras]) => (
            <div key={zoneId}>
              <div
                className="w-full p-6 text-xl cursor-pointer hover:bg-customSlateBlue"
                onClick={() => toggleZone(zoneId)}
              >
                <div className="flex">
                  {getZoneName(zoneId)}
                  <div className="flex justify-end w-full gap-2">
                    <button onClick={() => setRenameZonePopup({ zoneId: Number(zoneId), currentName: getZoneName(Number(zoneId)) })}>
                      <Icon icon="mdi:rename" width="20" height="20" />
                    </button>
                    <button onClick={() => setDeleteZonePopup({ id: Number(zoneId), name: getZoneName(zoneId) })} className="text-red-500">
                      <Icon icon="ic:baseline-delete" width="20" height="20" />
                    </button>
                  </div>

                </div>

              </div>
              <ul
                style={{
                  display: expandedZoneId === zoneId ? 'block' : 'none'
                }}
              >
                {cameras.map((camera) => (
                  <div
                    className="flex items-center w-full p-4 pl-12 hover:bg-customSlateBlue"
                    key={camera.id}
                  >
                    {camera.name}
                    <div className="flex justify-end w-full gap-2">
                      <button onClick={() => setRenamePopup({ cameraId: camera.id, currentName: camera.name })}>
                        <Icon icon="mdi:rename" width="20" height="20" />
                      </button>
                      <button onClick={() => confirmDeleteCamera(camera)} className="text-red-500">
                        <Icon icon="ic:baseline-delete" width="20" height="20" />
                      </button>

                    </div>
                  </div>
                ))}
              </ul>
            </div>

          ))}

        </div>
        {renamePopup && (
          <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
            <div className="bg-customBlue w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Rename Camera</h2>
              <input
                type="text"
                className="border h-8 p-2  rounded text-black w-full  focus:outline-none"
                value={newCameraName}
                onChange={(e) => setNewCameraName(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setRenamePopup(null)} className="w-24 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                <button
                  onClick={() => {
                    renameCamera(renamePopup.cameraId, newCameraName);
                    setRenamePopup(null);
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h2 className="flex justify-start text-xl font-bold mb-4 text-center">Delete Camera</h2>
              <p className="text-white">Are you sure you want to delete <b>{deletePopupData.name}</b> ?</p>
              <div className="flex flex-col justify-center bg-red-200 p-2 my-2 border-l-8 border-red-950">
                <div className="text-red-800 text-lg">
                  warning
                </div>
                <div className="text-gray-500 text-sm">
                  By Deleteing this camera,you won't be able to access the system.
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button onClick={() => setOpenDeletePopup(false)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={deleteCamera} className="px-4 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {renameZonePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-customBlue w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Rename Zone</h2>
              <input
                type="text"
                className="border h-8 p-2 rounded text-black w-full focus:outline-none"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setRenameZonePopup(null)} className="w-24 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                <button
                  onClick={() => {
                    renameZone(renameZonePopup.zoneId, newZoneName);
                    setRenameZonePopup(null);
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-customBlue p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Delete Zone</h2>
              <p className="text-white">Are you sure you want to delete <b>{deleteZonePopup.name}</b> ?</p>
              <div className="flex justify-end gap-3 mt-5">
                <button onClick={() => setDeleteZonePopup(null)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={() => deleteZone(deleteZonePopup.id)} className="px-4 py-2 bg-customฺButton text-white rounded hover:bg-customฺButtomHover">
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
                    <Icon icon="material-symbols-light:grid-on" width="24" height="24" />
                  </div>
                  <div
                    onClick={() => setTypeLayout("sixLayout")}
                    className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md"
                  >
                    <Icon icon="mingcute:layout-8-fill" width="24" height="24" />
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
            <div>
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

            {/* Edit Camera Button */}
            {/* <button
              onClick={() => setOpenPopup(true)}
              className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
            >
              <Icon icon="cuida:edit-outline" width="24" height="24" />
            </button>

            {openPopup && <EditPopup setOpenPopup={setOpenPopup} />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
