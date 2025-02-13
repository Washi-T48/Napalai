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
