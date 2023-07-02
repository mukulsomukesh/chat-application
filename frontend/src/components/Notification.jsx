import React, { useState, useEffect, useRef } from 'react';
import { BiSolidBell } from 'react-icons/bi';
import { useSelector } from 'react-redux';


export default function Notification() {
  const notficationsMessages = useSelector((state) => state.appReducer.notficationsMessages);
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
        <span class="relative inline-block">
          <BiSolidBell className="w-6 h-6" />
          {notficationsMessages.length > 0 && (<span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{notficationsMessages.length}</span>)}

        </span>
      </button>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
        >

          {
            notficationsMessages?.map((item) => (
              <div className=" shadow-2xl mb-3 m-2 border-r border-b border-l border-gray-400 rounded-lg p-2">
                <h4 class="text-sm font-semibold text-gray-900">{item.message}</h4>
                <span class="text-xs font-semibold">{item.sender.name} </span>  <span class="text-[13px]"> - {new Date(item.createdAt).toLocaleTimeString()}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
