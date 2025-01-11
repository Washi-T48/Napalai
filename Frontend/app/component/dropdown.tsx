import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";

function Dropdown() {
  // สถานะแยกสำหรับแต่ละ dropdown
  const [isZoneOpen, setIsZoneOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const zoneDropdownRef = useRef(null);
  const cameraDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const toggleZoneDropdown = () => {
    setIsZoneOpen(!isZoneOpen);
  };

  const toggleCameraDropdown = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  const toggleStatusDropdown = () => {
    setIsStatusOpen(!isStatusOpen);
  };
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div>
    {/* Dropdown for Zone */}
    <div className="m-2">
      <button
        onClick={() => toggleDropdown("zone")}
        className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 focus:ring-0 focus:outline-none font-medium text-sm px-8 py-3 text-center items-center z-12"
        type="button"
      >
        Select Zone
        <Icon icon={openDropdown === "zone" ? "mingcute:down-fill" : "mingcute:up-fill"} width="24" height="24" />
      </button>

      {openDropdown === "zone" && (
        <div className="fixed z-10 w-56 pt-1 divide-y divide-gray-100">
          <div className="z-11 text-sm text-black bg-white rounded-lg shadow">
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Zone1</div>
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Zone2</div>
          </div>
        </div>
      )}
    </div>

    {/* Dropdown for Camera */}
    <div className="m-2">
      <button
        onClick={() => toggleDropdown("camera")}
        className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 focus:ring-0 focus:outline-none font-medium text-sm px-8 py-3 text-center items-center z-12"
        type="button"
      >
        Select Camera
        <Icon icon={openDropdown === "camera" ? "mingcute:down-fill" : "mingcute:up-fill"} width="24" height="24" />
      </button>

      {openDropdown === "camera" && (
        <div className="fixed z-10 w-56 pt-1 divide-y divide-gray-100">
          <div className="z-11 text-sm text-black bg-white rounded-lg shadow">
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Camera1</div>
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Camera2</div>
          </div>
        </div>
      )}
    </div>

    {/* Dropdown for Status */}
    <div className="m-2">
      <button
        onClick={() => toggleDropdown("status")}
        className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 focus:ring-0 focus:outline-none font-medium text-sm px-8 py-3 text-center items-center z-12"
        type="button"
      >
        Select Status
        <Icon icon={openDropdown === "status" ? "mingcute:down-fill" : "mingcute:up-fill"} width="24" height="24" />
      </button>

      {openDropdown === "status" && (
        <div className="fixed z-10 w-56 pt-1 divide-y divide-gray-100">
          <div className="z-11 text-sm text-black bg-white rounded-lg shadow">
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Active</div>
            <div className="block px-4 py-3 hover:bg-gray-100 dark:hover:text-black">Non Active</div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Dropdown;
