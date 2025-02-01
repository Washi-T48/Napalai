"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navber from "../component/navber";
import CardVideo from "../component/cardVideo";
import MyCalendar from "../component/calender";
import Dropdown from "../component/dropdown";
import Link from "next/link";

function Page() {
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
        timeAgo: string;
        zone: string;
    };
    const items: Item[] = [
        {
            id: 1,
            video: "/video/test.mp4",
            name: 'Macbook',
            camera: 'camera1',
            status: 'Unreturned',
            timeAgo: '3 days ago',
            zone: 'Zone1',
        },
        {
            id: 2,
            video: "/video/test2.mp4",
            name: 'iPhone 13',
            camera: 'camera2',
            status: 'Returned',
            timeAgo: '5 hours ago',
            zone: 'Zone1',
        },
        {
            id: 3,
            video: "/video/test.mp4",
            name: 'iPad Pro',
            camera: 'camera3',
            status: 'Unreturned',
            timeAgo: '1 day ago',
            zone: 'Zone2',
        },
        {
            id: 4,
            video: "/video/test.mp4",
            name: 'Apple Watch',
            camera: 'camera4',
            status: 'Unreturned',
            timeAgo: '2 days ago',
            zone: 'Zone3',
        },
        {
            id: 5,
            video: "/video/test.mp4",
            name: 'MacBook Pro',
            camera: 'camera5',
            status: 'Returned',
            timeAgo: '6 hours ago',
            zone: 'Zone9',
        },
        {
            id: 6,
            video: "/video/test3.mp4",
            name: 'Samsung Galaxy',
            camera: 'camera6',
            status: 'Returned',
            timeAgo: '1 hour ago',
            zone: 'Zone3',
        },
        {
            id: 7,
            video: "/video/test.mp4",
            name: 'Surface Pro',
            camera: 'camera7',
            status: 'Unreturned',
            timeAgo: '4 hours ago',
            zone: 'Zone4',
        },
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

    // กรองข้อมูลตามการเลือกใน Dropdown
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
                                <div className="flex justify-center bg-customwhite w-full h-full rounded-md overflow-hidden">
                                    <div className="">
                                        <MyCalendar />
                                    </div>
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
                            filteredData.map((item) => (
                                <Link href="/viewViolencePage" key={item.id}>
                                    <CardVideo item={item} />
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
