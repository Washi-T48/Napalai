"use client";
import React, { useState, useEffect } from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Videos from "../viewPage/videos";
import Port from "../port";

function Page() {
  const [typeLayout, setTypeLayout] = useState("nineLayout");
  const [selectedZoneId, setSelectedZoneId] = useState<number>(1);
  const [responseZone, setResponseZone] = useState<any>(null);
  // const [responseCameras, setResponseCameras] = useState<any>(null);

  // useEffect(() => {
  //   const getCameras = async () => {
  //     try {
  //       const response = await fetch(`${Port.URL}/cameras`, {
  //         method: 'GET',
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       });
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || "Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setResponseCameras(data);
  //     } catch (error) {
  //       console.error("Error fetching cameras:", error);
  //     }
  //   };

  //   const getZones = async () => {
  //     try {
  //       const responseZone = await fetch(`${Port.URL}/zones`, {
  //         method: 'GET',
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       });
  //       if (!responseZone.ok) {
  //         const errorData = await responseZone.json();
  //         throw new Error(errorData.message || "Network response was not ok");
  //       }
  //       const dataZone = await responseZone.json();
  //       setResponseZone(dataZone);
  //     } catch (error) {
  //       console.error("Error fetching zones:", error);
  //     }
  //   };

  //   getCameras();
  //   getZones();
  // }, []);

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
                selectedZoneId={selectedZoneId}
                responseZone={responseZone}
                // responseCameras={responseCameras}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
