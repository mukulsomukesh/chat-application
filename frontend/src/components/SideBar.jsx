import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../redux/appReducer/action';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const searchedUser = useSelector((state) => state.appReducer.searchedUser);
  const isSearchUserProcessing = useSelector((state) => state.appReducer.isSearchUserProcessing);
  const isSearchUserSuccess = useSelector((state) => state.appReducer.isSearchUserSuccess);
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handelSearchUser = () => {
    dispatch(searchUsers(userInput.trim()));
  }

  return (
    <>

      {/* display slider button */}
      <button
        className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={handleOpenSidebar}
      >
        <BiSearchAlt className="w-6 h-6" />
      </button>

      {/* sidebar */}
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

          {/* search field */}
          <div className="relative">
            <input
              value={userInput}
              onChange={(e) => { setUserInput(e.target.value) }}
              placeholder='Search User'
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className="absolute rounded-l-none rounded-r-lg inset-y-0 right-0 px-2.5 py-2.5 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
              onClick={handelSearchUser}
            >
              <BiSearchAlt className="w-6 h-6" />
            </button>
          </div>

          {/* loading status */}
          {isSearchUserProcessing && (
            <div
              class=" mt-5 mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"></div>
          )}


          {/* if no user found */}
          {!isSearchUserProcessing && searchedUser.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              No User Found.
            </p>
          )}


          {/* map searched result  */}
          {searchedUser.length != 0 && searchedUser?.map((item) => (
            <UserCard name={item.name}
              email={item.email}
              imageSrc={item.pic} />
          ))}

          {/* error message */}
          {!isSearchUserProcessing && !isSearchUserSuccess && (
            <p className="text-gray-500 text-center mt-4">
              Request Failed.
            </p>
          )}

        </nav>
      </aside>
    </>
  );
}
