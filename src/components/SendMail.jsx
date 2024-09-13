import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from './Redux/appSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './Firebase';

const SendMail = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: ""
    });
    const open = useSelector(store => store.appSlice.open);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'emails'), {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            createdAt: serverTimestamp(),
        });
        dispatch(setOpen(false));
        setFormData({
            to: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className={`${open ? "block" : "hidden"} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md w-full md:w-auto`}>
            <div className='flex px-3 py-2 bg-[#F2F6FC] items-center justify-between rounded-t-md'>
                <h1 className='text-base'>New Message</h1>
                <div onClick={() => dispatch(setOpen(false))} className='p-2  rounded-full hover:bg-gray-200 cursor-pointer'>
                    <RxCross2 size={20} />
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
                <input 
                    onChange={changeHandler}  
                    value={formData.to} 
                    name='to' 
                    type="text" 
                    placeholder='Recipients' 
                    className='outline-none py-1 text-base w-full' 
                />
                <input 
                    onChange={changeHandler} 
                    value={formData.subject} 
                    name='subject' 
                    type="text" 
                    placeholder='Subject' 
                    className='outline-none py-1 text-base w-full' 
                />
                <textarea 
                    onChange={changeHandler} 
                    value={formData.message} 
                    name='message' 
                    cols="30" 
                    rows="10" 
                    className='outline-none py-1 text-base w-full resize-none' 
                ></textarea>
                <button className='bg-[#0B57D0] rounded-full w-full md:w-fit px-4 py-1 text-white font-medium text-base'>
                    Send
                </button>
            </form>
        </div>
    );
};

export default SendMail;
