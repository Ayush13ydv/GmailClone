import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import GoogleButton from 'react-google-button'
import { auth, provider } from './Firebase'
import { useDispatch } from 'react-redux'
import { setUser } from './Redux/appSlice'

const Login = () => {
    const dispatch = useDispatch();

    const singInWithGoogle= async()=>{
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(setUser({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }));
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='we-screen h-screen flex items-center justify-center bg-gray-200'>
        <div className='p-8 bg-white flex flex-col gap-3 rounded-md'>
            <h1 className='text-center text-xl font-medium mb-5'>LOGIN</h1>
            <GoogleButton onClick={singInWithGoogle}/>
        </div>
      
    </div>
  )
}

export default Login
