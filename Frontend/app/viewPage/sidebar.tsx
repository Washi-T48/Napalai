import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AddCamera from "./popupAddCamera";
import Port from "../port";


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

  const getZoneName = (zoneId: string) => {
    console.log(zoneId)
    const zoneInfo = groupedZone.find((zone) => zone.id === zoneId);
    return zoneInfo ? zoneInfo.name : "Unknown Zone";
  };
  const [expandedZoneId, setExpandedZoneId] = useState(null); // ใช้สถานะในการติดตามโซนที่ถูกขยาย
  const toggleZone = (zoneId: any) => {
    setExpandedZoneId(prevZoneId => (prevZoneId === zoneId ? null : zoneId)); // สลับการแสดงโซน
  };

  const [groupedCameras, setGroupedCameras] = useState<CameraType[]>([]);
  const [groupedZone, setGroupedZone] = useState<Zone[]>([]);

  const groupedData = groupedCameras.reduce((acc: { [key: string]: typeof groupedCameras }, item) => {
    if (!acc[item.zone_id]) acc[item.zone_id] = [];
    acc[item.zone_id].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const getCamera = async () => {
      try {
        // const postZone = await fetch(`${Port.URL}/zones`, {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: {


        //   }
        // })
        // if (!postZone.ok) {
        //   const errorData = await postZone.json();
        //   throw new Error(errorData.message || "Network response was not ok");
        // }
        const response = await fetch(`${Port.URL}/cameras`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })

        const responseZone = await fetch(`${Port.URL}/zones`, {
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
                {getZoneName(zoneId)}
              </div>
              <ul
                style={{
                  display: expandedZoneId === zoneId ? 'block' : 'none'
                }}
              >
                {cameras.map((camera) => (
                  <div
                    className="flex items-center w-full p-6 pl-12 hover:bg-customSlateBlue"
                    key={camera.id}>
                    {camera.name}
                    {/* <div className=" flex justify-start items-end pl-2 w-full text-gray-500 text-tiny">
                  {camera.location}
                </div> */}
                    <div className="flex justify-end w-full">
                      ...
                    </div>
                  </div>
                ))}
              </ul>
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
