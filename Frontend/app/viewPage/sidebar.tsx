import React, { useState , useEffect } from "react";
import { Icon } from "@iconify/react";
import EditPopup from "./popupEdit";
import AddCamera from "./popupAddCamera";
import { StaticImageData } from "next/image";


interface Zone {
  id: string;
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
  cameraName: string;
  video: any;
}

interface CameraType {
  id: string;
  name: string;
  location: string;
  zone_id: string;
  created: string;
}


const Sidebar: React.FC<SidebarProp> = ({
  setTypeLayout,
  setSelectZone,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<{
    dropdownA: number | null;
  }>({ dropdownA: null });

  const [openPopupId, setOpenPopupId] = useState<{
    reName: number | null;
    deLete: number | null;
  }>({ reName: null, deLete: null });

  const toggleDropdown = (dropdownType: "dropdownA", cameraId: number) => {
    setOpenDropdownId((prevState) => ({
      ...prevState,
      [dropdownType]: prevState[dropdownType] === cameraId ? null : cameraId,
    }));
  };
  const showPopup = (popupType: "reName" | "deLete", cameraId: number) => {
    setOpenPopupId((prevState) => ({
      ...prevState,
      [popupType]: cameraId,
    }));
  };

  const closePopup = (popupType: "reName" | "deLete") => {
    setOpenPopupId((prevState) => ({
      ...prevState,
      [popupType]: null,
    }));
  };

  const [layoutActive, setLayoutActive] = useState(false);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [editCamera, setEditCamera] = useState(false);
  const [showCameraZone, setShowCameraZone] = useState<number | null>(null);

  const changeZone = (zoneId: number) => {
    setSelectZone(zoneId);
    
    // รีเซ็ตค่า dropdown และ popup เมื่อเปลี่ยนโซน
    setOpenDropdownId({ dropdownA: null });
    setOpenPopupId({ reName: null, deLete: null });
  };

  const toggleLayout = () => setLayoutActive(!layoutActive);
  const toggleAddPopup = () => setAddPopupActive(!addPopupActive);
  const toggleEditCamera = () => setEditCamera(!editCamera);
  const [groupedCameras, setGroupedCameras] = useState<CameraType[]>([]);
  const [groupedZone , setGroupedZone ] = useState<Zone[]>([]);
  const groupedData = groupedCameras.reduce((acc: { [key: string]: typeof groupedCameras }, item) => {
    if (!acc[item.zone_id]) acc[item.zone_id] = [];
    acc[item.zone_id].push(item);
    return acc;
  }, {});
  
  const toggleCameraZone = (zoneId: number) => {
    setShowCameraZone((prevZone) => (prevZone === zoneId ? null : zoneId));
  };
  useEffect(() => {
    const getCamera = async () => {
      try {
        const response = await fetch('http://sardines.thddns.net:7270/cameras', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })
        const responseZone = await fetch('http://sardines.thddns.net:7270/zones', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })
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
        setGroupedZone(dataZone)
        console.log(data)
      } catch (error) {
      }
    }
    getCamera()
  }, []);
  
  const getZoneName = (zoneId:string) => {
    console.log(zoneId)
    const zoneInfo = groupedZone.find((zone) => zone.id === zoneId);
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16 overflow-auto ">
        {/* List of Zones */}
        <div className="flex-1">
        <div>
      <h2>Camera List</h2>
      {Object.entries(groupedData).map(([zoneId, cameras]) => (
        <div key={zoneId}>
        <div>{getZoneName(zoneId)}</div>
          <ul>
            {cameras.map((camera) => (
              <li key={camera.id}>{camera.name} - {camera.location}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
          {/* {zones.map((zone) => (
            <div key={zone.id}>
              <div
                onClick={() => {
                  toggleCameraZone(zone.id);
                  changeZone(zone.id);
                }}
                className="flex justify-start items-center hover:bg-customSlateBlue px-8 h-16 cursor-pointer border-customSlateBlue w-full"
              >
                <Icon
                  className="p-2"
                  icon="material-symbols:activity-zone"
                  width="40"
                  height="40"
                />
                {zone.name}
              </div>
              <div
                className={`transition-all duration-100 ease-in-out overflow-hidden ${showCameraZone === zone.id ? "max-h-screen" : "max-h-0"
                  }`}
              >
                {zone.cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className="hover:bg-customSlateBlue px-8 h-16 flex justify-center items-center cursor-pointer"
                  >
                    <div className="flex text-sm w-full border-customSlateBlue">
                      <div className="flex justify-between w-full ml-12">
                        <div className="flex justify-center items-center">
                          {camera.cameraName}
                        </div>
                        <div className="relative">
                          <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => toggleDropdown("dropdownA", camera.id)}
                          >
                            <Icon
                              icon="flowbite:dots-horizontal-outline"
                              width="24"
                              height="24"
                            />
                          </div>
                          {openDropdownId.dropdownA === camera.id && openDropdownId.dropdownA !== null && (
                            <div className="fixed left-56 w-36 bg-white text-black rounded-md border-gray-300 shadow-lg z-10 transition-all transform duration-300 ease-in-out ">
                              <div
                                className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-t-md w-full cursor-pointer"
                                onClick={() => showPopup("reName", camera.id)}
                              >
                                Rename
                              </div>
                              <div
                                className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-b-md w-full cursor-pointer"
                                onClick={() => showPopup("deLete", camera.id)}
                              >
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {openPopupId.reName === camera.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-customBlue w-80 p-10 rounded-xl shadow-lg">
                          <div className="flex justify-between">
                            <div className="text-2xl w-48 text-white pb-4">
                              Rename
                            </div>

                          </div>

                          <input
                            placeholder="Enter new camera name"
                            className="w-full mt-2 text-black p-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                          <div className="flex justify-end gap-2">
                            <div
                              onClick={() => closePopup("reName")}
                              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-sm"
                            >
                              close
                            </div>
                            <button className="mt-4 px-4 py-2 bg-customฺButton text-white rounded-sm hover:bg-customฺButtomHover">
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {openPopupId.deLete === camera.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-customBlue p-10 rounded-2xl shadow-lg">
                          <h3 className="text-lg text-white ">
                            Are you sure you want to delete this item?
                          </h3>

                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => closePopup("deLete")}
                              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-sm"
                            >
                              No
                            </button>
                            <button className="mt-4 px-4 py-2 bg-customฺButton text-white rounded-sm">
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))} */}
        </div>
        

        {/* Layout and Actions */}
        <div className="mt-auto">
          <div>
            {/* Layout Options */}
            {layoutActive && (
              <div className="flex justify-end pr-5">
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
                  onClick={toggleAddPopup}
                  className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
                >
                  <Icon icon="gg:add" width="24" height="24" />
                </button>
                {addPopupActive && <AddCamera />}
              </div>

              {/* Layout Button */}
              <button
                onClick={toggleLayout}
                className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
              >
                <Icon icon="mingcute:layout-6-fill" width="24" height="24" />
              </button>

              {/* Edit Camera Button */}
              <button
                onClick={toggleEditCamera}
                className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
              >
                <Icon icon="cuida:edit-outline" width="24" height="24" />
              </button>

              {editCamera && <EditPopup />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
