import React from 'react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import { IoMdArrowBack, IoMdMore } from 'react-icons/io';
import { BiArchiveIn } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './components/Firebase';
import { motion } from 'framer-motion';

const Mail = () => {
  const { selectedEmails } = useSelector(store => store.appSlice);
  const navigate = useNavigate();
  const params = useParams();
  
  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, 'emails', id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-white rounded-xl mx-4 sm:mx-5 my-4 sm:my-5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 sm:py-4 border-b border-gray-200">
        {/* Action Icons */}
        <div className="flex flex-wrap items-center gap-2 text-gray-700">
          <div onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdArrowBack size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <BiArchiveIn size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineReport size="20px" />
          </div>
          <div onClick={() => deleteMailById(params.id)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdDeleteOutline size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineMarkEmailUnread size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineWatchLater size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineAddTask size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineDriveFileMove size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size="20px" />
          </div>
        </div>
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button className="hover:rounded-full hover:bg-gray-100 p-2">
            <MdKeyboardArrowLeft size="24px" />
          </button>
          <button className="hover:rounded-full hover:bg-gray-100 p-2">
            <MdKeyboardArrowRight size="24px" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium truncate">{selectedEmails?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2 py-1">Inbox</span>
          </div>
          <div className="text-gray-400 text-sm mt-2 sm:mt-0">
            <p>{new Date(selectedEmails?.createdAt?.seconds * 1000).toUTCString()}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm mt-4">
          <h1 className="truncate">{selectedEmails?.to}</h1>
          <span className="text-sm">to me</span>
        </div>
        <div className="my-6">
          <p className="whitespace-pre-wrap">{selectedEmails?.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Mail;
