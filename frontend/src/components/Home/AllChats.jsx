import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../redux/appReducer/action';
import CreateGroupChat from './AllChats/CreateGroupChat';
import DisplayChatCard from './AllChats/DisplayChatCard';
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:8080";


export default function AllChats() {

  const dispatch = useDispatch();
  const allChat = useSelector((state) => state.appReducer.allChat);
  const socket = io(ENDPOINT);


  useEffect(() => {
    dispatch(getChats());
    
  }, [1])

  return (
    <div className="flex flex-col flex-grow p-2 mt-3 ">

      <CreateGroupChat />

<div className='bg-primary-800 mt-3 rounded-lg p-2  '>

<div className='max-h-[72vh] p-2 overflow-y-auto'>
      {allChat?.map((item) => (

        <DisplayChatCard socket={socket} item={item} key={item.id} />

      ))}
</div>
</div>
    </div>
  )
}
