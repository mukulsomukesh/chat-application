import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserProfile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const popupRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));

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

  const handelLogout = () => {
    toast.success('Logout Success.', { position: toast.POSITION.BOTTOM_LEFT });

    setTimeout(() => { dispatch(logoutAccount()) }, 1500)

  }

  return (
    <div className="relative">
      <button
        className="rounded-full w-10 h-10 overflow-hidden focus:outline-none"
        onClick={handleProfileClick}
      >
        <img
          className="w-full h-full object-cover"
          src={userData.pic}
          alt="Profile"
        />
      </button>
      {isPopupOpen && (
        <div ref={popupRef} class="text-center text-primary-800 absolute right-0 min-w-[200px] w-25vw  bg-primary-50 rounded-md shadow-xl">
          <div class="text-center p-6 border-b  ">
            <img
              className=" h-full w-full rounded-full"
              src={userData.pic}
              alt="Profile"
            />

          </div>

          <p class="pt-2 text-lg font-semibold ">{userData.name}</p>
          <p class="text-sm ">{userData.email}</p>
          <button onClick={(e) => { handelLogout() }} class="cursor-pointer w-full mt-5 py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50 ">
            LOGOUT
          </button>
        </div>
      )}

      <ToastContainer />

    </div>
  );
}
