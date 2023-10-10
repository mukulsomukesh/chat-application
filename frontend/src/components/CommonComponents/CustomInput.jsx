import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomInput = ({type, label, value, onChange, name, placeholder, required }) => {
  const location = useLocation();
  const isSignupOrSignin = location.pathname === '/signup' || location.pathname === '/signin';
 
  return (
    <div className={`${!isSignupOrSignin ? 'flex flex-row items-center mb-4' : ''}`}>
      <label htmlFor={name} className="w-32 text-sm font-medium text-primary-900 ">
        {label}
      </label>
      <input
      type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className="w-full bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default CustomInput;
