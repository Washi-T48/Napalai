"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navber from "../../component/navber";
import CardVideo from "../../component/cardVideo";
import Dropdown from "../../component/dropdown";
import Port from "@/app/port";
import Link from "next/link";

interface UnifiedForgottenItem {
    id: number;
    forgottenid: number;
    video: string;
    name: string ;
    camera: string | null;
    status: string;
    created: string;
    createdtime: string;
    zone: string | null;
    item_type: string;
    description: string | null;
    cameraname: string; 
    zonename: string; 
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
    const date = params.assingForgotten;

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
        if (!date) return;

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
    }, [date]);

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

    const filteredData = getViolence.filter((item) =>
        (!selectedZone || item.zone === selectedZone) &&
        (!selectedCamera || item.camera === selectedCamera) &&
        (!selectedStatus || item.status === selectedStatus) &&
        (!date || item.createdtime.split("T")[0] === date)
    );

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
                            <div className="absolute top-16 z-10  bg-white p-4 rounded-md shadow-lg">
                                <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto">
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
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-2 text-sm text-white bg-red-500 p-2 rounded"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="text-white p-4">
                        {selectedZone && <p>Filtered by Zone: {selectedZone}</p>}
                        {selectedCamera && <p>Filtered by Camera: {selectedCamera}</p>}
                        {selectedStatus && <p>Filtered by Status: {selectedStatus}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <Link href={`/viewForgottenPage/${item.forgottenid}`} key={`${item.forgottenid}-${index}`}>
                                    <CardVideo item={item} />
                                </Link>
                            ))
                        ) : (
                            <div>No items available</div>
                        )}
                    </div>


                    <div className="flex justify-center mt-5">
                        <button
                            disabled={switchPage === 0}
                            onClick={() => setSwitchPage(switchPage - 1)}
                            className="mx-2 p-2 bg-gray-500 text-white rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            disabled={switchPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}
                            onClick={() => setSwitchPage(switchPage + 1)}
                            className="mx-2 p-2 bg-gray-500 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
