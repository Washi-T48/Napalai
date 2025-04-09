"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navber from "../component/navber";
import CardViolenceVideo from "../component/cardViolenceVideo";
import DropdownViolence from "./dropdownViolence";
import Port from "@/app/port";
import Link from "next/link";
import MyCalendar from "../component/calender";
import { Icon } from "@iconify/react";

interface ViolenceItem {
    id: number;
    violenceid: number;
    video: string;
    name: string;
    camera: string | null;
    status: string;
    created: string;
    createdtime: string;
    zone: string | null;
    description: string | null;
    cameraname: string;
    zonename: string;
    violence_type: string;
    image: string;
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
    const [FilterButton, SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [getViolence, setGetViolence] = useState<ViolenceItem[]>([]);
    const [getCameras, setGetCameras] = useState<Camera[]>([]);
    const [getZones, setGetZones] = useState<Zone[]>([]);
    const [switchPage, setSwitchPage] = useState(0);
    const itemsPerPage = 10;

useEffect(() => {
    const getUnifiedForgottenData = async () => {
        try {
            const response = await fetch(`${Port.URL}/utils/violence`);
            if (!response.ok) throw new Error("Failed to fetch forgotten items");
            const data: ViolenceItem[] = await response.json();

            const updatedData = data.map((item) => ({
                    ...item,
                    zone: item.zonename || "Unknown Zone",
                    camera: item.cameraname || "Unknown Camera",
                }))
                .sort((a, b) => new Date(b.createdtime).getTime() - new Date(a.createdtime).getTime()); // 🔥 sort ตรงนี้

            setGetViolence(updatedData);
        } catch (error) {
            console.error("Error fetching unified forgotten items:", error);
        }
    };
    getUnifiedForgottenData();
}, []);


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
        return getCameras.map(camera => {
            const matchedZone = getZones.find(zone => zone.id === camera.zone_id);
            return {
                ...camera,
                zone: matchedZone ? matchedZone.name : "Unknown Zone"
            };
        });
    };



    const camerasWithZones = mapCamerasToZones();

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);


    const handleDateSelect = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const filteredData = getViolence.filter((item) => {
        const itemDate = new Date(item.created).toISOString().split("T")[0];
        return (
            (!selectedZone || item.zone === selectedZone) &&
            (!selectedCamera || item.camera === selectedCamera) &&
            (!selectedStatus || item.status === selectedStatus) &&
            (!startDate || !endDate || (itemDate >= startDate && itemDate <= endDate))
        );
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(switchPage * itemsPerPage, (switchPage + 1) * itemsPerPage);

    const handleClearFilters = () => {
        setSelectedZone(null);
        setSelectedCamera(null);
        setSelectedStatus(null);
        setStartDate(null);
        setEndDate(null);
    };




    return (
        <>
            <Navber />
            <div className="bg-customLinear min-h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-14 mt-2 ">
                    Violence
                </div>

                <div className="pt-5">
                    <div className="flex justify-between">
                        <div className="flex justify-start gap-2 p-4">
                            <button onClick={() => setSwitchPage((prev) => Math.max(prev - 1, 0))} className="flex justify-center  items-center w-10 h-10 text-xs bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover">
                                <Icon icon="ooui:previous-ltr" width="15" height="15" />
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSwitchPage(index)}
                                    className={`p-2 rounded ${switchPage === index ? "w-10 h-10 text-xs bg-customฺButtomHover text-white shadow-xl rounded-sm " : "w-10 h-10 text-xs bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover"}`}>
                                    {index + 1}
                                </button>
                            ))}
                            <button onClick={() => setSwitchPage((prev) => Math.min(prev + 1, totalPages - 1))} className="flex justify-center items-center text-xs w-10 h-10 bg-customฺButton text-white shadow-xl rounded-sm hover:bg-customฺButtomHover">
                                <Icon icon="ooui:previous-rtl" width="15" height="15" />
                            </button>
                        </div>
                        <div className="relative w-full flex justify-end p-4">
                            <button onClick={() => SetFilterButton(!FilterButton)} className="p-2 w-20 text-xs lg:w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white">
                                Filter
                            </button>
                            {FilterButton && (
                                <div className="absolute top-16 z-10 bg-white rounded-md shadow-lg p-4">
                                    <div className="flex">
                                        <MyCalendar
                                            handleClearFilters={handleClearFilters}
                                            onDateSelect={handleDateSelect} />
                                        <DropdownViolence
                                            onSelect={(type, value) => {
                                                if (type === "zone") setSelectedZone(value);
                                                if (type === "camera") setSelectedCamera(value);
                                            }}
                                            zone={getZones.map(z => z.name)}
                                            camera={getCameras.map(c => c.name)}
                                            status={["returned", "unreturned"]}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>




                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl2:grid-cols-5 gap-4 px-10">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <Link href={`/viewViolencePage/${item.violenceid}`} key={`${item.violenceid}-${index}`}>
                                    <CardViolenceVideo item={item} />
                                </Link>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Page;
