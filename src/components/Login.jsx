import React from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import { IoCloseSharp } from "react-icons/io5";
import SigninGoogle from './SigninGoogle';
import SigninGithub from './SigninGithub';

export default function Login() {

    const { setShowLogin } = useShortnerContext()

    return (
        <div className='fixed top-[15%]  overflow-hidden min-h-[60vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 z-30 w-[340px] rounded-xl'>
            <div className='flex flex-col gap-2 border-btn relative items-center justify-center min-h-[60vh] rounded-xl'>
                <button className='absolute top-2 right-2 p-[2px] rounded-3xl text-3xl hover:bg-gray-600 duration-200 opacity-35 hover:opacity-60'
                    onClick={() => setShowLogin(false)}><IoCloseSharp /></button>
                {/* <h1 className='font-bold tracking-wide mb-4 text-lg'>Sign in with your Account!</h1> */}

                <SigninGoogle />
                <p className='opacity-40 text-sm'>or</p>
                <SigninGithub />

            </div>
        </div>
    )
}
