import React, { useState } from 'react';
import UserProfile from './UserProfile';
import SideBar from './SideBar';
import Notification from './Notification';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);

    const handleProfileClick = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <nav className="bg-gray-800 border-gray-200 ">

            {!sign_in_success ?
                <span href="#" className=" text-white flex flex-wrap items-center mx-auto p-4">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Chat Application
                </span>
                :
                <div className=" flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                    <SideBar />
                    <section class="flex flex-wrap gap-4 items-center">
                        <Notification />
                        <UserProfile />
                    </section>
                </div>
            }


        </nav>
    );
}
