import React from 'react'
import { useState } from 'react';
import Calendar from './calender';
import Dropdown from './dropdown';

function FilterButton() {
    const [FilterButton , SetFilterButton] = useState(true)
    const toggleFilterButton = () => SetFilterButton(!FilterButton);

    return (
        <>
            <button 
            onClick={toggleFilterButton}
            className='flex justify-center items-center p-2 w-28 rounded-sm bg-customฺButton hover:bg-customฺButtomHover text-white font-roboto'>
                    Filter
            </button>

            {FilterButton && (
                <div className='fixed top-52 '>
                    <div className='flex justify-center bg-customwhite w-auto h-full'>
                        <div className='p-0'>
                            <Calendar/>
                        </div>
                        <div>
                            <Dropdown/>
                        </div>     
                    </div>
                </div>
            )}
        </>
    )
}

export default FilterButton