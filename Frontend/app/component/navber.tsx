import Image from "next/image";
import unnyFace from "../../public/imges/unnyFace.jpg";
import Link from "next/link";


export default function Navber() {
  
  return (
    <>
      <div className="flex justify-between fixed bg-customBlue text-white p-4 px-14 w-full h-16 z-50">
        <div className="text-3xl font-bold">NAPALAI</div>
        <div className="flex justify-center items-center text-lg space-x-12 ">
          <Link href="/viewPage">
            <div className="cursor-pointer">View</div>
          </Link>
          <Link href="/violenceLog">
            <div className="cursor-pointer">Violence</div>
          </Link>
          <Link href="/forgottenPage">
            <div className="cursor-pointer">Forgotten</div>
          </Link>
          <Link href="/resetPasswordPage">
          <div className="w-8 h-8">
            <Image
              className="rounded-full object-cover w-full h-full"
              src={unnyFace}
              alt="Profile"
            />
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}
