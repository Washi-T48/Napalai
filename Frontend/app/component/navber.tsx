import Image from "next/image"
import unnyFace from "../../public/imges/unnyFace.jpg"

export default function Navber() {
  return (
    <>
    <div className="flex justify-between  bg-customBlue text-white p-4 px-14 w-full h-16">
      <div className="text-3xl font-bold">NAPALAI</div>
      <div className="flex justify-center items-center text-lg space-x-12 ">
        <div className=" cursor-pointer">View</div>
        <div className=" cursor-pointer">Violence</div>
        <div className=" cursor-pointer">Forgotten</div>
        <div className="w-8 h-8">
          <Image 
          className="rounded-full object-cover w-full h-full"
          src={unnyFace}
          alt="Profile"
          />
        </div>
      </div>
    </div>
      
    </>
    
  )
}