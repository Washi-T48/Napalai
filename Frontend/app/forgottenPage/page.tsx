"use client";

import React from 'react'
import ForgottenCard from './forgottenCard';
import Navber from '../component/navber';
import ForgottenCalendar from './forgottenCalender';
import { useState, useEffect } from 'react';
import Port from "../port"
import PopupUndefineItem from './popupUndefineItem';

interface ForgottenItem {
    id: number;
    description: string;
    created: string;
    item_type: string;
    itemCount: number;
}
interface eventCard {
    id: number;
    created: string;
    camera_id: number;
    type: string;
    position:string;
}

function Page() {
    // const assignments = [
    //     { name: 'Macbook', dueDate: '2025-01-18', itemCount: '2'  },
    //     { name: 'BookMac', dueDate: '2025-01-19', itemCount: '1' },
    // ];
    const [eventCard, setEventCard] = useState<eventCard[]>([]);
    const [forgottenResponse, setForgottenResponse] = useState<ForgottenItem[]>([]);
    const [statePopup , setStatePopup] = useState(false);

    useEffect(() => {
        const getCamera = async () => {
            try {
                const forgottenResponse = await fetch(`${Port.URL}/forgotten`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const eventsResponse = await fetch(`${Port.URL}/events`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if (!forgottenResponse.ok) {
                    const errorData = await forgottenResponse.json();
                    throw new Error(errorData.message || "Network response was not ok");
                }
                if (!eventsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
                }

                const forgottenData = await forgottenResponse.json();
                console.log("API Response:", forgottenData);

                const eventData = await eventsResponse.json();
                console.log("API Response:", forgottenData);

                setForgottenResponse(forgottenData)
                setEventCard(eventData)
            } catch (error) {
                console.error("Error fetching data:", error);
                console.log(forgottenResponse);
            }
        }
        getCamera();
    }, []);
    console.log(eventCard)

    return (
        <>
            <Navber />
            <div className='bg-customBlue min-h-screen'>
                <div className='flex justify-center items-center flex-col pt-16 h-full text-white lg:flex-row'>
                    <div className='flex justify-center items-start flex-col p-4 gap-4 flex-1 w-full h-full text-white lg:flex-row lg:gap-10'>
                        <div className='w-full lg:max-w-7xl h-full text-black'>
                            <ForgottenCalendar assignments={forgottenResponse} />

                        </div>
                        <div className='flex justify-between flex-col h-full w-full lg:max-w-md pt-2 '>
                            <div className='flex justify-center flex-col pt-2 p-2 border-b'>
                                {/* Search */}
                                <div className="flex px-4 py-2 rounded-md border-2 bg-customwhite overflow-hidden w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                                        className="fill-black-600 mr-3 rotate-90">
                                        <path
                                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                        </path>
                                    </svg>
                                    <input type="email" placeholder="Search..." className="w-full outline-none bg-transparent text-gray-600 text-sm" />
                                </div>
                                <div className='pt-4 mt-3 h-80 overflow-auto'>

                                </div>
                            </div>
                            <div className='flex justify-start flex-col pt-4 p-2'>
                                <div className='p-2'>Today ITEM</div>
                                <div className='h-80 overflow-auto'>
                                    <ForgottenCard 
                                    setStatePopup={setStatePopup}
                                    eventCard={eventCard}
                                    // activeItemIndex={index} 
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            {statePopup && <PopupUndefineItem setStatePopup={setStatePopup}/> }
            
        </>


    )
}

export default Page