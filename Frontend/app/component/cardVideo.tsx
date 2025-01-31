import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// ใช้ StaticImageData สำหรับประเภทของ img
interface CardProp {
    item: {
        video: any;
        name: string;
        camera: string;
        status: string;
        timeAgo: string;
    };
}

const CardVideo: React.FC<CardProp> = ({ item }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; 
        }
    };
    return (
        <div className="max-w-full h-auto rounded-sm bg-customSlateBlue text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

            <video
                // poster={item.thumbnail} 
                ref={videoRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className=" max-h-56 min-h-56 w-full rounded-t-sm object-cover"
                src={item.video}
                title={item.name}
                muted
            />


            <div className="flex flex-wrap justify-between p-2">
                <div className="flex gap-2 flex-col ">
                    <div className="text-2xl md:text-base lg:text-x ">{item.name}</div>
                    <div className="text-tiny text-gray-400">{item.camera}</div>
                </div>
                <div className="flex  flex-col items-end">
                    <div className={`text-tiny px-2 py-1 rounded-sm shadow-[inset_-12px_-8px_40px_#46464620] ${item.status === 'Unreturned' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                        {item.status}
                    </div>
                    <div className="text-tiny pt-2 text-gray-400">{item.timeAgo}</div>
                </div>
            </div>
        </div>
    );
};

export default CardVideo;
