"use client";
import { count } from 'console';
import React, { useState } from 'react';
interface Props {
    setOpenChangeEmail: (open: boolean) => void;
  }
const ChangeEmailBox:React.FC<Props> = ({setOpenChangeEmail}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeEmail = async () => {
        if (!email) return alert('Please enter a new email.');

        setLoading(true);
        try {
            const res = await fetch('https://cloud.phraya.net:443/authchangeEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            alert('Email updated successfully!');
            setOpenChangeEmail(false);
        } catch (error: any) {
            alert(error.message);
        }
        setLoading(false);
    };

    return (
        <div>
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <div className="bg-customBlue p-8 rounded-2xl w-96 text-white">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-medium">Change Email</h1>
                        </div>

                        <div className="space-y-3 pt-6">
                            <label htmlFor="email" className="text-xs">New Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                            />

                            <div className="flex justify-end gap-2 pt-6">
                                <button
                                onClick={() => setOpenChangeEmail(false)}
                                className='flex justify-center items-center p-2 w-24 h-9 bg-customwhite text-black rounded-sm hover:bg-gray-500'>
                                    Cancle
                                </button>
                                <button
                                    onClick={handleChangeEmail}
                                    disabled={!email || loading}
                                    className="flex justify-center items-center p-2 w-24 h-9 bg-customฺButton text-white rounded-sm hover:bg-customฺButtomHover"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ChangeEmailBox;
