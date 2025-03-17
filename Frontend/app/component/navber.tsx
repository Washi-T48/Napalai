import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import unnyFace from "../../public/imges/unnyFace.jpg";
import Link from "next/link";

export default function Navber() {
  const [showMenu, setShowMenu] = useState(false); 
  const [showHamberger, setShowHamberger] = useState(false);// ใช้เพื่อควบคุมการแสดงผลเมนู
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // คลิกนอกเมนูจะปิดเมนู
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
    <div className="flex justify-between fixed bg-customBlue text-white p-4 lg:px-14 w-full h-16 z-50">
      <div className="text-3xl font-bold">NAPALAI</div>

      {/* Hamburger Menu for mobile */}
      <div className="lg:hidden flex items-center">
        <button onClick={() => setShowHamberger(!showHamberger)} className="text-3xl">
          &#9776; {/* สัญลักษณ์ hamburger */}
        </button>
      </div>

      {/* Menu items for large screens */}
      <div className="hidden lg:flex justify-center items-center text-lg space-x-12 relative">
        <Link href="/viewPage">
          <div className="cursor-pointer">View</div>
        </Link>
        <Link href="/violenceLog">
          <div className="cursor-pointer">Violence</div>
        </Link>
        <Link href="/forgottenPage">
          <div className="cursor-pointer">Forgotten</div>
        </Link>
        
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

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-CustomDeepTeal text-white shadow-2xl rounded-md overflow-hidden">
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

      {/* Hamburger Menu Dropdown for mobile */}
      {showHamberger && (
        <div className=" w-full  lg:hidden absolute top-16 left-0  bg-customBlue text-white shadow-2xl">
          <Link href="/viewPage">
            <div className="flex justify-center items-center px-4 py-4 font-bold duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">View</div>
          </Link>
          <Link href="/violenceLog">
            <div className="flex justify-center items-center px-4 py-4 font-bold  duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">Violence</div>
          </Link>
          <Link href="/forgottenPage">
            <div className="flex justify-center items-center px-4 py-4 font-bold  duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">Forgotten</div>
          </Link>
          <Link href="/profile">
            <div className="flex justify-center items-center px-4 py-4 font-bold  duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">Profile</div>
          </Link>
          <Link href="/logout">
            <div className="flex justify-center items-center px-4 py-4 font-bold  duration-300 hover:bg-customRed hover:text-white cursor-pointer">Logout</div>
          </Link>
        </div>
      )}
    </div>
  );
}
