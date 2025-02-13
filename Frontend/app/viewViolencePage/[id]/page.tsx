"use client";

import React from "react";
import Navber from "../../component/navber";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import CalendarVideoPage from "../../component/calenderVideoPage";
import Port from "../../port";
import { useParams } from "next/navigation";

interface violenceItem {
  id: number;
  video: any;
  name: string;
  camera: string;
  status: string;
  created: string;
  zone: string;
}


function page() {
  const [EditNameCard, SetEditNameCard] = useState(false);
  const toggleEditNameCard = () => SetEditNameCard(!EditNameCard);

  const { id } = useParams(); // ดึง id จาก URL
  const [violenceData, setViolenceData] = useState(null);

  useEffect(() => {
      const fetchViolenceData = async () => {
          try {
              const response = await fetch(`${Port.URL}/utils/violence/${id}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });

              if (!response.ok) {
                  throw new Error("Failed to fetch violence data");
              }

              const data = await response.json();
              setViolenceData(data);
          } catch (error) {
              console.error(error);
          }
      };

      if (id) {
          fetchViolenceData();
      }
  }, [id]);

  if (!violenceData) {
      return <div>Loading...</div>;
  }


  return (
    <>
      <Navber />
      <div className="bg-customBlue min-h-screen">
        <div className="flex flex-col pt-16 p-10 lg:flex-row">
          <div className="flex justify-center items-center w-full h-full p-2 rounded-md">
            <div className="flex justify-center items-center bg-white w-full h-full rounded-md">
              <div className="w-full h-full">
                <video className="h-full min-w-96 w-full rounded-md drop-shadow-2xl object-cover" controls autoPlay muted loop>
                  {/* <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" /> */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="p-2 ">
            <div className="flex flex-row w-full h-full gap-2 lg:flex-col">
              <div className="flex justify-center items-center rounded-md">
                <CalendarVideoPage />
              </div>
              <div className="flex flex-col w-full gap-2">
            
   
                    <div className="flex h-36 w-full gap-x-2">
                      <div className="flex-1 bg-customSlateBlue text-white rounded-md p-2">
                        <div className="flex flex-col h-full w-full">
                          <div className="flex justify-between items-start p-1 text-tiny">
                            <div>Zone</div>
                            <div>
                              <Icon icon="bx:map" width="20" height="20" />
                            </div>
                          </div>
                          <div className="flex justify-center items-center flex-1 pb-4">
                          {violenceData.zonename}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-y-2">
                        <div className="flex flex-col flex-1 p-2 bg-customSlateBlue rounded-md text-white">
                          <div className="flex justify-between text-tiny">
                            <div>Camera</div>
                            <div>
                              <Icon icon="mdi:cctv" width="18" height="18" />
                            </div>
                          </div>
                          <div className="flex justify-center">{violenceData.cameraname}</div> {/* แสดงค่า camera */}
                        </div>
                        <div className="flex flex-col flex-1 p-2 bg-customSlateBlue rounded-md text-white">
                          <div className="flex justify-between text-tiny">
                            <div>Time</div>
                            <div>
                              <Icon icon="mingcute:time-line" width="18" height="18" />
                            </div>
                          </div>
                          <div className="flex justify-center">{new Date(violenceData.created).toLocaleString()}</div> {/* แสดงค่า created */}
                        </div>
                      </div>
                    </div>
                
                <div className="bg-customSlateBlue text-white p-1 rounded-md">
                  <div className="px-1 text-tiny">Detail</div>
                  <div className="flex justify-center items-center pb-4">{violenceData.violence_type}</div>
    
                </div>
                <div>
          
        </div>
                <div className="flex justify-center bg-customSlateBlue text-white p-2 w-[70px] text-tiny rounded-md">
                  <Icon icon="material-symbols:download" width="24" height="24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
