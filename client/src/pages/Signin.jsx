import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/user.Slice.js';

export default function Signin() {
  const [formdata, setformdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the error when component mounts
    dispatch(signInFailure(null));
  }, [dispatch]);

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/server/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message || 'Sign in failed'));
        return;
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
        console.error('Token not found in response');
        dispatch(signInFailure('Token not found in response'));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      dispatch(signInFailure(error.message || 'An error occurred during sign in'));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-centre font-semibold my-7'>Sign in</h1>
      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email'
        className='border p-3 rounded-lg' id='email'
        onChange={handlechange} />
        <input type='password' placeholder='Password'
        className='border p-3 rounded-lg' id='password'
        onChange={handlechange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading  ? 'Loading...' : 'Sign in'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}> <span className='text-blue-700'>Sign Up</span> </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}