import React from 'react';
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs';
import Message from './ChatBox/Mesaage';
import ChatHeader from './ChatBox/ChatHeader';

export default function ChatBox() {
  return (
    <>

<ChatHeader />

    <div className="flex flex-col h-4/5 bg-primary-800 rounded-bl-lg rounded-br-lg px-4 py-2 pb-4">

      <div className="flex h-full flex-col bg-primary-400 p-5 dark:bg-gray-800 rounded-lg mb-2">
        {/* Content within the div */}
        <div className="text-white"> <Message type={"send"} /><Message type={"receave"} /> </div>
      </div>

      <div className="relative mt-2">
        <input
        
          type="text"
          className=" border border-gray-300 bg-primary-50 text-primary-900 font-semibold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Type your message..."
        />
        <button
          type="button"
          className="absolute inset-y-0 right-10 px-8 py-2.7 text-primary-800 focus:outline-none"
        >
          <BsEmojiSmile className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="absolute inset-y-0  right-1 top-1 bottom-1 px-2.5 py-1 rounded-lg hover:bg-primary-700 bg-primary-800 text-primary-100 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
}
