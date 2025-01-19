"use client";

import React from "react";
import Navber from "../component/navber";
import Sidebar from "./sidebar";
import Videos from "../viewPage/videos";
import { useState } from "react";

function page() {
  const [typeLayout, setTypeLayout] = useState("nineLayout");

  return (
    <>
      <Navber />
      <div className="bg-black">
        <div className="flex  w-full h-full">
          <Sidebar setTypeLayout={setTypeLayout} />
          <div className="flex justify-center items-center w-full h-screen pt-16">
            <div className=" bg-white h-full w-full">
              <Videos typeLayout={typeLayout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
