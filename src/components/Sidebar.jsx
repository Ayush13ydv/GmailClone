import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from 'react-icons/md';
import { TbSend2 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpen } from './Redux/appSlice';

const items = [
  {
    icons: <LuPencil size={"24px"} />,
    text: "Inbox",
  },
  {
    icons: <IoMdStar size={"24px"} />,
    text: "Starred",
  },
  {
    icons: <MdOutlineWatchLater size={"24px"} />,
    text: "Snoozed",
  },
  {
    icons: <TbSend2 size={"24px"} />,
    text: "Sent",
  },
  {
    icons: <MdOutlineDrafts size={"24px"} />,
    text: "Drafts",
  },
  {
    icons: <MdOutlineKeyboardArrowDown size={"24px"} />,
    text: "More",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility on mobile
  const dispatch = useDispatch();

  return (
    <>
  
      {/* Toggle button for mobile */}
      <button 
        className='sm:hidden p-1 rounded-full fixed top-3 left-[-7] text-gray-800  text-gray z-50 text-2xl'
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed sm:static ${isSidebarOpen ? 'left-0' : '-left-full'} sm:left-0 top-0 h-full w-[70%] sm:w-[15%] md:w-[13%] bg-white shadow-lg transition-all duration-300 z-40`}>
        <div className='p-3'>
          <button 
            onClick={() => dispatch(setOpen(true))} 
            className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF]'
          >
            <LuPencil size={"23px"} />
            <span className={`${isSidebarOpen ? 'inline' : 'hidden sm:inline'}`}>Compose</span>
          </button>
        </div>

        <div className='text-gray-500'>
          {
            items.map((products, index) => (
              <div 
                key={index} 
                className='flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200 my-2'>
                {products.icons}
                <span className={`${isSidebarOpen ? 'inline' : 'hidden sm:inline'}`}>{products.text}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Background overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
