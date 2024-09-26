import React from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import { IoCloseSharp } from "react-icons/io5";
import SigninGoogle from './SigninGoogle';
import SigninGithub from './SigninGithub';

export default function Login() {

    const { setBurger } = useShortnerContext()

    return (
        <div className='fixed z-50 top-0 w-full h-screen flex justify-center backdrop-blur-md'>
            <div className='flex flex-col gap-2 mt-[7rem] relative items-center justify-center w-[340px] h-[60vh]  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 rounded-xl'>
                <button className='absolute top-2 right-2 p-[2px] rounded-3xl text-3xl opacity-35 hover:opacity-60'
                    onClick={() => setBurger(false)}><IoCloseSharp /></button>
                <SigninGoogle />
                <p className='opacity-40 text-sm'>or</p>
                <SigninGithub />

            </div>
        </div>
    )
}
