"use client"
import Navber from "../component/navber";
import ChangePassBox from "./changePassBox";

function page() {
    return (
        <>
            <Navber/>
            <div
                style={{
                    background: 'linear-gradient(170deg, rgba(13, 31, 45, 1) 38%, rgba(28, 47, 64, 1) 78%), url(/imges/cycleBG.png)',
                }}
                className="w-full h-screen bg-customBlue flex items-center  ">
                <div className="w-full h-screen flex items-center justify-center ">
                    <ChangePassBox/>
                </div>
            </div>
        </>
    )
}

export default page