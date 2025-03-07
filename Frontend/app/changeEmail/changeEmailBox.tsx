"use client";
import React, { useState } from 'react';

function ChangeEmailBox() {
    const [stateForgetPassword, setStateForgetPassword] = useState(false);
    const [email, setEmail] = useState(''); // ใช้เก็บอีเมลใหม่
    const [loading, setLoading] = useState(false); // ใช้แสดงปุ่มโหลด

    const handleChangeEmail = async () => {
        if (!email) return alert('Please enter a new email.');

        setLoading(true); // เริ่มโหลด
        try {
            const res = await fetch('/api/changeEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // ให้ cookie ส่งไปด้วย
                body: JSON.stringify({ email }), // ส่งอีเมลใหม่ไปที่ API
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            alert('Email updated successfully!');
        } catch (error) {
            alert(error.message);
        }
        setLoading(false); // หยุดโหลด
    };

    return (
        <div className="z-10">
            <div className="flex justify-center flex-col items-center border border-customฺBorder p-12 rounded-2xl m-auto">
                {!stateForgetPassword ? (
                    <>
                        <div className="text-white p-2">
                            <h1 className="text-lg font-medium">Change Email</h1>

                            <div className="space-y-1 pt-3">
                                <label htmlFor="email" className="text-xs">New Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>

                            <div className='flex justify-end gap-2 pt-6'>
                                <button
                                    onClick={handleChangeEmail}
                                    disabled={!email || loading} // ป้องกันกดซ้ำตอนโหลด
                                    className="h-8 p-1 px-4 rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-white gap-10 h-auto">
                            <h1 className="text-lg font-medium">Change Password</h1>
                            <p>(ยังไม่เปลี่ยนส่วนนี้)</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChangeEmailBox;
