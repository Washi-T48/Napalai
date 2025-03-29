"use client";
import React, { useState } from 'react';
import Port from '../port';
interface Props {
    setOpenChangeUser: (open: boolean) => void;
}
const ChangeUserBox: React.FC<Props> = ({ setOpenChangeUser }) => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining to prevent runtime errors
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    

    const handleUpload = async () => {
        if (!image) return alert("Please select an image first!");

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch(`${Port.URL}/profile`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed!");
        }
    };



    const handleUsernameChange = async () => {
        try {
            const res = await fetch(`${Port.URL}/auth/changeUsername`, {
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
                <div className="bg-customBlue p-8 rounded-2xl  text-white">
                    <div className="flex justify-between items-center">
                        {/* <h1 className="text-lg font-medium">Change Username</h1> */}
                        {/* <button
                                onClick={() => setOpenChangeUser(false)}
                                className="text-xl font-bold"
                            >
                            </button> */}
                    </div>

                    <div className="flex flex-col space-y-3 pt-6">
                        <div className="flex flex-col justify-center items-center w-full gap-5">
                            <label htmlFor="upload" className="w-40 h-40 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center cursor-pointer duration-300 hover:border-customฺButtomHover">
                                <input type="file" id="upload" className="hidden" onChange={handleFileChange} />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                )}
                                
                            </label>
                        </div>


                        <div className='flex flex-col'>
                            <label htmlFor="username" className="text-xs px-2 pt-3">New Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder='Enter your new username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-96 px-3 py-2 mt-1 pb-8 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-6">
                            <button
                                onClick={() => setOpenChangeUser(false)}
                                className='btn btn-cancle'
                            >
                                Cancle
                            </button>
                            <button
                                onClick={() => {
                                    handleUsernameChange();
                                    handleUpload();
                                }}
                                disabled={!username}
                                className="btn btn-outline"
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
