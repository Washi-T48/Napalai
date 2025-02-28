import React, { useRef } from 'react';

interface ViolenceItem {
    id: number;
    violenceid: number;
    video: string;
    name: string;
    camera: string | null;
    status: string;
    created: string;
    createdtime: string;
    zone: string | null;
    item_type: string;
    description: string | null;
    cameraname: string; 
    zonename: string; 
    violence_type: string;
}


interface CardVideoProps {
    item: ViolenceItem; 
}

const CardViolenceVideo: React.FC<CardVideoProps> = ({ item }) => {

    return (
        <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <video
                // ref={videoRef}
                className="bg-black w-full aspect-video rounded-t-md object-cover"
                src={item.video}
                title={item.name}
                muted
            />
            <div className="flex flex-wrap justify-between p-2">
                <div className="flex gap-2 flex-col">
                    <div className="text-2xl md:text-base lg:text-x">{item.violence_type}</div>
                    <div className="text-tiny text-gray-400">{item.created}</div>
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

export default CardViolenceVideo;
