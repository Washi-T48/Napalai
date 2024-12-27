import React from 'react'
import { useState } from 'react';

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
                <div className=' fixed top-60 '>
                    <div className='flex justify-center p-2 bg-customwhite w-auto h-auto'>
                        asdcs
                    </div>
                </div>
            )}
        </>
    )
}

export default FilterButton