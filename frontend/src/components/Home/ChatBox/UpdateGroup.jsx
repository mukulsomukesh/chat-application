import React, { useState, useEffect, useRef } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenameGroup from './RenameGroup';
import RemoveMembers from './RemoveMembers';
import AddMembers from './AddMembers';


export default function UpdateGroup() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef(null);


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



    return (
        <div className="relative">

            {/* popup opening button */}
            <button
                className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-none"
                onClick={handleProfileClick}
            >
                <BsThreeDotsVertical size={24} />
            </button>

            {/* open popup */}
            {isPopupOpen && (
                <div ref={popupRef} className="text-left text-primary-800 absolute right-0 min-w-[200px] w-25vw bg-primary-50 rounded-md shadow-xl">

                    {/* rename group */}
                    <RenameGroup />

                    {/* add members to group */}
                    <AddMembers />

                    {/* remove members to group  */}
                    <RemoveMembers />
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
