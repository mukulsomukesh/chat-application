import React, { useEffect, useState } from 'react';
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs';
import Message from './ChatBox/Mesaage';
import ChatHeader from './ChatBox/ChatHeader';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/white-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendMessage } from '../../redux/appReducer/action';


export default function ChatBox() {
  const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
  const sendMessageSuccess = useSelector((state) => state.appReducer.sendMessageSuccess);
  const sendMessageFail = useSelector((state) => state.appReducer.sendMessageFail);
  const sendMessageProcessing = useSelector((state) => state.appReducer.sendMessageProcessing);

  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();

  const handelSendMessage = () => {
    let obj = {
      content: userInput.trim(),
      chatId: selectedUserForChat._id
    }

    if (!obj.content) {
      toast.warn('Write somthing to send', { position: toast.POSITION.BOTTOM_LEFT });
    }
    else {
      dispatch(sendMessage(obj));
    }
  }

  useEffect(() => {

    if (!sendMessageProcessing && !sendMessageFail && sendMessageSuccess) {
      console.log("success");
      setUserInput("");
    }

    if (!sendMessageProcessing && sendMessageFail && !sendMessageSuccess) {
      toast.error('Message not send. Try again.', { position: toast.POSITION.BOTTOM_LEFT });
    }

  }, [sendMessageSuccess, sendMessageFail, sendMessageProcessing])


  if (!selectedUserForChat) {
    return (
        <div className="flex flex-col h-4/5 mt-8 bg-primary-600 rounded-bl-lg rounded-br-lg px-4 py-2 pb-4">
          <div className="flex flex-col items-center justify-center h-full">
            <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
            <p className="text-white">Enjoy You Chat !</p>
          </div>
        </div>
    );
  }

  return (
    <>
      <ChatHeader />

      <div className="flex flex-col h-4/5 bg-primary-800 rounded-bl-lg rounded-br-lg px-4 py-2 pb-4">
        <div className="flex h-full flex-col max-h-[75vh] overflow-y-auto bg-primary-400 p-5 dark:bg-gray-800 rounded-lg mb-2">
          {/* Content within the div */}
          <div className="text-white">
            <Message type={'send'} />
            <Message type={'receave'} />
            <Message type={'send'} />
            <Message type={'receave'} />
            <Message type={'send'} />
            <Message type={'receave'} />
          </div>
        </div>

        <div className="relative mt-2">
          <input
            disabled={sendMessageProcessing}
            value={userInput}
            onChange={(e) => { setUserInput(e.target.value) }}
            type="text"
            className="border border-gray-300 bg-primary-50 text-primary-900 font-semibold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Type your message..."
          />
          <button type="button" className="absolute inset-y-0 right-10 px-8 py-2.7 text-primary-800 focus:outline-none">
            <BsEmojiSmile className="w-5 h-5" />
          </button>
          <button
            disabled={sendMessageProcessing}
            type="button"
            className="absolute inset-y-0  right-1 top-1 bottom-1 px-2.5 py-1 rounded-lg hover:bg-primary-700 bg-primary-800 text-primary-100 focus:outline-none"
            onClick={(e) => { handelSendMessage() }}
          >
            {sendMessageProcessing ? (
              <div className="flex items-center justify-center">
                <span className="mr-2">Sending</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            ) : (
              'Send'
            )}

          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
