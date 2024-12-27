"use client";

import React from 'react'
import Navber from "../component/navber";
import FilterButton from "../component/filterButton";
import Card from '../component/card';

function page() {


    return (
        <>
        <div className='bg-customBlue h-screen'>
            <Navber/>
            <div className='flex justify-center items-center text-2xl font-bold text-white p-12 '>
                Detection Violence
            </div>
            <div className='w-full flex justify-end pr-10'>
                <FilterButton/>
            </div>
            <div>
                <Card/>
            </div>
        </div>
        </>
        
    )
}

export default page