import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//import { assets } from '../assets/assets';
import { X, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx'; 
import { useUser , SignIn} from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const {user} = useUser();

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav>
        <img className='cursor-pointer w-32 sm:w-40' 
          src="/assets/logo.svg" 
          alt="" 
          onClick={() => navigate('/')} 
        />
        {sidebar ? (
          <X 
            onClick={() => setSidebar(false)} 
            className='w-6 h-6 text-gray-600 sm:hidden' 
          />
        ) : (
          <Menu 
            onClick={() => setSidebar(true)} 
            className='w-6 h-6 text-gray-600 sm:hidden' 
          />
        )}
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} /> {/* ✅ Proper casing */}
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet />
        </div>
      </div>
    </div>
  ) :
  <div className='flex items-center justify-center h-screen bg-gray-100'>
    <SignIn/>
  </div>;
};

export default Layout;
