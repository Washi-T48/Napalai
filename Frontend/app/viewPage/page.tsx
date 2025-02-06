"use client";

import React from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Videos from "../viewPage/videos";
import { useState, useEffect } from "react";
import { count } from "console";


function Page() {
  const [typeLayout, setTypeLayout] = useState("nineLayout");
  const [selectZone, setSelectZone] = useState(1);
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1); // ค่าสถานะของโซนที่เลือก
  const [groupedCameras, setGroupedCameras] = useState({});
  const [checkRespon, setCheckRespon] = useState([]);
  

  useEffect(() => {
    const getCamera = async () => {
      try {
        const response = await fetch('http://sardines.thddns.net:7270/cameras', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
        const data = await response.json();
        setCheckRespon(data)
        const grouped = data.reduce((acc, camera) => {
          acc[camera.zone_id] = acc[camera.zone_id] || [];
          acc[camera.zone_id].push(camera);
          return acc;
        }, {});
        setGroupedCameras(grouped);
        console.log(grouped)
      } catch (error) {
      }
    }
    getCamera()
  }, []);



  const zones = [
    {
      id: 1,
      name: "หน้าบ้าน",
      cameras: [
        { id: 1, cameraName: "cam1", video: "/video/test.mp4" },
        { id: 2, cameraName: "cam2", video: "/video/test.mp4" },
        { id: 3, cameraName: "cam3", video: "/video/test.mp4" },
        { id: 4, cameraName: "cam1", video: "/video/test.mp4" },
        { id: 5, cameraName: "cam2", video: "/video/test.mp4" },
        { id: 6, cameraName: "cam3", video: "/video/test.mp4" },
        { id: 7, cameraName: "cam1", video: "/video/test.mp4" },
        { id: 8, cameraName: "cam2", video: "/video/test.mp4" },
        { id: 9, cameraName: "cam3", video: "/video/test.mp4" },

      ],
    },
    {
      id: 2,
      name: "หลังบ้าน",
      cameras: [
        { id: 10, cameraName: "cam1", video: "/video/test.mp4" },
        { id: 11, cameraName: "cam2", video: "/video/test.mp4" },
      ],
    },
    {
      id: 3,
      name: "โรงอาหารบ้าน",
      cameras: [
        { id: 12, cameraName: "cam1", video: "/video/test.mp4" },
      ],
    },
  ];


  return (
    <>
      <Navber />
      <div className=" min-h-screen bg-customBlue">
        <div className="flex w-full h-full">
          <Sidebar
            setTypeLayout={setTypeLayout}
            zones={zones}
            setSelectZone={setSelectedZoneId}
          />
          <div className="flex justify-center items-center w-full h-screen pt-16">
            <div className="bg-white h-full w-full">
              <Videos
                typeLayout={typeLayout}
                zones={zones}
                selectedZoneId={selectedZoneId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;