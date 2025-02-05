"use client";

import React from "react";
import Navber from "../component/navber";
import VideoPlayer from "../component/videoPlayer";
import Calendar from "../component/calender";
import { Icon } from "@iconify/react";
import Image from "next/image";
import unnyFace from "../../public/imges/unnyFace.jpg";
import { useState } from "react";
import PopupEditNameViolenceCard from "./popupEditNameViolenceCard";
import CalendarVideoPage from "../component/calenderVideoPage";

function page() {
    const [EditNameCard, SetEditNameCard] = useState(false);
    const toggleEditNameCard = () => SetEditNameCard(!EditNameCard);

    return (
        <>
            <Navber />
            <div className=" bg-customBlue min-h-screen">
                <div className="flex flex-col pt-16 p-10 lg:flex-row">
                    <div className="flex justify-center items-center w-full h-full p-2  rounded-md">
                        <div className="flex justify-center items-center  bg-white w-full h-full rounded-md">
                            <div className="w-full h-full ">
                                <VideoPlayer />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-col h-full w-auto p-2 lg:w-80">
                        <div className="flex justify-between p-2 bg-customSlateBlue rounded-md text-white ">
                            
                            <div className="flex justify-between">
                                <div className="px-2">Macbook</div>
                                <div className="flex justify-center items-center px-2 p-0.5 bg-green-400 rounded-md text-tiny">
                                    Active
                                </div>
                            </div>
                            <div>
                                <Icon
                                    onClick={toggleEditNameCard}
                                    icon="material-symbols:edit-outline"
                                    width="24"
                                    height="24"
                                />
                            </div>
                            {EditNameCard && <PopupEditNameViolenceCard />}
                        </div>
                        <div className="flex flex-col w-full h-full gap-2 ">
                            <div className="flex gap-2 w-full lg:flex-col">
                                <div className="flex justify-center items-center rounded-md">
                                    <CalendarVideoPage />
                                </div>
                                <div className="w-full">
                                    <Image
                                        className="rounded-sm object-cover w-full h-full max-h-[330px]"
                                        src={unnyFace}
                                        alt=""
                                    />
                                </div>

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
                                                    <Icon
                                                        icon="mingcute:time-line"
                                                        width="18"
                                                        height="18"
                                                    />
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
                                    <Icon
                                        icon="material-symbols:download"
                                        width="24"
                                        height="24"
                                    />
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;
