import React from 'react'
import UserDetails from './UserDetails'

export default function ChatHeader() {
  return (
    <div className='flex mt-1 justify-between items-center h-12 text-primary-50 bg-primary-800 rounded-tl-lg rounded-tr-lg  px-4' >
        
        <h1 className='text-2xl ml-2'> name of group </h1>

        <UserDetails />

    </div>
  )
}
