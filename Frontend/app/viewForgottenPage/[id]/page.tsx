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
import Time from "react-datepicker/dist/time";


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
    createdtime: string;
    
}


function Page() {
    const { id } = useParams();
    const [data, setData] = useState<ForgottenItem | null>(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupCreate, setOpenPopupCreate] = useState(false);
    const [selectedId, setSelectedId] = useState<string | undefined | string[]>(undefined);
    const [text, setText] = useState("");
    const [detail, setDetail] = useState("");
    const maxLength = 50;
    const isError = text.length === 0;
    const maxDetailLength = 200;
    const [image, setImage] = useState<string | null>(null);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Access the first file in the FileList
        if (file) {
            const image = URL.createObjectURL(file); // Generate a URL for the image
            setImage(image); // Set the image URL in state
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };
    const handleSubmit = () => {

        console.log("Text:", text);
        console.log("Detail:", detail);


        setOpenPopupCreate(false);
    };
    const [status, setStatus] = useState<string>("Unknown");

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status);
        }
    }, [data]);

    const toggleStatus = async () => {
        const newStatus = status === "returned" ? "unreturned" : "returned";
        setStatus(newStatus);
        try {
            await fetch(`${Port.URL}/forgotten/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    status: newStatus,
                }),
            });
        } catch (error) {
            console.error("Failed to update status:", error);
            setStatus(status);
        }
    };


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
    const highlightDates = [new Date(data.createdtime)];

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
                                    src={data.video || undefined}
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
                        <div className="flex flex-col items-start text-white ">
                            <button onClick={toggleStatus} className={`px-2 py-1 w-28 rounded ${status === "unreturned" ? "bg-red-500" : "bg-green-500"}`}>
                                {status}
                            </button>
                        </div>
                        <div className="flex justify-between p-2 bg-customSlateBlue rounded-md text-white">

                            <div className="flex justify-between">
                                <div className="px-2">{data.item_name || "Unknown Item"}</div>

                            </div>
                            <div>
                                <Icon
                                    onClick={() => { setOpenPopup(true), setSelectedId(id) }}
                                    icon="material-symbols:edit-outline"
                                    width="24"
                                    height="24"
                                />
                            </div>
                            {openPopup && <PopupEditNameViolenceCard
                                selectedId={selectedId}
                                setOpenPopup={setOpenPopup} />}
                        </div>
                        <div className="flex flex-col w-full h-full gap-2">
                            <div className="flex gap-2 w-full lg:flex-col">
                                <div className="flex justify-center items-center rounded-md">
                                    <CalendarVideoPage highlightDates={highlightDates} />
                                </div>
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
                                            <div className="flex justify-center">{new Date(data.createdtime).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col w-full gap-2">


                                {data.description ? (
                                    <>
                                        <div className="w-full">
                                            <Image
                                                className="rounded-md object-cover w-full h-full max-h-[330px]"
                                                src={unnyFace}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex w-full">
                                            <div className="p-3 w-full bg-customSlateBlue rounded-md text-white">
                                                <div className=" p-2 border-b">Phacharaphon Aiamphan</div>
                                                <div className="p-2">
                                                    És un fet establert de forma evident que un lector es distraurà amb el contingut llegible d'una pàgina quan miri a la seva composició. El fet de fer servir Lorem Ipsum és perquè conté una distribució més o menys normal de lletres, de forma oposada a quan es fa servir "Contingut aquí, contingut aquí", aconseguint així que sembli català llegible. Molts paquets d'autoedició fan servir Lorem Ipsum com el seu model de text, i una cerca pe
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}


                                <div className="flex justify-center w-full">
                                    <button
                                        onClick={() => setOpenPopupCreate(true)}
                                        className="p-2 px-4 bg-customฺButton text-white rounded-full cursor-pointer">Create</button>
                                </div>
                            </div>
                        </div>
                        {openPopupCreate && (
                            <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 text-white">
                                <div className="flex flex-col gap-2 bg-customBlue p-6 pb-14 shadow-2xl  rounded-md">
                                    <div className="flex justify-end ">
                                        <Icon
                                            onClick={() => setOpenPopupCreate(false)}
                                            icon="icon-park-solid:close-one"
                                            width="30"
                                            height="30"
                                        />
                                    </div>
                                    <h2 className="text-lg font-bold">Create New Item</h2>
                                    <p>Enter the details of the item you are returning.</p>

                                    <div className="flex justify-between gap-5">
                                        <div>
                                            <div className="w-full max-w-md">
                                                <label className="block text-sm font-medium text-white">
                                                    Name (Must be specified.) <span className="text-gray-400">?</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}
                                                    placeholder="Add a title that describes your video."
                                                    className={`w-80  px-3 py-2 mt-1 pb-8  border ${isError ? "border" : "border-gray-600"
                                                        } bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 ${isError ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500"
                                                        }`}
                                                    maxLength={maxLength}
                                                />
                                                <div className="flex justify-end text-sm mt-1">
                                                    <span>
                                                        {text.length}/{maxLength}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full max-w-md">
                                                <label className="block text-sm font-medium text-white">
                                                    Detail (Must be specified.) <span className="text-gray-400">?</span>
                                                </label>
                                                <input
                                                    type="detail"
                                                    value={detail}
                                                    onChange={(e) => setDetail(e.target.value)}
                                                    placeholder="Add details that describe your video."
                                                    className={`w-80  px-3 py-2 mt-1 pb-8  border ${isError ? "border" : "border-gray-600"
                                                        } bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 ${isError ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500"
                                                        }`}
                                                    maxLength={maxDetailLength}
                                                />
                                                <div className="flex justify-end text-sm mt-1">
                                                    <span>
                                                        {text.length}/{maxDetailLength}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                        <label className="relative flex flex-col items-center justify-center w-72 h-52 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer mt-4">
                                            {image ? (
                                                <>
                                                    <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                                                    <button
                                                        onClick={handleRemoveImage}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        X
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-gray-500">Click to upload</div>
                                            )}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    <div className="flex justify-end w-full mt-2">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!text || !detail}
                                            className={`px-4 py-2 rounded-md ${text && detail ? 'bg-customฺButton hover:bg-customฺButtomHover ' : 'bg-gray-600 cursor-not-allowed'} text-white`}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
