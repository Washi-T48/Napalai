import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditPopup from "./popupEdit";
import AddCamera from "./popupAddCamera";

interface sidebarprop {
  setTypeLayout: (type: string) => void;
}

const Sidebar: React.FC<sidebarprop> = ({ setTypeLayout }) => {
  const [layoutActive, setLayoutActive] = useState(false);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [editCamera, setEditCamera] = useState(false);
  const [showCameraZone, setShowCameraZone] = useState<number | null>(null);

  const toggleLayout = () => setLayoutActive(!layoutActive);
  const toggleAddPopup = () => setAddPopupActive(!addPopupActive);
  const toggleEditCamera = () => setEditCamera(!editCamera);

  const zones = [
    { id: 1, name: "Zone 1", cameras: ["Camera Zone 1", "Camera Zone 2"] },
    { id: 2, name: "Zone 2", cameras: ["Camera Zone 3", "Camera Zone 4"] },
  ];

  const toggleCameraZone = (zoneId: number) => {
    setShowCameraZone((prevZone) => (prevZone === zoneId ? null : zoneId));
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16">
        <div className="flex-1">
          {zones.map((zone) => (
            <div key={zone.id}>
              {/* Zone Header */}
              <div
                onClick={() => toggleCameraZone(zone.id)}
                className="flex justify-start items-center hover:bg-customSlateBlue px-8 h-16 cursor-pointer border-b border-customSlateBlue w-full"
              >
                <Icon className="p-2" icon="material-symbols:activity-zone" width="40" height="40" />
                {zone.name}
              </div>

              {/* Camera Zone */}
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
                    <div className="flex justify-start items-center text-sm w-full border-b border-customSlateBlue">
                      <Icon className="p-2" icon="mdi:cctv" width="40" height="40" />
                      {camera}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div>
            {/* Layout */}
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

            <div className="flex justify-end p-2 w-full">
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
    </div>
  );
};

export default Sidebar;
