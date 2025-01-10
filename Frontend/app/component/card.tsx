import React from 'react'
import Image from 'next/image'
import imgs1 from '../../public/imges/imges1.jpg'

function Card() {
    return (
        <div className=' w-80 h-56 rounded-sm bg-customSlateBlue text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <Image
            className='h-40 w-80 rounded-t-sm'
            src = {imgs1}
            alt = ''
            />
            <div className='flex justify-between p-2'>
                <div className='flex justify-between flex-col'>
                    <div className='text-lg'>
                        item name
                    </div>
                    <div className='flex justify-start items-center text-tiny p-1 text-gray-400'>
                        z.camera1
                    </div>
                </div>
                <div className='flex justify-between flex-col'>
                    <div className='text-tiny bg-red-500 p-1 text-white rounded-sm shadow-[inset_-12px_-8px_40px_#46464620]'>
                        Unreturned
                    </div>
                    <div className='flex justify-end text-tiny p-1 text-gray-400'>
                        2 day ago
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Card