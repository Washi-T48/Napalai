"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navber from "../../component/navber";
import { Icon } from "@iconify/react";
import Image from "next/image";
import unnyFace from "../../../public/imges/unnyFace.jpg";
import PopupEditNameViolenceCard from "./popupEditNameViolenceCard";
import CalendarVideoPage from "../../component/calenderVideoPage";
import Port from "@/app/port";

interface ForgottenItem {
    id: string;
    created: string; // *
    event_id: string;
    description: string | null; //*
    item_type: string;
    status: string; // *
    item_name: string | null;
    camera_id: string;
    type: string;
    position: number[];
    first_detected: string;
    last_seen: string | null;
    warning_triggered: string;
    image: string | null;
    video: string | null;
    zone_id: string;
    name: string;
    location: string;
    rtsp_url: string | null; // *
    cameraname: string; // *
    zonename: string; // *
}


function Page() {
    const { id } = useParams(); 
    const [data, setData] = useState<ForgottenItem | null>(null);
    const [EditNameCard, SetEditNameCard] = useState(false);

    const toggleEditNameCard = () => SetEditNameCard(!EditNameCard);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Port.URL}/utils/forgotten/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!data) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-white">Loading...</p>
            </div>
        );
    }
    console.log(data)
    const highlightDates = [new Date(data.created)];

    return (
        <>
            <Navber />
            <div className="bg-customBlue min-h-screen">
                <div className="flex flex-col pt-16 p-10 lg:flex-row">
                    <div className="flex justify-center items-center w-full h-full p-2 rounded-md">
                        <div className="flex justify-center items-center bg-white w-full h-full rounded-md">
                            <div className="w-full h-full">
                                <video
                                    className="h-full min-w-96 w-full rounded-md drop-shadow-2xl object-cover"
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                >
                                    <source
                                        src={data.rtsp_url || "https://docs.material-tailwind.com/demo.mp4"}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-col h-full w-auto p-2 lg:w-80">
                        <div className="flex justify-between p-2 bg-customSlateBlue rounded-md text-white">
                            <div className="flex justify-between">
                                <div className="px-2">{data.item_type || "Unknown Item"}</div>
                                <div className="flex justify-center items-center px-2 p-0.5 bg-green-400 rounded-md text-tiny">
                                    {data.status || "Unknown"}
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
                        <div className="flex flex-col w-full h-full gap-2">
                            <div className="flex gap-2 w-full lg:flex-col">
                                <div className="flex justify-center items-center rounded-md">
                                <CalendarVideoPage highlightDates={highlightDates} />
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
                                                {data.zonename || "Unknown"}
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
                                            <div className="flex justify-center">{data.cameraname || "Unknown"}</div>
                                        </div>

                                        <div className="flex flex-col flex-1 p-2 bg-customSlateBlue rounded-md text-white">
                                            <div className="flex justify-between text-tiny">
                                                <div>Time</div>
                                                <div>
                                                    <Icon icon="mingcute:time-line" width="18" height="18" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center">{new Date(data.created).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-customSlateBlue text-white p-1 rounded-md">
                                    <div className="px-1 text-tiny">Detail</div>
                                    <div className="flex justify-center items-center pb-4">
                                        {data.description || "No details available"}
                                    </div>
                                </div>
                                <div className="flex justify-center bg-customSlateBlue text-white p-2 w-[70px] text-tiny rounded-md">
                                    <Icon icon="material-symbols:download" width="24" height="24" />
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

export default Page;
