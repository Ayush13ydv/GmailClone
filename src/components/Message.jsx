import React from 'react';
import { MdCropSquare } from 'react-icons/md';
import { RiStarSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail } from './Redux/appSlice';
import { motion } from 'framer-motion';

const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={openMail}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3 flex-shrink-0 mb-2 sm:mb-0">
        <MdCropSquare className="w-5 h-5 text-gray-400" />
        <RiStarSLine className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="flex-1 min-w-0 ml-3">
        <h1 className="font-semibold text-gray-800 truncate">{email?.to}</h1>
        <p className="text-gray-600 text-sm truncate">{email?.message}</p>
      </div>
      <div className="flex-shrink-0 text-gray-500 text-xs mt-2 sm:mt-0 sm:mx-10 sm:ml-3">
        <p>{new Date(email?.createdAt?.seconds * 1000).toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default Message;
