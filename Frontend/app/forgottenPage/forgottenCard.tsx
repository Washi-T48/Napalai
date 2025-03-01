import React from "react";

interface ForgottenItem {
    id: number;
    description: string;
    created: string;
    item_type: string;
    itemCount: number;
    item_name: string;
}


interface Props {
    forgottenResponse: ForgottenItem[]; 
    setStatePopup: (option: boolean) => void; 
    setSelectedItem: (item: ForgottenItem) => void; // เพิ่มตรงนี้
}

const ForgottenCard: React.FC<Props> = ({ forgottenResponse, setStatePopup, setSelectedItem }) => {
    if (!forgottenResponse || forgottenResponse.length === 0) {
        return <div>No events available</div>; 
    }

    return (
        <div>
            {forgottenResponse.map((item) => (
                <div key={item.id}>
                    <div
                        onClick={() => {
                            setSelectedItem(item); // อัปเดตไอเท็มที่ถูกเลือก
                            setStatePopup(true); // เปิด Popup
                        }}
                        className="flex justify-between items-center p-1 h-18 w-full bg-customBlue shadow-md rounded-md hover:bg-customSlateBlue cursor-pointer"
                    >
                        <div className="flex flex-row w-full">
                            <div className="flex justify-center items-center px-2"></div>
                            <div className="flex-col w-full p-2">
                                <div>{item.item_name ?? "Unknown Item"}</div>
                                <div className="flex justify-between pt-2 text-gray-400 text-tiny">
                                    <div>{item.created}</div>
                                    <div>{item.item_type} . {item.item_type}</div>
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
