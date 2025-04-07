import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Port from "../port";
interface ForgottenItem {
  id: number;
  description: string;
  created: string;
  item_type: string;
  itemCount: number;
  item_name: string;
}


interface PopupUndefineItemProps {
  setStatePopup: (state: boolean) => void;
  selectedItem: ForgottenItem;
}

const PopupUndefineItem: React.FC<PopupUndefineItemProps> = ({ setStatePopup, selectedItem }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-96">
        <h2 className="text-lg font-bold">{selectedItem.item_type}</h2>
        <p>{selectedItem.description}</p>
        <p className="text-gray-500 text-sm">Created: {selectedItem.created}</p>
        <button onClick={() => setStatePopup(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};
export default PopupUndefineItem;
