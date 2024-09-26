import React from 'react'
import { MdDashboard } from "react-icons/md";
import {  IoLogOutSharp, IoCloseSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { useShortnerContext } from '../context/ContextProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Menu() {

    const { user, logout, setIsAuthenticating, setBurger } = useShortnerContext()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className=
            ' fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-md flex  justify-center '>
            <div className="card relative overflow-hidden mt-[10rem] p-4 h-fit w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600  rounded-md pt-10">
                <button className='absolute top-[10px] right-2 p-[2px] rounded-3xl text-2xl duration-200 opacity-35 hover:opacity-60'
                    onClick={() => setBurger(false)}><IoCloseSharp /></button>
                <ul className="w-full p-3 flex flex-col gap-2">
                    {user ?
                        <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                            <div className="cursor-default p-16-semibold flex items-center size-full gap-4 p-4 group font-semibold rounded bg-cover bg-gray-900 hover:shadow-inner  focus:text-white text-[#ccc] transition-all ease-linear ">
                                <img src={user.photoURL} alt={user.displayName.slice(0, 1)} style={{ height: '25px', width: '25px', borderRadius: '50%' }} />
                                <b className='capitalize tracking-wider'>{user.displayName.length > 12 ? user.displayName.slice(0, 12) + '..' : user.displayName} </b>
                            </div>
                        </li> : ''}

                    {
                        location.pathname === '/dashboard' ?
                            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                                <button
                                    className="p-16-semibold flex items-center size-full gap-4 p-4 group font-semibold rounded bg-cover hover:bg-gray-800 hover:shadow-inner  focus:text-white text-[#ccc] transition-all ease-linear "
                                    onClick={() => {
                                        navigate('/')
                                        setBurger(false)
                                    }}>
                                    <span className='text-xl'><IoMdHome /></span>
                                    Home Page
                                </button>
                            </li> :
                            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                                <button
                                    className="p-16-semibold flex items-center size-full gap-4 p-4 group font-semibold rounded bg-cover hover:bg-gray-800 hover:shadow-inner  focus:text-white text-[#ccc] transition-all ease-linear "
                                    onClick={() => {
                                        navigate('/dashboard')
                                        setBurger(false)
                                    }}>
                                    <span className='text-xl'><MdDashboard /></span>
                                    Dashboard
                                </button>
                            </li>
                    }

                    <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
                        <button
                            className="p-16-semibold flex items-center size-full gap-4 p-4 group font-semibold rounded bg-cover hover:bg-gray-800 hover:shadow-inner  focus:text-white text-[#ccc] transition-all ease-linear"
                            onClick={() => {
                                try {
                                    logout()
                                        .then(() => {
                                            toast.success('logged out successfully')
                                            navigate('/')
                                            setBurger(false)
                                            setIsAuthenticating(prev => !prev)
                                        })
                                        .catch(() => toast.error("Could'nt logout, try again"))
                                } catch (error) {
                                    toast.error("Could'nt logout, try again")
                                }
                            }}>
                            <span className='text-xl'><IoLogOutSharp /></span>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    )
}
