"use client";

import React from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Videos from "../viewPage/videos";
import { useState } from "react";
import Imges1 from "../../public/imges/imges1.jpg";
import Imges2 from "../../public/imges/imges2.jpeg";
import Imges3 from "../../public/imges/imges3.jpg";
import Imges4 from "../../public/imges/imges4.png";
import Imges5 from "../../public/imges/imges5.jpg";
import Imges6 from "../../public/imges/imges6.jpg";
import Imges7 from "../../public/imges/imges7.png";
import Imges8 from "../../public/imges/imges8.jpg";
import Imges9 from "../../public/imges/imges9.jpg";

function Page() {
  const [typeLayout, setTypeLayout] = useState("nineLayout");
  const [selectZone, setSelectZone] = useState(1);
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1); // ค่าสถานะของโซนที่เลือก


  const zones = [
    {
      id: 1,
      name: "หน้าบ้าน",
      cameras: [
        { cameraName: "cam1", imges: Imges1 },
        { cameraName: "cam2", imges: Imges2 },
        { cameraName: "cam3", imges: Imges3 },
        { cameraName: "cam4", imges: Imges4 },
        { cameraName: "cam5", imges: Imges5 },
        { cameraName: "cam6", imges: Imges6 },
        { cameraName: "cam7", imges: Imges7 },
        { cameraName: "cam8", imges: Imges8 },
        { cameraName: "cam9", imges: Imges9 },
      ],
    },
    {
      id: 2,
      name: "โรงอาหาร",
      cameras: [
        { cameraName: "cam1", imges: Imges1 },
        { cameraName: "cam2", imges: Imges1 },
        { cameraName: "cam3", imges: Imges1 },
        { cameraName: "cam4", imges: Imges1 },
      
      ],
    },
    {
      id: 3,
      name: "โรงอาหาร",
      cameras: [
        { cameraName: "cam1", imges: Imges9 },
        { cameraName: "cam2", imges: Imges9 },
      
        
      ],
    },
  ];

  return (
    <>
      <Navber />
      <div className="bg-black">
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