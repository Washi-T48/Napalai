"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navber from "../../component/navber";
import CardVideo from "../../component/cardVideo";
import Dropdown from "../../component/dropdown";
import { useRouter } from 'next/navigation';
import Port from "@/app/port";
import Link from "next/link";

interface ForgottenItem {
    id: number;
    video: any;
    name: string;
    camera: string;
    status: string;
    created: string;
    zone: string;
    item_type:string;
}

function Page() {
    const [FilterButton, SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [getViolence, setGetViolence] = useState<ForgottenItem[]>([]);
    const [showData, setShowData] = useState<ForgottenItem[]>([]);
    const [switchPage, setSwitchPage] = useState(0);
    const itemsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        const getViolenceData = async () => {
            try {
                const getResponseViolence = await fetch(`${Port.URL}/forgotten`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!getResponseViolence.ok) {
                    throw new Error("Network response was not ok");
                }

                const getDataViolence = await getResponseViolence.json();
                setGetViolence(getDataViolence);
            } catch (error) {
                console.error("Error fetching cameras:", error);
            }
        };

        getViolenceData();
    }, []);

    useEffect(() => {
        const startIndex = switchPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setShowData(getViolence.slice(startIndex, endIndex));
    }, [switchPage, getViolence]);

    const filteredData = showData.filter((item) =>
        (!selectedZone || item.zone === selectedZone) &&
        (!selectedCamera || item.camera === selectedCamera) &&
        (!selectedStatus || item.status === selectedStatus)
    );

    const uniqueZones = [...new Set(getViolence.map((item) => item.zone))];
    const uniqueCameras = [...new Set(getViolence.map((item) => item.camera))];
    const uniqueStatuses = [...new Set(getViolence.map((item) => item.status))];

    return (
        <>
            <Navber />
            <div className="bg-customBlue min-h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-6">
                    Forgotten Violence
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
                                    <Dropdown
                                        onSelect={(type, value) => {
                                            if (type === "zone") setSelectedZone(value);
                                            if (type === "camera") setSelectedCamera(value);
                                            if (type === "status") setSelectedStatus(value);
                                        }}
                                        zone={uniqueZones}
                                        camera={uniqueCameras}
                                        status={uniqueStatuses}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid-rows-2 px-10 base:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <Link href={`/viewForgottenPage/${item.id}`} key={item.id}>
                                    <CardVideo item={item} />
                                </Link>
                                

                            ))
                        ) : (
                            <div>No items available</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
