import React, { useState, useEffect, useRef } from 'react';
import { BiSolidBell } from 'react-icons/bi';

export default function Notification() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-none"
        onClick={handleProfileClick}
      >
        <BiSolidBell className="w-6 h-6" />
      </button>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
        >
          {/* Additional information content */}
          <p>Notification</p>
          <p>Email: admin@gmail.com</p>
          {/* Add more info as needed */}
        </div>
      )}
    </div>
  );
}
