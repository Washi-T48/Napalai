import React, { useRef } from 'react';



interface ForgottenItem {
    id: number;
    forgottenid: number;
    video: string;
    name: string;
    camera: string | null;
    status: string;
    createdtime: string;
    zone: string | null;
    item_type: string;
    description: string | null;
    cameraname: string;
    zonename: string;
    image:string;
}


interface CardVideoProps {
    item: ForgottenItem;
}

const CardVideo: React.FC<CardVideoProps> = ({ item }) => {


    return (
        <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            {/* <video
                // ref={videoRef}
                className="bg-black w-full aspect-video rounded-t-md object-cover"
                src={item.video}
                title={item.name}
                muted
            /> */}

            <div className="max-w-full h-auto rounded-md bg-customSlateBlue text-white">
                <div
                    className="w-full aspect-video bg-cover bg-center rounded-t-md"
                    style={{ backgroundImage: `url(${item.image})` }}
                >
                    {/* <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                        <span className="text-white text-3xl"></span> 
                    </div> */}
                </div>
            </div>
            <div className="flex flex-wrap justify-between p-2 ">
                <div className="flex gap-2 flex-col w-full">
                    <div className='flex justify-between'>
                        <div className="text-2xl md:text-base lg:text-x">{item.item_type}</div>
                        <div className="flex flex-col items-end">
                            {item.status && (
                                <div className={`text-tiny px-2 py-1 rounded-sm shadow-[inset_-12px_-8px_40px_#46464620] ${item.status === 'unreturned' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                                    {item.status}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between gap-10'>
                        <div className="text-tiny text-gray-400">{item.createdtime}</div>
                        <div className='flex text-tiny text-gray-400'>
                            {item.zonename}<span className="mx-4">|</span> {item.cameraname}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardVideo;
