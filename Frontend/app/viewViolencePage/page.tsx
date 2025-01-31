"use client";

import React from "react";
import Navber from "../component/navber";
import VideoPlayer from "../component/videoPlayer";
import Calendar from "../component/calender";
import { Icon } from "@iconify/react";
import CalendarVideoPage from "../component/calenderVideoPage";

function page() {
  return (
    <div className=" bg-customBlue min-h-screen ">
      <Navber />
      <div>
        <div className="flex justify-between p-10 h-screen w-full pt-16">
          <div className="flex justify-center items-center w-full h-full p-2 rounded-md">
            <div className="flex justify-center items-center bg-white w-full h-full rounded-md">
              <div className="w-full h-full">
                <VideoPlayer />
              </div>
            </div>
          </div>
        
          <div className="flex gap-2 flex-col h-full w-96 p-2">
            <div className="flex justify-center items-center bg-customSlateBlue text-white p-2 h-[320px] w-full rounded-xl">
              <CalendarVideoPage />
            </div>

            <div className="flex h-36 w-full gap-x-2">
              <div className="flex-1 bg-customSlateBlue text-white rounded-md p-2">
                <div className="flex flex-col h-full w-40">
                  <div className="flex justify-between items-start p-1 text-tiny">
                    <div>Zone</div>
                    <div>
                      <Icon icon="bx:map" width="20" height="20" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-1 pb-4">
                    cam2
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-y-2">
                <div className="flex flex-col flex-1 p-2  bg-customSlateBlue rounded-md text-white">
                  <div className="flex justify-between text-tiny">
                    <div>Camera</div>
                    <div>
                      <Icon icon="mdi:cctv" width="18" height="18" />
                    </div>
                  </div>
                  <div className="flex justify-center">Home1</div>
                </div>

                <div className="flex flex-col flex-1 p-2 bg-customSlateBlue rounded-md text-white">
                  <div className="flex justify-between text-tiny">
                    <div>Time</div>
                    <div>
                      <Icon icon="mingcute:time-line" width="18" height="18" />
                    </div>
                  </div>
                  <div className="flex justify-center">10:34 PM</div>
                </div>
              </div>
            </div>
            <div className="bg-customSlateBlue text-white p-1 rounded-md">
              <div className="px-1 text-tiny">Detail</div>
              <div className="flex justify-center items-center pb-4">
                Macbook
              </div>
            </div>
            <div className="flex justify-center bg-customSlateBlue text-white p-2 w-[70px] text-tiny rounded-md">
              <Icon icon="material-symbols:download" width="24" height="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
