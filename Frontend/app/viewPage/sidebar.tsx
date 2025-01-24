import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditPopup from "./popupEdit";
import AddCamera from "./popupAddCamera";
import { StaticImageData } from "next/image";

interface SidebarProp {
  setTypeLayout: (type: string) => void;
  setSelectZone: (zoneId: number) => void;
  zones: Zone[];
}

interface Zone {
  id: number;
  name: string;
  cameras: Camera[];
}

interface Camera {
  cameraName: string;
  imges: StaticImageData;
}

const Sidebar: React.FC<SidebarProp> = ({
  setTypeLayout,
  zones,
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
  };

  const toggleLayout = () => setLayoutActive(!layoutActive);
  const toggleAddPopup = () => setAddPopupActive(!addPopupActive);
  const toggleEditCamera = () => setEditCamera(!editCamera);

  const toggleCameraZone = (zoneId: number) => {
    setShowCameraZone((prevZone) => (prevZone === zoneId ? null : zoneId));
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16">
        {/* List of Zones */}
        <div className="flex-1">
          {zones.map((zone) => (
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
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showCameraZone === zone.id ? "max-h-screen" : "max-h-0"
                }`}
              >
                {zone.cameras.map((camera, index) => (
                  <div
                    key={index}
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
                            onClick={() => toggleDropdown("dropdownA", index)}
                          >
                            <Icon
                              icon="flowbite:dots-horizontal-outline"
                              width="24"
                              height="24"
                            />
                          </div>
                          {openDropdownId.dropdownA === index && (
                            <div className="absolute right-0 w-36 bg-white text-black rounded-md border-gray-300 shadow-lg z-10">
                              <div
                                className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-t-md w-full cursor-pointer"
                                onClick={() => showPopup("reName", index)}
                              >
                                Rename
                              </div>
                              <div
                                className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-b-md w-full cursor-pointer"
                                onClick={() => showPopup("deLete", index)}
                              >
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Popup A */}
                    {openPopupId.reName === index && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-customBlue p-6 rounded shadow-lg">
                          <h3 className="text-lg w-48 text-white font-bold">
                            Rename
                          </h3>
                          <input className="mt-2 text-black p-1"></input>
                          <div className="flex gap-2">
                          <button
                            onClick={() => closePopup("reName")}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Close
                          </button>
                          <button className="mt-4 px-4 py-2 bg-green-700 text-white ">
                            Submit
                          </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Popup B */}
                    {openPopupId.deLete === index && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-customBlue p-6 rounded shadow-lg">
                          <h3 className="text-lg w-48 text-white font-bold">
                            Delete?
                          </h3>
                          
                          <div className="flex gap-2">
                          <button
                            onClick={() => closePopup("deLete")}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            No
                          </button>
                          <button className="mt-4 px-4 py-2 bg-green-700 text-white ">
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
          ))}
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
                    <Icon
                      icon="material-symbols-light:grid-on"
                      width="24"
                      height="24"
                    />
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

              {editCamera && <EditPopup/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
