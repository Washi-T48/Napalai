"use client";
import { count } from 'console';
import React, { useState } from 'react';
import Port from '../port';
interface Props {
    setOpenChangeEmail: (open: boolean) => void;
}
const ChangeEmailBox: React.FC<Props> = ({ setOpenChangeEmail }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeEmail = async () => {
        if (!email) return alert('Please enter a new email.');

        setLoading(true);
        try {
            const res = await fetch(`${Port.URL}/authchangeEmail`, {
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
                <div className="bg-customBlue p-8 rounded-2xl w-auto text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-medium">Change Email</h1>
                    </div>

                    <div className="flex flex-col space-y-3 pt-6">
                        <label htmlFor="email" className="text-xs px-2">New Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter your new username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-96 px-3 py-2 mt-1 pb-8 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"

                        />

                        <div className="flex justify-end gap-2 pt-6">
                            <button
                                onClick={() => setOpenChangeEmail(false)}
                                className='btn btn-cancle'>
                                Cancle
                            </button>
                            <button
                                onClick={handleChangeEmail}
                                disabled={!email || loading}
                                className="btn btn-outline"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeEmailBox;
