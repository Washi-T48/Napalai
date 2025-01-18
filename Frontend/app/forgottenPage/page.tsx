"use client";

import React from 'react'
import ForgottenCard from './forgottenCard';
import Navber from '../component/navber';
import ForgottenCalendar from './forgottenCalender';



function Page() {
    const assignments = [
        { name: 'Macbook', dueDate: '2025-01-18', itemCount: '2'  },
        { name: 'BookMac', dueDate: '2025-01-19', itemCount: '1' },
    ];

    return (
        <>
            <Navber />
            <div className='bg-customBlue h-screen'>
                <div className='flex justify-between pt-16 p-4 flex-1 h-full text-white'>
                    <div className='flex justify-start items-start pl-8 w-full h-full text-black'>
                        <ForgottenCalendar assignments={assignments} />
                    </div>
                    <div className='flex justify-between flex-col h-full p-2 pr-8'>
                        <div className='h-1/2 p-2 border-b'>
                            {/* Search */}
                            <div className="flex px-4 py-2 ml-4 mr-4 rounded-md border-2 bg-customwhite overflow-hidden max-w-md mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                                    className="fill-black-600 mr-3 rotate-90">
                                    <path
                                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                    </path>
                                </svg>
                                <input type="email" placeholder="Search..." className="w-full outline-none bg-transparent text-gray-600 text-sm" />
                            </div>
                            <div className='pt-2'>
                                {/* <ForgottenCard/> */}
                            </div>
                        </div>
                        <div className='flex justify-start flex-col pt-4 p-2 h-1/2'>
                            <div className='p-2 '>Today ITEM</div>
                            <div className='overflow-auto overflow-x-hidden'>
                                <ForgottenCard/>
                            </div>
                                
                            </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Page