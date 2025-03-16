"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navber from "../../component/navber";
import CardVideo from "../../component/cardVideo";
import Dropdown from "../../component/dropdown";
import Port from "@/app/port";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface UnifiedForgottenItem {
    id: number;
    forgottenid: number;
    video: string;
    name: string;
    camera: string | null;
    status: string;
    created: string;
    createdtime: string;
    zone: string | null;
    item_type: string;
    item_name: string;
    description: string | null;
    cameraname: string;
    zonename: string;
    image:string;
}

interface Camera {
    id: string;
    created: string;
    zone_id: string | null;
    name: string;
    location: string;
}

interface Zone {
    id: string;
    created: string;
    name: string;
    location: string;
}

function Page() {
    const params = useParams();
    const dateParam = Array.isArray(params.assingForgotten) ? params.assingForgotten[0] : params.assingForgotten;


    const convertToBangkokTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
    };

    const formattedDate = dateParam ? convertToBangkokTime(dateParam) : null;

    const [FilterButton, SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [getViolence, setGetViolence] = useState<UnifiedForgottenItem[]>([]);
    const [getCameras, setGetCameras] = useState<Camera[]>([]);
    const [getZones, setGetZones] = useState<Zone[]>([]);
    const [switchPage, setSwitchPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        if (!formattedDate) return;

        const getUnifiedForgottenData = async () => {
            try {
                const response = await fetch(`${Port.URL}/utils/forgotten`);
                if (!response.ok) throw new Error("Failed to fetch forgotten items");

                const data: UnifiedForgottenItem[] = await response.json();

                const updatedData = data.map((item) => ({
                    ...item,
                    zone: item.zonename || "Unknown Zone",
                    camera: item.cameraname || "Unknown Camera",
                }));

                setGetViolence(updatedData);
            } catch (error) {
                console.error("Error fetching unified forgotten items:", error);
            }
        };

        getUnifiedForgottenData();
    }, [formattedDate]);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const response = await fetch(`${Port.URL}/cameras`);
                if (!response.ok) throw new Error("Failed to fetch cameras");

                const camerasData: Camera[] = await response.json();
                setGetCameras(camerasData);
            } catch (error) {
                console.error("Error fetching cameras:", error);
            }
        };

        const fetchZones = async () => {
            try {
                const response = await fetch(`${Port.URL}/zones`);
                if (!response.ok) throw new Error("Failed to fetch zones");

                const zonesData: Zone[] = await response.json();
                setGetZones(zonesData);
            } catch (error) {
                console.error("Error fetching zones:", error);
            }
        };

        fetchCameras();
        fetchZones();
    }, []);

    const mapCamerasToZones = () => {
        return getCameras.map((camera) => {
            const matchedZone = getZones.find((zone) => zone.id === camera.zone_id);
            return {
                ...camera,
                zone: matchedZone ? matchedZone.name : "Unknown Zone",
            };
        });
    };

    const camerasWithZones = mapCamerasToZones();

    const filteredData = getViolence.filter((item) => {
        const itemDate = convertToBangkokTime(item.createdtime);
        return (
            (!selectedZone || item.zone === selectedZone) &&
            (!selectedCamera || item.camera === selectedCamera) &&
            (!selectedStatus || item.status === selectedStatus) &&
            (!formattedDate || itemDate === formattedDate)
        );
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(switchPage * itemsPerPage, (switchPage + 1) * itemsPerPage);

    const uniqueZones = [...new Set(camerasWithZones.map((item) => item.zone))];
    const uniqueCameras = [...new Set(camerasWithZones.map((item) => item.name))];
    const uniqueStatuses = ["returned", "unreturned"];

    const handleClearFilters = () => {
        setSelectedZone(null);
        setSelectedCamera(null);
        setSelectedStatus(null);
    };
    

    return (
        <>
            <Navber />
            <div className="bg-customLinear min-h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-14 mt-2">
                    Forgotten
                </div>

                <div className="pt-5">
                    <div className="flex justify-between">
                        
                    <div className="flex justify-start gap-2 p-4 pl-10">
                        <button onClick={() => setSwitchPage((prev) => Math.max(prev - 1, 0))} className="flex justify-center items-center w-10 h-10 bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover">
                            <Icon icon="ooui:previous-ltr" width="15" height="15" />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setSwitchPage(index)}
                                className={`p-2 rounded ${switchPage === index ? "w-10 h-10 bg-customฺButtomHover text-white shadow-xl rounded-sm " : "w-10 h-10 bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover"}`}>
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => setSwitchPage((prev) => Math.min(prev + 1, totalPages - 1))} className="flex justify-center items-center w-10 h-10 bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover">
                            <Icon icon="ooui:previous-rtl" width="15" height="15" />
                        </button>
                    </div>
                    <div className="relative w-full flex justify-end pr-10 p-5">
                        <button
                            onClick={toggleFilterButton}
                            className="flex justify-center items-center p-2 w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white font-roboto"
                        >
                            Filter
                        </button>
                        {FilterButton && (
                            <div className="absolute top-16 z-10  bg-white p-4 rounded-md shadow-lg">
                                <div className="flex flex-col space-y-2 h-72 overflow-y-auto">
                                    <Dropdown
                                        onSelect={(type, value) => {
                                            if (type === "zone") setSelectedZone(value);
                                            if (type === "camera") setSelectedCamera(value);
                                            if (type === "status") setSelectedStatus(value);
                                        }}
                                        zone={uniqueZones }
                                        camera={uniqueCameras}
                                        status={uniqueStatuses}
                                        
                                    />
                                </div>
                                <div className="flex justify-end">
                                <button onClick={handleClearFilters} className="px-6 py-2 text-white rounded-full bg-customฺButton ">
                                    Clear
                                </button>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                    


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <Link
                                    href={`/viewForgottenPage/${item.forgottenid}`}
                                    key={`${item.forgottenid}-${index}`}
                                >
                                    <CardVideo
                                        item={item}
                                        className={`${item.status === "unreturned" ? "bg-red-500" : ""}`}
                                    />

                                </Link>
                            ))
                        ) : (
                            <div className="gird grid-cols-1 grid-rows-1 w-full h-full text-center text-white">No items available</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
