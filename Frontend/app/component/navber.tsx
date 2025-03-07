"use client"; // ใช้ฝั่ง client เพราะใช้ usePathname()
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import unnyFace from "../../public/imges/unnyFace.jpg";

export default function Navbar() {
  const pathname = usePathname(); // ดึง URL ปัจจุบัน

  return (
    <div className="flex justify-between fixed bg-customBlue text-white p-4 px-14 w-full h-16 z-50">
      <div className="text-3xl font-bold">NAPALAI</div>
      <div className="flex justify-center items-center text-lg space-x-12">
        <NavItem href="/viewPage" pathname={pathname}>View</NavItem>
        <NavItem href="/violenceLog" pathname={pathname}>Violence</NavItem>
        <NavItem href="/forgottenPage" pathname={pathname}>Forgotten</NavItem>
        <Link
          href="/resetPasswordPage"
          className={pathname === "/resetPasswordPage" ? "text-yellow-300" : "text-white"}
        >
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
  );
}

// Component สำหรับลิงก์ Navbar
function NavItem({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`cursor-pointer duration-300 ${isActive ? "border-b-2 mb-1" : "text-white"}`}
    >
      {children}
    </Link>
  );
}
