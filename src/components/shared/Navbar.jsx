import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { TbSettings2 } from "react-icons/tb";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setUser } from '../Redux/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [input, setInput] = useState("");
  const { user } = useSelector(store => store.appSlice);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input]);

  return (
    <div className='flex items-center justify-between mx-3 h-16 flex-wrap'>
      <div className='flex items-center gap-10 flex-shrink-0'>
        <div className='flex items-center gap-2 mx-5'>
         
          <img className='w-12' src='https://d3faj0w6aqatyx.cloudfront.net/uploads/2020/10/07113122/gmail-1.jpg' alt="Gmail" />
          <h1 className='text-gray-500 font-medium text-xl'>Gmail</h1>
        </div>
      </div>
      
      <div className='flex-1 flex items-center gap-4 ml-4 max-w-full md:max-w-[500px]'>
        {/* Search Box */}
        <div className='flex items-center bg-[#EAF1F8] px-2 py-1 rounded-full flex-1'>
          <IoIosSearch size={"24px"} className='text-gray-700' />
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search Mail' className='rounded-full w-full bg-transparent outline-none px-2 py-1' />
        </div>
        
        {/* User Profile */}
        <div className='flex-none'>
          <Avatar onClick={() => setToggle(!toggle)} src={user?.photoURL} size="40" round={true} />
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className='absolute right-2 z-20 shadow-lg bg-white rounded-md'>
                <p onClick={signOutHandler} className='p-2 underline'>LogOut</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
