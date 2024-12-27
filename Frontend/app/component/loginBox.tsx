import React from 'react'
import { useState } from "react";
import { count } from "console";
import Image from "next/image"
import unnyFace from "../../public/imges/unnyFace.jpg"


function LoginBox() {
        const [stateForgetPassword , setStateForgetPassword] = useState(false) 
        
    return (

        // Login
        <div className="w-full h-screen bg-customBlue flex items-center ">
        <div className="flex justify-center flex-col items-center border border-customฺBorder p-6 rounded-2xl w-80 m-auto">
        {stateForgetPassword == false?
        <>
        <div className="w-28 h-28">
        <Image
        className="rounded-full object-cover w-full h-full"
        src={unnyFace}
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
            className="w-full p-1 rounded-sm text-sm h-8"
        />
        </div>
        
        <div className="space-y-1">
        <label htmlFor="password" className="text-xs ">Passwword</label>
        <input
            type="password"
            id="password"
            className="w-full p-1 rounded-sm text-sm h-8 text-black"
        />
        <div className="mt-1 text-xs text-gray-400">

            <div
            onClick={() => setStateForgetPassword(true)} 
            className=" cursor-pointer"
            >Forget password ?</div>
        </div>
        </div>
        <div>
        <button className="w-full h-8 p-1 rounded-sm text-sm bg-customฺButton hover:bg-customฺButtomHover">Submit</button>
        </div>
    </div>
    </>
    :<>

    {/* Reset password */}
    <div className="text-white p-2  gap-10 h-auto ">
        <h1 className="text-lg font-medium">Reset password</h1>
        
        <div className="space-y-1">
        <label htmlFor="username" className="text-xs">Username</label>
        <input
            type="text"
            id="username"
            className="w-full p-1 rounded-sm text-sm h-8 text-black"
        />
        </div>
        <div className="space-y-1">
        <label htmlFor="username" className="text-xs">Email</label>
        <input
            type="text"
            id="username"
            className="w-full p-1 rounded-sm text-sm h-8 text-black"
        />
        </div>
        <div className="mt-1 text-xs text-white space-y-2">
        <div 
        onClick={() => setStateForgetPassword(false)} 
        className="text-gray-400 cursor-pointer">Login?</div>
        <button className="w-full h-8 p-1 rounded-sm text-sm bg-customฺButton hover:bg-customฺButtomHover">Submit</button>
        </div>
    </div>

    </>}
    </div>
    </div>
    )
}

export default LoginBox