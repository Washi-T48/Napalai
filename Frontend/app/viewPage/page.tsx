"use client";

import React, { useState, useEffect } from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Videos from "../viewPage/videos";

function Page() {
  const [typeLayout, setTypeLayout] = useState("nineLayout");
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1); 
  const [responseZone, setResponseZone] = useState<any>(null); 
  const [responseCameras, setResponseCameras] = useState<any>(null);
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
        
        setResponseCameras(data); 
        setResponseZone(dataZone); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getCamera();
  }, []); 

  return (
    <>
      <Navber />
      <div className="min-h-screen bg-customBlue">
        <div className="flex w-full h-full">
          <Sidebar
            setTypeLayout={setTypeLayout}
            setSelectZone={setSelectedZoneId}
          />
          <div className="flex justify-center items-center w-full h-screen pt-16">
            <div className="bg-white h-full w-full">
              <Videos
                typeLayout={typeLayout}
                responseZone={responseZone} 
                responseCameras={responseCameras}
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
