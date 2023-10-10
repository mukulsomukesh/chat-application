import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

const Badge = ({ label, userId, removeUser }) => {

  return (
    <span className="inline-flex items-center m-2 px-2 py-1 mr-2 text-sm font-medium text-primary-800 bg-primary-100 rounded ">
      {label}
      <button onClick={(e) => { removeUser(userId) }} type="button" className="inline-flex items-center p-0.5 ml-2 text-sm text-primary-400 bg-transparent rounded-sm hover:bg-primary-200 hover:text-primary-900 " aria-label="Remove">
        <MdOutlineCancel className="w-3.5 h-3.5" />
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  );
};

export default Badge;
