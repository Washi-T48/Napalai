"use client";

import React, { useState, useEffect } from "react";
import ForgottenCard from "./forgottenCard";
import Navber from "../component/navber";
import ForgottenCalendar from "./forgottenCalender";
import PopupUndefineItem from "./popupUndefineItem";
import Port from "../port";
import Link from "next/link";

interface ForgottenItem {
  id: number;
  description: string;
  created: string;
  item_type: string;
  itemCount: number;
  item_name: string;
}



export default function Page() {
  const [forgottenResponse, setForgottenResponse] = useState<ForgottenItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [statePopup, setStatePopup] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<ForgottenItem | null>(null);
  // const updateItem = (updatedItem: ForgottenItem) => {
  //   setForgottenResponse((prevItems) =>
  //     prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  //   );
  // };

  const today = new Date().toISOString().split("T")[0]; // ดึงวันที่ปัจจุบัน (YYYY-MM-DD)

  const filteredTodayItems = forgottenResponse.filter(
    (item) => item.created.startsWith(today)
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [forgottenRes] = await Promise.all([
          fetch(`${Port.URL}/forgotten`),
        ]);

        if (!forgottenRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [forgottenData] = await Promise.all([
          forgottenRes.json(),
        ]);

        setForgottenResponse(forgottenData);

        console.log(forgottenData)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredForgottenItems = forgottenResponse.filter((item) =>
    item.item_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Navber />
      <div className="bg-customBlue min-h-screen">
        <div className="flex justify-center items-center flex-col pt-16 h-full text-white lg:flex-row">
          <div className="flex justify-center items-start flex-col p-4 gap-4 flex-1 w-full h-full text-white lg:flex-row lg:gap-10">
            <div className="w-full lg:max-w-7xl h-full text-black">
              <ForgottenCalendar forgottenResponse={forgottenResponse} />
            </div>
            <div className="flex justify-between flex-col h-full w-full lg:max-w-md pt-2">
              <div className="flex justify-center flex-col pt-2 p-2 border-b">
                {/* Search Bar */}
                <div className="flex px-4 py-2 rounded-md border-2 bg-customwhite overflow-hidden w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.904 192.904"
                    width="16px"
                    className="fill-black-600 mr-3 rotate-90"
                  >
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search forgotten items..."
                    className="w-full outline-none bg-transparent text-gray-600 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Search Results */}
                <div className="pt-4 mt-3 h-80 overflow-auto">
                  {filteredForgottenItems.length > 0 ? (
                    filteredForgottenItems.map((item) => (
                      <Link key={item.id} href={`/viewForgottenPage/${item.id}`}>
                        <div key={item.id} className="p-2 bg-gray-800 text-white rounded-md mb-2">
                          <p className="text-sm font-bold">{item.item_name}</p>
                          <p className="text-xs text-gray-400">Created: {item.created}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No items found.</p>
                  )}
                </div>
              </div>
              <div className="flex justify-start flex-col pt-4 p-2">
                <div className="p-2">Today ITEM</div>
                <div className="h-80 overflow-auto">
                  <div className="h-80 overflow-auto">
                    <div className="h-80 overflow-auto">
                      <div className="h-80 overflow-auto">
                        {filteredTodayItems.length > 0 ? (
                          filteredTodayItems.map((item) => (
                            <Link key={item.id} href={`/viewForgottenPage/${item.id}`}>
                              <div className="p-2 bg-gray-800 text-white rounded-md mb-2">
                                <p className="text-sm font-bold">{item.item_name ?? "Unknow Item"}</p>
                                <p className="text-xs text-gray-400">Created: {item.created}</p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p className="text-center text-gray-400">No items available today.</p>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {statePopup && selectedItem && (
        <PopupUndefineItem
          setStatePopup={setStatePopup}
          selectedItem={selectedItem}
    
        />
      )} */}

    </>
  );
}
