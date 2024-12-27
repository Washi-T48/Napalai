"use client";

import React from "react";
import Navber from "../component/navber";
import Sidebar from "../component/sidebar";
import Videos from "../component/videos";


function Page() {
    return (
        <>
        <div className="fixed w-full z-10 top-0">
            <Navber />
        </div>
        
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 mt-16 overflow-auto">
                    <Videos/>
            </div>
        </div>
        </>
    );
};

export default Page;
