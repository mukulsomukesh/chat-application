import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGroupName, getChats } from '../../../redux/appReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function AddMembers() {
    const [showModal, setShowModal] = useState(false);

    // toggle modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <section>

            <button className="cursor-pointer w-full py-2 px-4 text-sm font-bold hover:bg-primary-800 hover:text-primary-50" onClick={toggleModal}>
                Add members
            </button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-primary-50 text-primary-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-bold"> Add members in group </h2>
                            <button className="hover:text-primary-500 text-primary-800 rounded-md py-1 px-2" onClick={toggleModal}>
                                <AiOutlineCloseCircle size={'25px'} />
                            </button>
                        </div>
                        content
                    </div>
                </div>
            )}

        </section>
    );
}
