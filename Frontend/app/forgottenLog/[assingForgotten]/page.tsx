"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navber from "../../component/navber";
import CardVideo from "../../component/cardVideo";
import Dropdown from "../../component/dropdown";
import Link from "next/link";
import { useParams } from 'next/navigation'

function Page() {
    const params = useParams<{ assingForgotten: string }>()
    console.log(params.assingForgotten)

    const [FilterButton, SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);

    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);



    type Item = {
        id: number;
        video: any;
        name: string;
        camera: string;
        status: string;
        dueDate: string;
        zone: string;
    };
    const items: Item[] = [
        {
            id: 1,
            video: "/video/test.mp4",
            name: 'Macbook',
            camera: 'camera1',
            status: 'Unreturned',
            dueDate: '2025-01-18',
            zone: 'Zone1',
        }
    ];

    const [switchPage, setSwitchPage] = useState(0);
    const [showData, setShowData] = useState<Item[]>([]);

    const itemsPerPage = 10;
    const totalPages: number = Math.ceil(items.length / 10);
    useEffect(() => {
        // คำนวณ startIndex และ endIndex
        const startIndex = switchPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // อัปเดตข้อมูลที่จะแสดง
        const dataToShow = items.slice(startIndex, endIndex);
        setShowData(dataToShow);
    }, [switchPage]);

    const filteredData = items.filter((item) => {
        return (
            (!selectedZone || item.zone === selectedZone) &&
            (!selectedCamera || item.camera === selectedCamera) &&
            (!selectedStatus || item.status === selectedStatus)
        );
    });

    // ดึงข้อมูล zone และ camera ที่ไม่ซ้ำจาก items
    const uniqueZones = [...new Set(items.map(item => item.zone))];
    const uniqueCameras = [...new Set(items.map(item => item.camera))];
    const uniqueStatuses = [...new Set(items.map(item => item.status))];

    return (
        <>
            <Navber />
            <div className="bg-customBlue min-h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-6">
                    Detection Violence
                </div>
                <div className="pt-5">
                    <div className="relative w-full flex justify-end pr-10 p-5">
                        <button
                            onClick={toggleFilterButton}
                            className="flex justify-center items-center p-2 w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white font-roboto"
                        >
                            Filter
                        </button>

                        {FilterButton && (
                            <div className="absolute top-16 z-10">
                                <div className="flex justify-center bg-customwhite w-full h-80 rounded-md overflow-hidden">

                                    <div className="">
                                        <Dropdown
                                            onSelect={(type, value) => {
                                                if (type === "zone") setSelectedZone(value);
                                                if (type === "camera") setSelectedCamera(value);
                                                if (type === "status") setSelectedStatus(value);
                                            }}
                                            zones={uniqueZones}
                                            cameras={uniqueCameras}
                                            statuses={uniqueStatuses}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid-rows-2 px-10 base:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((dueDate) => (
                                <Link href="/viewForgottenPage" key={dueDate.id}>
                                    <CardVideo item={dueDate} />
                                </Link>
                            ))
                        ) : (
                            <div>No items available</div>
                        )}
                    </div>

                    <div className="flex justify-end items-center mt-4 px-10">
                        <button
                            onClick={() => switchPage > 0 && setSwitchPage((prev) => prev - 1)}
                            className="flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm bg-customฺButton text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        >
                            <Icon icon="mingcute:left-fill" width="24" height="24" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSwitchPage(index)}
                                className={`flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${switchPage === index ? "bg-customฺButtomHover" : "bg-customฺButton"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => switchPage < totalPages - 1 && setSwitchPage((prev) => prev + 1)}
                            className="flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm bg-customฺButton text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        >
                            <Icon icon="mingcute:right-fill" width="24" height="24" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
