import React from 'react';

const CustomInput = ({ label, value, onChange, name, placeholder, required }) => (
  <div className="flex flex-row items-center mb-4">
    <label htmlFor={name} className="w-32 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default CustomInput;
