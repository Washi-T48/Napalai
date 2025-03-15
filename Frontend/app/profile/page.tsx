"use client";

import React from 'react'
import Image from 'next/image'
import profilepic from '../../public/imges/imges1.jpg'
import { Icon } from "@iconify/react";
import Navber from '../component/navber';
import { useState } from 'react';
import ChangePassBox from "./changePassBox";
import ChangeEmailBox from './changeEmailBox';
import ChangeUserBox from './changeUserBox';

function page() {
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangeUser, setOpenChangeUser] = useState(false);

    return (
        <>
            <Navber />
            <div className='flex justify-center  bg-customLinear w-full min-h-screen pt-16 '>
                <div className='flex flex-col justify-center items-center w-3/5 h-full text-white  '>
                    <div className='w-full p-5 gap-5'>
                        <p className='font-bold text-xl p-2 pb-8'>My Profile</p>
                        <div className='text-xl p-2 pb-8'></div>
                        <div className='flex justify-between bg-customSlateBlue shadow-2xl bg-opacity-70 rounded-md p-8 gap-5'>
                            <div className='flex flex-col justify-center items-center w-full  lg:flex gap-5'>
                                <div className=' rounded-xl'>
                                    <Image
                                        className='w-52 h-52 rounded-full object-cover'
                                        src={profilepic}
                                        alt='profile' />
                                </div>
                                <div className='flex justify-between w-full text-4xl front-bold gap-2'>
                                    <div className='flex flex-col pt-5'>
                                        <p>Folk</p>
                                        <p>Phacharaphon Aiamphan</p>
                                        <p className='text-lg'>Gmail:admin12435</p>
                                    </div>
                                    <div>
                                        <Icon
                                            onClick={() => setOpenChangeUser(true)}
                                            className=' cursor-pointer'
                                            icon="lucide:edit" width="24" height="24" />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <footer className='flex justify-center items-center w-full text-white p-5'>
                        <div className='flex justify-start w-full bg-customSlateBlue shadow-2xl bg-opacity-70 rounded-md '>
                            <div className='w-full'>
                                <div className='flex justify-between items-center w-full p-5 px-8 border-b border-gray-500'>
                                    <div>
                                        <p className='font-bold'>Change Email</p>
                                        <p className='text-xs'>Click hare feom chang Email Name.</p>
                                    </div>
                                    <button
                                        onClick={() => setOpenChangeEmail(true)}
                                        className='tracking-wider font-bold text-xs text-customRed px-4 p-1 h-8 bg-slate-600 bg-opacity-70 rounded-md duration-300 hover:bg-customRed hover:text-white'>Change Email</button>
                                </div>
                                <div className='flex justify-between items-center w-full p-5 px-8  border-gray-500'>
                                    <div>
                                        <p className='font-bold'>Change Password</p>
                                        <p className='text-xs'>Click hare feom chang Email Name.</p>
                                    </div>
                                    <button
                                        onClick={() => setOpenChangePassword(true)}
                                        className='tracking-wider font-bold text-xs text-customRed px-4 p-1 h-8 bg-slate-600 bg-opacity-70 rounded-md duration-300 hover:bg-customRed hover:text-white'>Change Email</button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            {openChangePassword && <ChangePassBox
                setOpenChangePassword={setOpenChangePassword}
            />}
            {openChangeEmail && <ChangeEmailBox
                setOpenChangeEmail={setOpenChangeEmail}
            />}
            {openChangeUser && <ChangeUserBox
                setOpenChangeUser={setOpenChangeUser}
            />}

        </>

    )
}

export default page