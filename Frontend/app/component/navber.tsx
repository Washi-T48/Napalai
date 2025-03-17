import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import unnyFace from "../../public/imges/unnyFace.jpg";
import Link from "next/link";

export default function Navber() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between fixed bg-customBlue text-white p-4 px-14 w-full h-16 z-50">
      <div className="text-3xl font-bold">NAPALAI</div>
      <div className="flex justify-center items-center text-lg space-x-12 relative">
        <Link href="/viewPage">
          <div className="cursor-pointer">View</div>
        </Link>
        <Link href="/violenceLog">
          <div className="cursor-pointer">Violence</div>
        </Link>
        <Link href="/forgottenPage">
          <div className="cursor-pointer">Forgotten</div>
        </Link>

        {/* คลิกเพื่อเปิด/ปิดเมนู */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 focus:outline-none"
          >
            <Image
              className="rounded-full object-cover w-full h-full cursor-pointer"
              src={unnyFace}
              alt="Profile"
            />
          </button>

          {/* เมนูแสดงเมื่อคลิก */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-CustomDeepTeal  text-white shadow-2xl rounded-md  overflow-hidden">
              <Link href="/profile">
                <div className="px-4 py-3 duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">Change Profile</div>
              </Link>
              <Link href="/logout">
                <div className="px-4 py-3 duration-300 hover:bg-customRed hover:text-white cursor-pointer">Logout</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}