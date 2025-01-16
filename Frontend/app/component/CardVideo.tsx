import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// ใช้ StaticImageData สำหรับประเภทของ img
interface CardProp { 
    item: { 
        img: StaticImageData;
        name: string;
        camera: string;
        status: string;
        timeAgo: string;
    };
}

const CardVideo: React.FC<CardProp> = ({ item }) => {
    return (
        <div className="w-80 h-56 rounded-sm bg-customSlateBlue text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <Link href="/viewViolencePage" className="block">
                <Image
                    className="h-40 w-80 rounded-t-sm object-cover"
                    src={item.img}
                    alt={item.name}
                />
            </Link>

            <div className="flex justify-between p-2">
                <div className="flex flex-col">
                    <div className="text-lg">{item.name}</div>
                    <div className="text-tiny p-1 text-gray-400">{item.camera}</div>
                </div>
                <div className="flex flex-col items-end">
                    <div className={`text-tiny p-1 rounded-sm shadow-[inset_-12px_-8px_40px_#46464620] ${item.status === 'Unreturned' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                        {item.status}
                    </div>
                    <div className="text-tiny pt-2 text-gray-400">{item.timeAgo}</div>
                </div>
            </div>
        </div>
    );
};

export default CardVideo;
