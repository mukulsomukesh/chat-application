import React from 'react'
import UserDetails from './UserDetails'
import { useSelector } from 'react-redux';

export default function ChatHeader() {

  const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);

  return (
    <div className='flex mt-2 justify-between items-center h-12 text-primary-50 bg-primary-800 rounded-tl-lg rounded-tr-lg  px-5' >
        
        <div className="flex items-center pt-2  ml-2 gap-2">
        <div className={`bg-primary-50 rounded-full w-9 h-9 flex items-center justify-center`}>
        <img className="w-8 h-8 rounded-full" src={selectedUserForChat.isGroupChat ? "https://cdn-icons-png.flaticon.com/512/2043/2043173.png": selectedUserForChat.users[1].pic} alt={"not found"} />
</div>
        <h1 className='text-2xl'>  {selectedUserForChat.isGroupChat ? selectedUserForChat.chatName: selectedUserForChat.users[1].name} </h1>
        </div>

        <UserDetails />

    </div>
  )
}
