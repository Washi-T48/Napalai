"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import Navber from '../component/navber';
import ChangePassBox from "./changePassBox";
import ChangeEmailBox from './changeEmailBox';
import ChangeUserBox from './changeUserBox';
import Port from '../port';
import NullProfile from '../../public/imges/user.png'

function Page() {
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangeUser, setOpenChangeUser] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${Port.URL}/auth/user`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data", response.status);
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Navber />
            <div className='flex justify-center bg-customLinear w-full min-h-screen pt-16'>
                <div className='flex flex-col justify-center items-center w-3/5 h-full text-white'>
                    <div className='w-full p-5 gap-5'>
                        <p className='font-bold text-xl p-2 pb-8'>My Profile</p>
                        <div className='flex justify-center bg-customSlateBlue shadow-2xl bg-opacity-70 rounded-md p-8 gap-5'>
                            <div className='flex flex-col justify-center items-center w-full lg:flex gap-5'>
                                <div className='flex justify-end w-full'>
                                    <Icon
                                        onClick={() => setOpenChangeUser(true)}
                                        className='cursor-pointer'
                                        icon="lucide:edit" width="24" height="24"
                                    />
                                </div>
                                <div className='rounded-xl'>
                                    {userData && userData.picture ? (
                                        <Image

                                            src={userData.picture}
                                            alt="Profile Picture"
                                            width={200}
                                            height={200}
                                            className="rounded-full object-cover w-full h-full cursor-pointer"
                                        />
                                    ) : (
                                        <Image
                                            className="rounded-full object-cover w-full h-full cursor-pointer"
                                            src={NullProfile}
                                            alt="Profile"
                                            width={200}
                                            height={200}
                                        />
                                    )}
                                </div>
                                <div className='flex justify-center w-full text-4xl font-bold gap-2'>
                                    <div className='flex flex-col justify-center items-center w-full pt-5'>
                                        <p className='text-center text-2xl'>{userData ? `${userData.fullname}` : 'Loading...'}</p>
                                        <p className='text-center text-lg'>Email: {userData ? userData.email : 'Loading...'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className='flex justify-center items-center w-full text-white p-5'>
                        <div className='flex justify-start w-full bg-customSlateBlue shadow-2xl bg-opacity-70 rounded-md'>
                            <div className='w-full'>
                                <div className='flex justify-between items-center w-full p-5 px-8 border-b border-gray-500'>
                                    <div>
                                        <p className='font-bold'>Change Email</p>
                                        <p className='text-xs'>Click here to change Email Name.</p>
                                    </div>
                                    <button
                                        onClick={() => setOpenChangeEmail(true)}
                                        className='tracking-wider font-bold text-xs text-customRed px-4 p-1 h-8 bg-slate-600 bg-opacity-70 rounded-md duration-300 hover:bg-customRed hover:text-white'>
                                        Change Email
                                    </button>
                                </div>
                                <div className='flex justify-between items-center w-full p-5 px-8 border-gray-500'>
                                    <div>
                                        <p className='font-bold'>Change Password</p>
                                        <p className='text-xs'>Click here to change your password.</p>
                                    </div>
                                    <button
                                        onClick={() => setOpenChangePassword(true)}
                                        className='tracking-wider font-bold text-xs text-customRed px-4 p-1 h-8 bg-slate-600 bg-opacity-70 rounded-md duration-300 hover:bg-customRed hover:text-white'>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            {openChangePassword && <ChangePassBox setOpenChangePassword={setOpenChangePassword} />}
            {openChangeEmail && <ChangeEmailBox setOpenChangeEmail={setOpenChangeEmail} />}
            {openChangeUser && <ChangeUserBox setOpenChangeUser={setOpenChangeUser} />}
        </>
    );
}

export default Page;
