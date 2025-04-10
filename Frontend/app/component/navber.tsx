import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import unnyFace from "../../public/imges/user.png";
import Link from "next/link";
import Port from "../port";
import { Icon } from '@iconify/react';

export default function Navber() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHamberger, setShowHamberger] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${Port.URL}/auth/user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const logout = async () => {
    try {
      const response = await fetch(`${Port.URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between fixed bg-customBlue text-white p-4 lg:px-14 w-full h-16 z-50">
      <Link href="/viewPage">
      <div className="text-3xl font-bold">NAPALAI</div>
      </Link>

      {/* Hamburger Menu for mobile */}
      <div className="lg:hidden flex items-center">
        <button onClick={() => setShowHamberger(!showHamberger)} className="text-3xl">
        <Icon icon="charm:menu-hamburger" width="28" height="28" />
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
          <div className="flex justify-center items-center ">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 focus:outline-none"
            >

              {userData && userData.picture ? (
                <Image
                  src={userData.picture}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-full h-full cursor-pointer"
                />
              ) : (
                <Image
                  className="rounded-full object-cover w-full h-full cursor-pointer"
                  src={unnyFace}
                  alt="Profile"
                />
              )}
            </button>
          </div>


          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-CustomDeepTeal text-white shadow-2xl rounded-md overflow-hidden">
              <Link href="/profile">
                <div className="px-4 py-3 duration-300 hover:bg-gray-200 hover:text-black cursor-pointer">Change Profile</div>
              </Link>
              <div
                onClick={logout}
                className="px-4 py-3 duration-300 hover:bg-customRed hover:text-white cursor-pointer"
              >
                Logout
              </div>
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
