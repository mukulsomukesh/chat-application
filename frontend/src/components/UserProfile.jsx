import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const popupRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));

  const handleProfileClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };


  // useEffect
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

  // logout function
  const handelLogout = () => {
    toast.success('Logout Success.', { position: toast.POSITION.BOTTOM_LEFT });
    setTimeout(() => { dispatch(logoutAccount()) }, 1500)
  }

  // upload user profile input
  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  };

  return (
    <div className="relative">

      {/* popup opening button */}
      <button
        className="rounded-full w-10 h-10 overflow-hidden focus:outline-none"
        onClick={handleProfileClick}
      >
        <img
          className={`w-full h-full object-cover`}
          src={userData.pic}
          alt="Profile"
        />
      </button>

      {/* open popup */}
      {isPopupOpen && (
        <div ref={popupRef} className="text-center text-primary-800 absolute right-0 min-w-[200px] w-25vw bg-primary-50 rounded-md shadow-xl">
          <div className="text-center p-6 border-b relative">
            <img
              className={`cursor-pointer h-full w-full rounded-full`}
              src={userData.pic}
              alt="Profile"
            />
          </div>

          {/* user data */}
          <p className="pt-2 text-lg font-semibold">{userData.name}</p>
          <p className="text-sm">{userData.email}</p>

          {/* input button */}
          <div className="cursor-pointer w-full mt-5 py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50">
            <label htmlFor="imageUpload" className="py-2 px-5 cursor-pointer">
              Change Picture
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* logout button */}
          <button onClick={(e) => { handelLogout() }} className="cursor-pointer w-full py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50">
            LOGOUT
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
