import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/user.Slice.js';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Dispatch the signOut action to clear the Redux state
    dispatch(signOut());
    navigate('/')
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <img src={currentUser.avatar} 
        alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        
        <span className='border p-3 rounded-lg'>{currentUser.username}</span>
        <span className='border p-3 rounded-lg'>{currentUser.email}</span>
        <span className='border p-3 rounded-lg'>{currentUser.cityname}</span>
        <span className='border p-3 rounded-lg'>{currentUser.usercontact}</span>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <button onClick={(handleSignout)} className='text-red-700 cursor-pointer'>Sign Out</button>
      </div>
      
    </div>
  )
}
