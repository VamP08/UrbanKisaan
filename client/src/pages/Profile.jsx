import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentuser} = useSelector((state) => state.user);
  const handleSignout = () => {
    fetch('/server/auth/signout', {
        method: 'POST',
        credentials: 'include' // Ensure cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logged out successfully') {
            // Redirect to login page or show a success message
            window.location.href = '/sign-in';
        }
    })
    .catch(err => {
        console.error('Error signing out:', err);
    });
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <img src={currentuser.avatar} 
        alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        
        <span className='border p-3 rounded-lg'>{currentuser.username}</span>
        <span className='border p-3 rounded-lg'>{currentuser.email}</span>
        <span className='border p-3 rounded-lg'>{currentuser.cityname}</span>
        <span className='border p-3 rounded-lg'>{currentuser.usercontact}</span>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <button onClick={(handleSignout)} className='text-red-700 cursor-pointer'>Sign Out</button>
      </div>
      
    </div>
  )
}
