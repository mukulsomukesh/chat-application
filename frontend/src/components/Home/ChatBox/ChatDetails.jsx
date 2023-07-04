import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import RenameGroup from './RenameGroup';


export default function ChatDetails() {
  const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
  const [showModal, setShowModal] = useState(false);


  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <section>
      <button className="text-primary-50 mt-3 mr-2 focus:outline-none" onClick={toggleModal}>
        <BsInfoCircle size={24} />
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-primary-50 text-primary-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{selectedUserForChat.chatName}</h2>
              <button className="hover:text-primary-500 text-primary-800 rounded-md py-1 px-2" onClick={toggleModal}>
                <AiOutlineCloseCircle size={'25px'} />
              </button>
            </div>

            <RenameGroup />

          </div>
        </div>
      )}

    </section>
  );
}
