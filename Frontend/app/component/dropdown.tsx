import React, { useState, useEffect, useRef } from 'react';

function Dropdown() {
  // State to manage the visibility of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the dropdown menu to check for outside clicks
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setIsOpen(!isOpen);


  return (
    <div className='bg-customwhite '>
      <button 
        ref={buttonRef} 
        onClick={toggleDropdown}
        className="flex justify-between m-2 w-56 text-black bg-white shadow hover:bg-gray-100 focus:ring-2 focus:outline-none font-medium rounded-lg  text-sm px-8 py-3 text-center items-center "
        type="button"
      >
        Dropdown button
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          ref={dropdownRef} 
          className="z-10 mt-1 m-2 w-56 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul className="py-2  text-sm text-gray-700 dark:text-gray-200">
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
