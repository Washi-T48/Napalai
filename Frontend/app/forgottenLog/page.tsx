"use client";

import React, { useEffect, useState } from "react";
import Navber from "../component/navber";
import { Icon } from "@iconify/react";
import CardVideo from "../component/cardVideo";
import imgs1 from '../../public/imges/imges1.jpg';
import Dropdown from "../component/dropdown";
import Link from "next/link";


import MyCalendar from "../component/calender";



function Page() {
    const [FilterButton, SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);


    type Item = {
        id: number;
        video: any;
        name: string;
        camera: string;
        status: string;
        timeAgo: string;
    };
    const items: Item[] = [
        {
            id: 1,
            video: "/video/test.mp4",
            name: 'Macbook',
            camera: 'z.camera1',
            status: 'Unreturned',
            timeAgo: '3 days ago'
        },
        {
            id: 2,
            video: "/video/test2.mp4",
            name: 'iPhone 13',
            camera: 'z.camera2',
            status: 'Returned',
            timeAgo: '5 hours ago'
        },
        {
            id: 3,
            video: "/video/test.mp4",
            name: 'iPad Pro',
            camera: 'z.camera3',
            status: 'Unreturned',
            timeAgo: '1 day ago'
        },
        {
            id: 4,
            video: "/video/test.mp4",
            name: 'Apple Watch',
            camera: 'z.camera4',
            status: 'Unreturned',
            timeAgo: '2 days ago'
        },
        {
            id: 5,
            video: "/video/test.mp4",
            name: 'MacBook Pro',
            camera: 'z.camera5',
            status: 'Returned',
            timeAgo: '6 hours ago'
        },
        {
            id: 6,
            video: "/video/test.mp4",
            name: 'AirPods',
            camera: 'z.camera6',
            status: 'Unreturned',
            timeAgo: '7 days ago'
        },
        {
            id: 7,
            video: "/video/test.mp4",
            name: 'iPhone 12',
            camera: 'z.camera7',
            status: 'Returned',
            timeAgo: '10 hours ago'
        },
        {
            id: 8,
            video: "/video/test.mp4",
            name: 'iPad Air',
            camera: 'z.camera8',
            status: 'Unreturned',
            timeAgo: '4 days ago'
        },
        {
            id: 9,
            video: "/video/test.mp4",
            name: 'Apple TV',
            camera: 'z.camera9',
            status: 'Unreturned',
            timeAgo: '2 weeks ago'
        },
        {
            id: 10,
            video: "/video/test.mp4",
            name: 'iMac',
            camera: 'z.camera10',
            status: 'Returned',
            timeAgo: '1 hour ago'
        },
        {
            id: 11,
            video: "/video/test.mp4",
            name: 'Mac Mini',
            camera: 'z.camera11',
            status: 'Unreturned',
            timeAgo: '5 days ago'
        },
        {
            id: 12,
            video: "/video/test.mp4",
            name: 'Beats Headphones',
            camera: 'z.camera12',
            status: 'Returned',
            timeAgo: '30 minutes ago'
        }
    ];
    
    const [switchPage, setSwitchPage] = useState(0);
    const [showData, setShowData] = useState<Item[]>([]);
    const itemsPerPage = 10;

    useEffect(() => {
        // คำนวณ startIndex และ endIndex
        const startIndex = switchPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // อัปเดตข้อมูลที่จะแสดง
        const dataToShow = items.slice(startIndex, endIndex);
        setShowData(dataToShow);

        console.log(`Fetching data for page: ${switchPage}`, dataToShow);
    }, [switchPage]);



    return (


        <>
            <Navber />
            <div className="bg-customBlue min-h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-6">
                    Detection Violence
                </div>
                <div className="pt-5">
                    <div className=" relative w-full flex justify-end pr-10 p-5">
                        <button
                            onClick={toggleFilterButton}
                            className='flex justify-center items-center p-2 w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white font-roboto'>
                            Filter
                        </button>

                        {FilterButton && (
                            <div className="absolute top-16 z-10">
                                <div className='flex justify-center bg-white w-full h-full rounded-md overflow-hidden'>
                                    <div className=''>
                                        <Dropdown />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className=" grid-rows-2 px-10 base:px-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {items?.length ? (
                            showData.map((item) => (
                                <Link href="/viewForgottenPage" key={item.id} >
                                    <div>
                                        <CardVideo item={item} />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>No items available</div>
                        )}
                    </div>
                    <div className="flex justify-end items-center mt-4 px-10">
                        <button
                            onClick={() => switchPage > 0 ? setSwitchPage((prev) => prev - 1) : null}
                            className="flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm bg-customฺButton text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        >
                            <Icon icon="mingcute:left-fill" width="24" height="24" />
                        </button>
                        <button
                            className={`flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${switchPage == 0 ? ' bg-customฺButtomHover' : ' bg-customฺButton'}`}
                        >
                            {switchPage < 1 ? '1' : switchPage}
                        </button>
                        <button
                            className={`flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${switchPage != 0 && switchPage != Math.ceil(items.length / 10) - 1 ? ' bg-customฺButtomHover' : ' bg-customฺButton'}`}
                        >
                            {switchPage < 2 ? '2' : switchPage + 1}
                        </button>
                        <button
                            className={`flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${switchPage == Math.ceil(items.length / 10) - 1 ? ' bg-customฺButtomHover' : ' bg-customฺButton'}`}
                        >
                            {switchPage < 2 ? '3' : switchPage + 2}

                        </button>
                        <button
                            onClick={() =>
                                switchPage < Math.ceil(items.length / 10) - 1
                                    ? setSwitchPage((prev) => prev + 1)
                                    : null
                            }
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

