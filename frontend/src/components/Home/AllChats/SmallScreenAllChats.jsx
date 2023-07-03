import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import AllChats from '../AllChats';


export default function SmallScreenAllChats() {
    const [isOpen, setIsOpen] = useState(false);

    // sidebar opener
    const handleOpenSidebar = () => {
        setIsOpen(true);
    };

    // sidebar closer
    const handleCloseSidebar = () => {
        setIsOpen(false);
    };


    return (
        <>
            {/* display slider button */}
            <button
                className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-none "
                onClick={handleOpenSidebar}
            >
                <BiMenu className="w-6 h-6" />
            </button>

            {/* sidebar */}
            <aside
                className={`bg-primary-800 text-white w-80 fixed top-0 ${isOpen ? 'left-0' : '-left-80'
                    } h-screen  transform transition-transform duration-300 px-2 ease-in-out z-40`}
            >
                <div className="p-5 flex justify-end">
                    <button
                        className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-non"
                        onClick={handleCloseSidebar}
                    >
                        <AiOutlineCloseCircle className="w-6 h-6" />
                    </button>
                </div>


                {/* all chats */}
                <AllChats />
            </aside>
        </>
    );
}
