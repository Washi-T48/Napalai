import React, { useState } from 'react';
import Image from 'next/image';
import Macbook from '../../public/imges/Macbook.jpg'
import phone1 from '../../public/imges/phone1.jpg'
import phone2 from '../../public/imges/phone2.jpg'
import PopupUndefineItem from './PopupUndefineItem';


const ForgottenCard: React.FC = () => {
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

    const togglePopopUndefine = (index: number) => {
        setActiveItemIndex(activeItemIndex === index ? null : index);
    };

    const items = [
        {
            image: Macbook,
            title: "Macbook",
            time: "15 minutes ago",
            Zone: "Zone4",
            Camera: "Camera1"
        },
        {
            image: phone1,
            title: "Undefine Item ",
            time: "30 minutes ago",
            Zone: "Zone3",
            Camera: "Camera2"
        },
        {
            image: phone1,
            title: "Undefine Item ",
            time: "30 minutes ago",
            Zone: "Zone3",
            Camera: "Camera2"
        },
        {
            image: phone1,
            title: "Undefine Item ",
            time: "30 minutes ago",
            Zone: "Zone3",
            Camera: "Camera2"
        },
        {
            image: phone2,
            title: "Undefine Item ",
            time: "45 minutes ago",
            Zone: "Zone5",
            Camera: "Camera2"
        }
    ];

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center p-1 m-2 w-96 h-18 bg-customBlue shadow-[21px_15px_94px_-2px_rgba(0,_0,_0,_0.1)] rounded-md hover:bg-customSlateBlue cursor-pointer'
                        onClick={() => togglePopopUndefine(index)}
                    >
                        <div className='flex flex-row w-full'>
                            <div className='flex justify-center items-center px-2 '>
                                <Image
                                    src={item.image}
                                    alt="Image Description"
                                    className='w-16 h-12 rounded-md'
                                />
                            </div>
                            <div className='flex-col w-full p-2'>
                                <div>{item.title}</div>
                                <div className='flex justify-between pt-2 text-gray-400 text-tiny'>
                                    <div>{item.time}</div>
                                    <div>{item.Zone} . {item.Camera}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeItemIndex === index && (
                        <PopupUndefineItem item={item} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ForgottenCard;
