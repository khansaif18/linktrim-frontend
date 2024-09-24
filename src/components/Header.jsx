import React, { useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';

export default function Header() {
    const { user, logout, setShowLogin } = useShortnerContext()
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(false)

    if (location.pathname === '/profile') {
        return (
            <div className='absolute top-0 letf-0 flex items-center justify-around py-4 w-full 
             '>
                <h1 className=' text-2xl font-extrabold tracking-wider cursor-pointer' onClick={() => navigate('/')}>LinkTrim</h1>

                <button className='relative cursor-pointer flex items-center justify-center py-2 px-6 rounded-3xl gap-1 border-btn opacity-55 hover:opacity-100 duration-200'
                    onClick={() => {
                        try {
                            setLoading(true)
                            logout()
                                .then(() => {
                                    setLoading(false)
                                    toast.success('Logged out successfully')
                                    navigate('/')
                                })
                                .catch(() => toast.error("Could'nt logout, try again"))
                        } catch (error) {
                            toast.error("Could'nt logout, try again")
                        }
                    }}>
                    <b className='capitalize w-[100px] flex items-center justify-center gap-2'> Logout {loading ? <Loader /> : <MdOutlineLogout />} </b>
                </button>
            </div>
        )
    }

    return (
        <div className='absolute top-0 letf-0 flex items-center justify-around py-4 w-full z-50 
          p-5'>
            <h1 className='text-2xl font-extrabold tracking-wider cursor-pointer' onClick={() => navigate('/')}>LinkTrim</h1>

            {user ?
                <div className='relative cursor-pointer flex items-center justify-evenly py-2 px-3 rounded-3xl gap-2 border-btn min-w-[80px]'
                    onClick={() => navigate('/profile')}>
                    <img src={user.photoURL} alt={user.photoURL} style={{ height: '20px', width: '20px', borderRadius: '50%' }} />
                    <b className='capitalize'>{user.displayName.split(' ')[0]} </b> <FaAngleRight />
                </div> :
                <button className="px-7 py-[5px] flex items-center gap-1 border-btn rounded-3xl tracking-wider opacity-50 hover:opacity-100 duration-200" onClick={() => setShowLogin(true)}
                    style={location.pathname === '/login' ? { opacity: '0' } : { opacity: '1' } && location.pathname === '/signup' ? { opacity: '0' } : { opacity: '1' }}
                >Login <MdLogin /> </button>
            }
        </div>
    )
}
