"use client";

import React, { useEffect, useState } from "react";
import Navber from "../component/navber";
import { Icon } from "@iconify/react";
import CardVideo from "../component/cardVideo";
import imgs1 from '../../public/imges/imges1.jpg';
import Dropdown from "../component/dropdown";
import Link from "next/link";
import { StaticImageData } from "next/image";



function Page() {
    const [FilterButton , SetFilterButton] = useState(false);
    const toggleFilterButton = () => SetFilterButton(!FilterButton);
    

    type Item = {
        id: any;
        img: StaticImageData;
        name: string;
        camera: string;
        status: string;
        timeAgo: string;
    };
    const items : Item[] = [
        {
            id: 1,
            img: imgs1,
            name: 'Macbook',
            camera: 'z.camera1',
            status: 'Unreturned',
            timeAgo: '3 days ago'
        },
        {
            id: 2,
            img: imgs1,
            name: 'Phone',
            camera: 'z.camera1',
            status: 'Returned',
            timeAgo: '3 days ago'
        },
        {
            id: 3,
            img: imgs1,
            name: 'Tablet',
            camera: 'z.camera2',
            status: 'Returned',
            timeAgo: '5 days ago'
        },
        {
            id: 4,
            img: imgs1,
            name: 'Laptop',
            camera: 'z.camera3',
            status: 'Returned',
            timeAgo: '1 week ago'
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
            <div className="bg-customBlue h-screen pt-20">
                <div className="flex justify-center items-center text-2xl font-bold text-white p-6">
                    Detection Violence
                </div>
                <div className="pt-16">
                    <div className="w-full flex justify-end pr-10 p-5">
                    <button 
            onClick={toggleFilterButton}
            className='flex justify-center items-center p-2 w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white font-roboto'>
                    Filter
            </button>

            {FilterButton && (
                <div className=' absolute top-72'>
                    <div className='flex justify-center bg-customwhite w-full h-full rounded-md overflow-hidden'>
                        <div className="h-64 bg-customwhite">
                            <Dropdown/>
                        </div>     
                    </div>
                </div>
            )}

                    </div>
                    <div className="pl-28 pr-28 grid grid-cols-5 grid-rows-2 gap-4">
                        {items?.length ? (  
                        showData.map((item) => (
                            <Link href="/viewViolencePage" key={item.id} >
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
