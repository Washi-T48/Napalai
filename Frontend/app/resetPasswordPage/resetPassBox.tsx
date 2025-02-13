import React, { useState } from 'react';

function ResetPassBox() {
    const [stateForgetPassword, setStateForgetPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLoginSubmit = () => {
        console.log('Username:', username);
        console.log('Email:', email);
    };

    const handleResetSubmit = () => {
        console.log('Username:', username);
        console.log('Email:', email);
    };

    return (
        <div className="z-10">
            <div className="flex justify-center flex-col items-center border border-customฺBorder p-12 rounded-2xl  m-auto">
                {!stateForgetPassword ? (
                    <>

                        <div className="text-white p-2">
                            <h1 className="text-lg font-medium">User</h1>

                            <div className="space-y-1">
                                <label htmlFor="username" className="text-xs">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="text-xs">Email</label>
                                <input
                                    type="Email"
                                    id="Email"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />

                            </div>
                            <div className='flex justify-start gap-2 pt-6'>
                                <button
                                    onClick={() => setStateForgetPassword(true)}
                                    
                                    className=" h-8 p-1 px-4 rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover disabled:bg-gray-400">
                                    Chang Password
                                </button>

                                <button
                                    onClick={handleLoginSubmit}
                                    disabled={!username || !email}
                                    className="h-8 p-1 px-4  rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                                >
                                    Save
                                </button>

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className=" text-white gap-10 h-auto ">
                            <h1 className="text-lg font-medium">Chang password</h1>

                            <div className="space-y-1">
                                <label htmlFor="username" className="text-xs">Currect</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex w-60 p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-xs">New password</label>
                                <input
                                    type="password"
                                    id="newpassword"
                                    value={password}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex w-60 p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-xs">Confirm  password</label>
                                <input
                                    type="password"
                                    id="conpassword"
                                    value={password}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex w-60 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>

                            <div className="mt-1 text-xs text-white space-y-2">
                            
                                <div className='flex justify-start gap-2 pt-4'>
                                    <button
                                            onClick={handleResetSubmit}
                                            disabled={!username || !email}
                                            className="h-8 p-1 px-4  rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                                        >
                                            Chang password
                                        </button>
                                        <button
                                            onClick={() => setStateForgetPassword(false)}
                                            
                                            className=" h-8 p-1 px-4  rounded-sm text-tiny bg-customฺButton hover:bg-customฺButtomHover"
                                        >
                                            Cancel
                                        </button>

                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ResetPassBox;
