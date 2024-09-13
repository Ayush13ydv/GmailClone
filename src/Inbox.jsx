import React, { useState } from 'react';
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import { GoTag } from 'react-icons/go';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Messages from './components/Messages';
import { useSelector } from 'react-redux';

const Inbox = () => {
  const [mailSelected, setMailSelected] = useState(0);
  const { emails } = useSelector(store => store.appSlice);
  
  const newButtons = [
    {
      icons: <MdInbox size={"20px"} />,
      text: "Primary"
    },
    {
      icons: <GoTag size={"20px"} />,
      text: "Promotions"
    },
    {
      icons: <FaUserFriends size={"20px"} />,
      text: "Social"
    },
  ];

  return (
    <div className='flex-1 bg-white rounded-xl mx-2 sm:mx-5'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2'>
        {/* Left Controls */}
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          <div className='flex items-center gap-1'>
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdRefresh size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdMore size={"20px"} />
          </div>
        </div>

        {/* Right Controls */}
        <div className='flex items-center gap-2 mt-2 sm:mt-0'>
          <p className='text-sm text-gray-500'>1-50 of {emails?.length}</p>
          <button className='p-2 rounded-full hover:bg-gray-100'>
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className='p-2 rounded-full hover:bg-gray-100'>
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>

      {/* Buttons and Messages */}
      <div className='h-[90vh] sm:h-[90vh] overflow-y-auto'>
        {/* Tabs */}
        <div className='flex flex-wrap items-center gap-1 border-b'>
          {newButtons.map((item, index) => (
            <button
              key={index}
              onClick={() => setMailSelected(index)}
              className={`flex items-center gap-5 px-4 py-2 w-full sm:w-auto ${mailSelected === index ? "border-b-4 border-b-blue-600 text-blue-600" : "border-b-4 border-b-transparent"} hover:bg-gray-100`}
            >
              {item.icons}
              <span>{item.text}</span>
            </button>
          ))}
        </div>

        {/* Messages List */}
        <Messages />
      </div>
    </div>
  );
}

export default Inbox;
