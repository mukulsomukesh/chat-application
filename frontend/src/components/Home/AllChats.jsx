import React, { useEffect } from 'react'
import UserCard from '../UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../redux/appReducer/action';
import CreateGroupChat from './AllChats/CreateGroupChat';

export default function AllChats() {

  const dispatch = useDispatch();
  const allChat = useSelector((state) => state.appReducer.allChat);

  useEffect(() => {
    dispatch(getChats());
  }, [1])

  return (
    <div className="flex flex-col flex-grow p-2">

      <CreateGroupChat />

      {allChat?.map((item) => (

        <UserCard name={item.chatName} key={item.id} />

      ))}

    </div>
  )
}
