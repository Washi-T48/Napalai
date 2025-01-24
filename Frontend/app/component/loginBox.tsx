import React, { useState } from 'react';
import Image from "next/image";
import Logo from "../../public/imges/Logo.png";
import Link from 'next/link';

function LoginBox() {
    const [stateForgetPassword, setStateForgetPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLoginSubmit = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const handleResetSubmit = () => {
        console.log('Username:', username);
        console.log('Email:', email);
    };

    return (
        <div className="z-10">
            <div className="flex justify-center flex-col items-center border border-customฺBorder p-8 rounded-2xl w-80 m-auto">
                {!stateForgetPassword ? (
                    <>
                        <div className="w-28 h-28">
                            <Image
                                className="rounded-full object-cover w-full h-full"
                                src={Logo}
                                alt="LogoWeb"
                            />
                        </div>
                        <div className="text-white p-2 space-y-3">
                            <h1 className="text-lg font-medium">Login</h1>

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
                                <label htmlFor="password" className="text-xs">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                                <div className="mt-1 text-xs text-gray-400">
                                    <div
                                        onClick={() => setStateForgetPassword(true)}
                                        className="cursor-pointer "
                                    >Forget password?</div>
                                </div>
                            </div>
                            <div>
                                <Link href="/viewPage">
                                    <button
                                        onClick={handleLoginSubmit}
                                        disabled={!username || !password}
                                        className="w-full h-8 p-1 rounded-sm text-sm bg-customฺButton hover:bg-customฺButtomHover disabled:bg-gray-400"
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className=" text-white gap-10 h-auto ">
                            <h1 className="text-lg font-medium">Reset password</h1>

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
                                <label htmlFor="email" className="text-xs">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-1 rounded-sm text-sm h-8 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-100"
                                />
                            </div>

                            <div className="mt-1 text-xs text-white space-y-2">
                                <div
                                    onClick={() => setStateForgetPassword(false)}
                                    className="text-gray-400 cursor-pointer"
                                >
                                    Login?
                                </div>

                                <div>
                                    <Link href="/viewPage">
                                        <button
                                            onClick={handleResetSubmit}
                                            disabled={!username || !email}
                                            className="w-full h-8 p-1 rounded-sm text-sm bg-customฺButton hover:bg-customฺButtomHover disabled:bg-gray-400"
                                        >
                                            Submit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginBox;
