import React, { useEffect, useState } from 'react'
import Message from './Message'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail } from './Redux/appSlice'

const Messages = () => {

const dispatch = useDispatch();
const {emails,searchText} = useSelector(store=>store.appSlice)
const[tempEmails,setTempEmails] = useState(emails);
  useEffect(()=>{
   const q = query(collection(db,'emails'),orderBy('createdAt','desc'))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
     const allEmails = snapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
   dispatch(setEmail(allEmails));
  })

  return()=>unsubscribe();
  },[])

  useEffect(()=>{
    const filteredItems = emails?.filter((email)=>{
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
    })  
    setTempEmails(filteredItems);
  },[searchText,emails])
  return (
    <div>
      {
        tempEmails && tempEmails.map((email)=> <Message key={email.id} email={email} />)
      }
     
     
    </div>
  )
}

export default Messages
