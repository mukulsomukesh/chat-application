import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import UserCard from './UserCard';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={handleOpenSidebar}
      >
        <BiSearchAlt className="w-6 h-6" />
      </button>

      <aside
        className={`bg-gray-800 text-white w-64 fixed top-0 ${isOpen ? 'left-0' : '-left-64'
          } h-screen transform transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-5 flex justify-end">
          <button
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none z-50"
            onClick={handleCloseSidebar}
          >
            <AiOutlineCloseCircle className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col flex-grow p-2">
          <div className="relative">
            <input
              placeholder='Search User'
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className="absolute rounded-l-none rounded-r-lg inset-y-0 right-0 px-2.5 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
              onClick={() => console.log("ok")}
            >
              <BiSearchAlt className="w-6 h-6" />
            </button>
          </div>

          <UserCard name="Neil Sims"
            email="email@windster.com"
            imageSrc="https://flowbite.com/docs/images/people/profile-picture-3.jpg" />

        </nav>
      </aside>
    </>
  );
}
