import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditPopup from "./editPopup";
import AddCamera from "./addCamera";
interface sidebarprop {
  setTypeLayout: (type: string) => void;
}

const Sidebar: React.FC<sidebarprop> = ({ setTypeLayout }) => {
  const [layoutActive, setLayoutActive] = useState(false);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [editCamera, setEditCamera] = useState(false);

  const toggleLayout = () => setLayoutActive(!layoutActive);
  const toggleAddPopup = () => setAddPopupActive(!addPopupActive);
  const toggleEditCamera = () => setEditCamera(!editCamera);
 
  const [ShowCameraZone, setShowCameraZone] = useState(false);
  const toggleCameraZone = () => setShowCameraZone(!ShowCameraZone);
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Camera Zone */}
      <div className="w-64 h-screen bg-customBlue text-white flex flex-col pt-16">

        <div className="flex-1">
          {/* Toggle Camera Zone */}
          <div className="flex justify-start items-center hover:bg-customSlateBlue px-8 h-16">
            <div
              onClick={toggleCameraZone}
              className="flex justify-start items-center cursor-pointer border-b border-customSlateBlue w-full h-16"
            >
              <Icon
                className="p-2"
                icon="material-symbols:activity-zone"
                width="40"
                height="40"
              />
              Zone2
            </div>
          </div>

          {/* Camera Zone List */}
          {ShowCameraZone && (
            <div>
              <div className="hover:bg-customSlateBlue px-8 h-16 flex justify-center items-center cursor-pointer">
                <div className="flex justify-center border-b border-customSlateBlue w-full h-16">
                  <div className="flex justify-start items-center text-sm">
                    <Icon
                      className="p-2"
                      icon="mdi:cctv"
                      width="40"
                      height="40"
                    />
                    Camera Zone 1
                  </div>
                  <div className="flex justify-center items-center">
                    <Icon
                      className="pl-6"
                      icon="ph:dots-three"
                      width="40"
                      height="40"
                    />
                  </div>
                </div>
              </div>
              <div className="hover:bg-customSlateBlue px-8 h-16 flex justify-center items-center cursor-pointer">
                <div className="flex justify-center border-b border-customSlateBlue w-full h-16">
                  <div className="flex justify-start items-center text-sm">
                    <Icon
                      className="p-2"
                      icon="mdi:cctv"
                      width="40"
                      height="40"
                    />
                    Camera Zone 2
                  </div>
                  <div className="flex justify-center items-center">
                    <Icon
                      className="pl-6"
                      icon="ph:dots-three"
                      width="40"
                      height="40"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-auto">
          {/* <EditLayout
                    setTypeLayout = {setTypeLayout}/> */}
          <div>
            {/* Layout */}
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
                    onClick={() => setTypeLayout("fiveLayout")}
                    className="flex justify-center items-center p-2 hover:bg-customSlateBlue hover:rounded-md"
                  >
                    <Icon
                      icon="mingcute:layout-8-fill"
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

            <div className="flex justify-end p-2 w-full">
              <div>
                <button
                  onClick={toggleAddPopup}
                  className="flex justify-center items-center w-12 h-12 hover:bg-customSlateBlue hover:bg-opacity-30 text-white rounded-3xl"
                >
                  <Icon icon="gg:add" width="24" height="24" />
                </button>

                {/* Add Camera Popup */}
                {addPopupActive && (
                 <AddCamera/>
                )}
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

              {/* Edit Camera Popup */}
              {editCamera && (
                <EditPopup/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
