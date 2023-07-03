import React, { useState } from 'react';
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
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handelSearchUser = () => {
    dispatch(searchUsers(userInput.trim()));
  };

  return (
    <>
      {/* display slider button */}
      <button
        className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-none"
        onClick={handleOpenSidebar}
      >
        <BiSearchAlt className="w-6 h-6" />
      </button>

      {/* sidebar */}
      <aside
        className={`bg-primary-800 text-white w-80 fixed top-0 ${isOpen ? 'left-0' : '-left-80'
          } h-screen  transform transition-transform duration-300 px-2 ease-in-out z-40`}
      >
        <div className="p-5 flex justify-end">
          <button
            className="bg-primary-800 text-white p-2 rounded-full hover:bg-primary-700 focus:outline-none z-50"
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
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              placeholder="Search User"
              className="bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className="absolute rounded-l-none rounded-r-lg inset-y-0 right-0 px-2.5 py-2.5 text-primary-400 hover:bg-primary-700 hover:text-white bg-transparent"
              onClick={handelSearchUser}
            >
              <BiSearchAlt className="w-6 h-6" />
            </button>
          </div>

          {/* loading status */}
          {isSearchUserProcessing && (
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mt-10"></div>
          )}

          {/* if no user found */}
          {!isSearchUserProcessing && searchedUser.length === 0 && (
            <p className="text-primary-500 text-center mt-4">No User Found.</p>
          )}

          {/* map searched result */}
          <div className='mt-7 max-h-[75vh] p-2 overflow-y-auto'>
            {searchedUser.length !== 0 &&
              searchedUser?.map((item) => (
                <UserCard
                  userId={item._id}
                  name={item.name}
                  email={item.email}
                  imageSrc={item.pic}
                />
              ))}
          </div>

        </nav>
      </aside>
    </>
  );
}
