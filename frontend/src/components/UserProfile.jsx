import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAccount, updateUserData } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UploadImage from './CommonComponents/UploadImage';


export default function UserProfile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const user_update_success = useSelector((state) => state.authReducer.user_update_success);
  const user_update_failed = useSelector((state) => state.authReducer.user_update_failed);
  const user_update_processing = useSelector((state) => state.authReducer.user_update_processing);
  const user_update_message = useSelector((state) => state.authReducer.user_update_message);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("chat-app-login-user-data")));

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


  // display image successfully change message
  useEffect(() => {

    // image has been changed
    if (user_update_success && !user_update_processing && !user_update_failed) {

      // get updated value from local storage 
      setUserData(JSON.parse(localStorage.getItem("chat-app-login-user-data")))
      toast.success(user_update_message, { position: toast.POSITION.BOTTOM_LEFT });
    }
    else if (!user_update_success && !user_update_processing && user_update_failed) {
      // image not changed
      toast.error(user_update_message, { position: toast.POSITION.BOTTOM_LEFT });
    }

  }, [user_update_success, user_update_processing, user_update_failed])

  // logout function
  const handelLogout = () => {
    toast.success('Logout Success.', { position: toast.POSITION.BOTTOM_LEFT });
    setTimeout(() => { dispatch(logoutAccount()) }, 1500)
  }

  // dispatch updateUserData to change user pic
  const handelFileUpload = (data) => {
    dispatch(updateUserData(data, userData.token))
  }


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
          <UploadImage handelFileUpload={handelFileUpload} />

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
