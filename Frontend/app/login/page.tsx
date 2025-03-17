"use client"

import Image from "next/image"
import LoginBox from "../component/loginBox";
import Bg from "../../public/imges/cycleBG.png"


function Login() {
  return (
    <>
        <div className="flex justify-between fixed bg-customBlue text-white p-4 px-14 w-full h-16 z-50">
          <div className="text-3xl font-bold">NAPALAI</div>
        </div>
      <div 
        style={{
          background: 'linear-gradient(170deg, rgba(13, 31, 45, 1) 38%, rgba(28, 47, 64, 1) 78%), url(/imges/cycleBG.png)',
        }}
        className="w-full h-screen bg-customBlue flex items-center  ">
        <Image
          className="z-1 fixed object-cover w-full h-full"
          src={Bg}
          alt="LogoWeb"
          layout=""
        />
        <div className="w-full h-screen flex items-center justify-center ">
        <LoginBox />
        </div>

      </div>

    </>
  )
}

export default Login;