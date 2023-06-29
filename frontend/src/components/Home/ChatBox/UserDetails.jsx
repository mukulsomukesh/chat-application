import React, { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function UserDetails() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
      <section>
        <button className="text-primary-50 mt-3 mr-2 focus:outline-none" onClick={openModal}>
          <BsInfoCircle size={24} />
        </button>

      {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-primary-50 text-primary-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">User Details</h2>
              <button className=" hover:text-primry-50 text-primary-800 rounded-md py-1 px-2 " onClick={closeModal}>
                <AiOutlineCloseCircle size={"30px"} />
              </button>
            </div>
            <div className="mt-4">

              <p>This is the content of the modal.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
