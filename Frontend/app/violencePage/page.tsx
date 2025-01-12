"use client";

import React, { useState } from "react";
import Navber from "../component/navber";
import Card from "../component/CardVideo";
import { Icon } from "@iconify/react";
import FilterButton from "../component/Filterbutton";


function Page() {
  const totalCards = 12;
  const cardsPerPage = 10;
  const totalPages = Math.ceil(totalCards / cardsPerPage); // คำนวณจำนวนหน้าทั้งหมด
  const [currentPage, setCurrentPage] = useState(1); // สถานะของหน้าเริ่มต้น
  // ฟังก์ชันเพื่อแสดง Card ตามหน้าปัจจุบัน
  const displayCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToDisplay = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < totalCards) {
        cardsToDisplay.push(<Card key={i} />);
      }
    }
    return cardsToDisplay;
  };

  // ฟังก์ชันสำหรับการแสดงเลขหน้า
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1); // เริ่มแสดงจากหน้าที่เป็นปัจจุบันหรือ 1
    let endPage = Math.min(totalPages, startPage + 3); // แสดงสูงสุด 4 หน้า

    // ให้เลขหน้าสูงสุดไม่เกิน totalPages และต่ำสุดไม่เกิน 1
    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 mx-1 w-10 rounded-sm text-white ${i === currentPage
            ? "bg-customฺButton text-white"
            : "bg-customฺButton"
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Navber />
      <div className="bg-customBlue h-screen pt-20">
        <div className="flex justify-center items-center text-2xl font-bold text-white p-6">
          Detection Violence
        </div>
        <div className="pt-16">
          <div className="w-full flex justify-end pr-10 p-5">
            <FilterButton/>
          </div>
          <div className="pl-28 pr-28 grid grid-cols-5 grid-rows-2 gap-4">
            {displayCards()}
          </div>
          <div className="flex justify-end items-center mt-4 px-10">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm bg-customฺButton text-white"
              disabled={currentPage === 1}
            >
              <Icon icon="mingcute:left-fill" width="24" height="24" />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              className="flex justify-center items-center px-3 py-2 mx-1 w-10 rounded-sm bg-customฺButton text-white"
              disabled={currentPage === totalPages}
            >
              <Icon icon="mingcute:right-fill" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
