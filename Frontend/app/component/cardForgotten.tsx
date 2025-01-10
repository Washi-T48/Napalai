import React from 'react'
import Image from 'next/image'
import Navber from "./navber";
import { useState } from 'react';
import unnyFace from "../../public/imges/unnyFace.jpg"
import EditUndefindItem from './editUndefindItem';


function CardForgotten() {
    const [editItemDetail , SetEditItemDetail] = useState(false)
    const toggleEditItemDetail = () => 
        SetEditItemDetail(!editItemDetail);
    
    return (
        <div 
        onClick={toggleEditItemDetail}
        className='flex justify-between items-center p-1 w-96 h-18 bg-customBlue shadow-lg rounded-md hover:bg-customSlateBlue'>
        
            <div className='flex flex-row w-full'>
                <div className='flex justify-center items-center px-2'>
                    <Image
                            src={unnyFace}  // Replace with the correct path to your image
                            alt="Image Description"        // Provide a description for accessibility
                            className='w-16 h-12 rounded-md'                   // Specify the height of the image
                        />
                </div>
                <div className='flex-col w-full p-2'>
                    <div>
                        Undefine Item
                    </div>
                    <div className='flex justify-between pt-2 text-gray-400 text-tiny '>
                        <div>15 minute ago</div>
                        <div>Zone4.Camera3</div>
                    </div>
                </div>
            </div>

            {editItemDetail && (
                <EditUndefindItem/>
            )}
        </div>
    )
}

export default CardForgotten