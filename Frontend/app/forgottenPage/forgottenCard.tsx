import React from "react";
import Image from "next/image";
import PopupUndefineItem from "./popupUndefineItem";

interface eventCard {
    id:number;
    created:string;
    camera_id:number;
    type:string;
}

interface Props {
    eventCard: eventCard[]; 
    setStatePopup: (option: boolean) => void; 
}

const ForgottenCard: React.FC<Props> = ({ eventCard , setStatePopup }) => {
    // ตรวจสอบว่ามี eventCard หรือไม่
    if (!eventCard || eventCard.length === 0) {
        return <div>No events available</div>; 
    }

    return (
        <div>
            {eventCard.map((item, id) => (
                <div key={id}>
                    <div
                        onClick={() => setStatePopup(true)}
                        className="flex justify-between items-center p-1 h-18 w-full bg-customBlue shadow-md rounded-md hover:bg-customSlateBlue cursor-pointer"
                        
                    >
                        <div className="flex flex-row w-full">
                            <div className="flex justify-center items-center px-2">
                            </div>
                            <div className="flex-col w-full p-2">
                                <div>
                                    {/* {item.created} */}
                                    Item Name
                                    </div>
                                <div className="flex justify-between pt-2 text-gray-400 text-tiny">
                                    <div>
                                        {item.created}
                                        
                                    </div>
                                    <div>{item.type} . {item.type}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ForgottenCard;
