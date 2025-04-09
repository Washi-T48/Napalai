import React, { useState } from 'react';

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
    description: string | null;
    cameraname: string;
    zonename: string;
    violence_type: string;
    image: string;
}

interface CardVideoProps {
    item: ViolenceItem;
}

const CardViolenceVideo: React.FC<CardVideoProps> = ({ item }) => {
    // const [isPlaying, setIsPlaying] = useState(false);

    // const handleVideoClick = () => {
    //     setIsPlaying(true);
    // };

    return (
        <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white">
{/* 
            <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white">
                {isPlaying ? (
                    <video
                        className="bg-black w-full aspect-video rounded-t-md object-cover"
                        src={item.video}
                        title={item.name}
                        muted
                        autoPlay
                        loop
                    />
                ) : (
                    <div
                        className="w-full aspect-video bg-cover bg-center rounded-t-md"
                        style={{ backgroundImage: `url(${item.image})` }}
                        onClick={handleVideoClick}
                    >
                        <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                            <span className="text-white text-3xl">▶</span> 
                        </div>
                    </div>
                )}
            </div> */}

            <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white">
                <div
                    className="w-full aspect-video bg-cover bg-center rounded-t-md bg-black"
                    style={{ backgroundImage: `url(${item.image})` }}
                >
                </div>
            </div>
            <div className="flex flex-wrap justify-between p-2 px-3">
                <div className="flex gap-2 flex-col w-full">
                    <div className="text-md  md:text-base lg:text-x">{item.violence_type ?? ""}</div>
                    <div className="flex justify-between gap-10">
                        <div className="text-tiny text-gray-400">{item.created ?? "unknow time"}</div>
                        <div className="flex text-tiny text-gray-400">
                            {item.zonename ?? "no zone"}<span className="mx-4">|</span> {item.cameraname ?? "no camera"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardViolenceVideo;
