import React, { useRef } from 'react';

interface ViolenceItem {
    id: number;
    video: any;
    name: string;
    camera: string;
    status: string;
    created: string;
    zone: string;
    description: string;
    violence_type: string;
}

interface ForgottenItem {
    id: number;
    video: any;
    name: string;
    camera: string;
    status: string;
    createdtime: string;
    zone: string;
    item_type:string;
}

interface CardVideoProps {
    item: ForgottenItem; 
}

const CardVideo: React.FC<CardVideoProps> = ({ item }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        videoRef.current?.play();
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <video
                ref={videoRef}
                className="bg-black w-full aspect-video rounded-t-md object-cover"
                src={item.video}
                title={item.name}
                muted
            />
            <div className="flex flex-wrap justify-between p-2">
                <div className="flex gap-2 flex-col">
                    <div className="text-2xl md:text-base lg:text-x">{item.item_type}</div>
                    <div className="text-tiny text-gray-400">{item.createdtime}</div>
                </div>
                <div className="flex flex-col items-end">
                    {item.status && (
                        <div className={`text-tiny px-2 py-1 rounded-sm shadow-[inset_-12px_-8px_40px_#46464620] ${item.status === 'Unreturned' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                            {item.status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardVideo;
