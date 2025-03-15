"use client";
import React, { useState } from 'react';
interface Props {
    setOpenChangeUser: (open: boolean) => void;
  }
const ChangeUserBox:React.FC<Props> = ({setOpenChangeUser}) => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');


    const handleUsernameChange = async () => {
        try {
            const res = await fetch('https://cloud.phraya.net:443/auth/changeUsername', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('Username changed successfully!');
            } else {
                setMessage(data.error || 'Failed to change username');
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div>

                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <div className="bg-customBlue p-8 rounded-2xl w-96 text-white">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-medium">Change Username</h1>
                            {/* <button
                                onClick={() => setOpenChangeUser(false)}
                                className="text-xl font-bold"
                            >
                            </button> */}
                        </div>

                        <div className="flex flex-col space-y-3 pt-6">
                            <label htmlFor="username" className="text-xs">New Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=""
                            />

                            <div className="flex justify-end gap-2 pt-6">
                                <button
                                onClick={() => setOpenChangeUser(false)}
                                className='flex justify-center items-center p-2 w-24 h-9 bg-customwhite text-black rounded-sm hover:bg-gray-500'
                                >
                                    Cancle
                                </button>
                                <button
                                    onClick={handleUsernameChange}
                                    disabled={!username}
                                    className="flex justify-center items-center p-2 w-24 h-9 bg-customฺButton text-white rounded-sm hover:bg-customฺButtomHover"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* แสดงข้อความผลลัพธ์ */}
                        {message && <p className="text-xs text-white mt-2">{message}</p>}
                    </div>
                </div>
        </div>
    );
}

export default ChangeUserBox;
