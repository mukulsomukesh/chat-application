import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSingleUserChat, getChats } from '../redux/appReducer/action';

const UserCard = ({ name, email, imageSrc, userId }) => {

  const dispatch = useDispatch();

  // create chat
  const handelCreateChat = () => {
    dispatch(createSingleUserChat(userId));
  }

  // useEffect(()=>{
  //   dispatch(getChats())
  // },[])

  return (
    <div onClick={handelCreateChat} className="bg-primary-100 cursor-pointer rounded-lg shadow-md mt-3 hover:shadow-lg hover:ring-2 hover:ring-primary-200 hover:bg-primary-200 transition-shadow duration-200">
      <div className="flex items-center space-x-4 p-2">
        <div className="flex-shrink-0">
            <img className="w-10 h-10 rounded-full" src={imageSrc} alt={`${name} image`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-primary-900 truncate">
            {name}
          </p>
          <p className="text-xs text-primary-500 truncate ">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
