import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
  const {currentuser} = useSelector(state => state.user);
    return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w mx-auto'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>URBAN</span>
                <span className='text-slate-700'>KISAN</span>
            </h1> 
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                {currentuser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentuser.avatar} alt='profile'/>
                ) : ( 
                <li className='hidden sm:inline text-slate-700 hover:underline'>Sign in</li>
                )}
                </Link>
            </ul>
        </div>
    </header>
  );
}
