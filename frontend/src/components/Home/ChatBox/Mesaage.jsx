import React from 'react';

export default function Message({ item }) {
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  const chatAlign = parsedData._id === item.sender._id ? 'items-end' : 'items-start';

  const createdAt = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex flex-col ${chatAlign} mt-4`}>
      {/* User */}
      <div className={`flex  gap-2 mb-2 ${parsedData._id !== item.sender._id ? 'flex-row-reverse' : ''}`}>
        {/* Text */}
        <div className={`${parsedData._id !== item.sender._id ? "text-left " : "text-right"}`}>
        <div className={`p-2  bg-primary-800 text-primary-50 text-sm max-w-lg  ${parsedData._id !== item.sender._id ? 'rounded-r-lg rounded-tl-lg' : 'rounded-l-lg rounded-tr-lg'}`} data-kt-element="message-text">
          {item.message}
        </div>
              {/* Time */}
      <span className="text-primary-50  text-xs mt-1 px-1 ">{createdAt}</span>

        </div>
        {/* Avatar */}
        <div className={`bg-primary-50 rounded-full w-9 h-9 flex items-center justify-center`}>
          <img
            alt="Pic"
            src="https://keenthemes.com/metronic/assets/media/avatars/300-1.jpg"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

    </div>
  );
}
