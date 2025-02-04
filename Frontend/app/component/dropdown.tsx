import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface DropdownProps {
  onSelect: (type: string, value: string) => void;
  zones: string[];
  cameras: string[];
  statuses: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, zones, cameras, statuses }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };


  return (
    <div className="flex flex-col ">
      {/* Zone Dropdown */}
      <div className="m-2 dropdown-container relative">
        <button
          onClick={() => toggleDropdown("zone")}
          className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 px-8 py-3 items-center"
        >
          {selectedZone || "Select Zone"}
          <Icon icon={openDropdown === "zone" ? "mingcute:up-fill" : "mingcute:down-fill"} width="24" height="24" />
        </button>

        {openDropdown === "zone" && (
          <div className="absolute z-10 w-56 h-40 overflow-auto mt-1 bg-white shadow-lg rounded-lg">
            {zones.map((zone) => (
              <div
                key={zone}
                onClick={() => {
                  setSelectedZone(zone); // อัปเดตค่าโซนที่เลือก
                  onSelect("zone", zone);
                  setOpenDropdown(null);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {zone}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Camera Dropdown */}
      <div className="m-2 dropdown-container relative">
        <button
          onClick={() => toggleDropdown("camera")}
          className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 px-8 py-3 items-center"
        >
          {selectedCamera || "Select Camera"}
          <Icon icon={openDropdown === "camera" ? "mingcute:up-fill" : "mingcute:down-fill"} width="24" height="24" />
        </button>

        {openDropdown === "camera" && (
          <div className="absolute z-10 w-56 h-40 overflow-auto mt-1 bg-white shadow-lg rounded-lg over">
            {cameras.map((camera) => (
              <div
                key={camera}
                onClick={() => {
                  setSelectedCamera(camera);
                  onSelect("camera", camera);
                  setOpenDropdown(null);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {camera}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Dropdown */}
      <div className="m-2 dropdown-container relative">
        <button
          onClick={() => toggleDropdown("status")}
          className="flex justify-between w-56 text-black bg-white shadow rounded-lg hover:bg-gray-100 px-8 py-3 items-center"
        >
          {selectedStatus || "Select Status"}
          <Icon icon={openDropdown === "status" ? "mingcute:up-fill" : "mingcute:down-fill"} width="24" height="24" />
        </button>

        {openDropdown === "status" && (
          <div className="absolute z-10 w-56 mt-1 bg-white shadow-lg rounded-lg">
            {statuses.map((status) => (
              <div
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  onSelect("status", status);
                  setOpenDropdown(null);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
