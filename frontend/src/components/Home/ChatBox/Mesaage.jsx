import React, { useEffect } from 'react';

export default function Message({ item }) {
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  let chatAlign =parsedData._id ===item.sender._id ? 'items-start' : 'items-end';


  return (
    <div className={`flex flex-col ${chatAlign}`}>
      {/* User */}
      <div className={`flex items-center gap-2 mb-2 ${parsedData._id ===item.sender._id? "flex-row-reverse": ""} `}>
        {/* Details */}
        <span className="text-primary-50 text-xs ">2 Hours</span>

          <span className={`text-lg font-bold  text-primary-50`}>
            {chatAlign ? 'You' : 'Other User'}
          </span>

        {/* Avatar */}
        <div className={`bg-primary-800 rounded-full w-9 h-9 flex items-center justify-center`}>
          <img alt="Pic" src="https://keenthemes.com/metronic/assets/media/avatars/300-1.jpg" className="w-7 h-7 rounded-full" />
        </div>
      </div>

      {/* Text */}
      <div className={`p-2 rounded bg-primary-50 text-sm text-primary-900  max-w-lg`} data-kt-element="message-text">
      {item.message}
      </div>
    </div>
  );
}
