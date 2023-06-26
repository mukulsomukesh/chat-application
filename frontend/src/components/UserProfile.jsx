import React, { useState, useEffect, useRef } from 'react';

export default function UserProfile() {
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
        className="rounded-full w-10 h-10 overflow-hidden focus:outline-none"
        onClick={handleProfileClick}
      >
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
          alt="Profile"
        />
      </button>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
        >
          {/* Additional information content */}
          <p>Username: admin</p>
          <p>Email: admin@gmail.com</p>
          {/* Add more info as needed */}
        </div>
      )}
    </div>
  );
}
