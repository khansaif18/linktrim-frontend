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
    const { user, setIsAuthenticating, setUser, setShortUrl } = useShortnerContext()
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(false)

    if (location.pathname === '/profile') {
        return (
            <div className='absolute top-0 letf-0 flex items-center justify-around py-4 w-full 
             '>
                <h1 className=' text-xl font-extrabold tracking-wide cursor-pointer' onClick={() => navigate('/')}>LinkTrim</h1>

                <button className='relative cursor-pointer flex items-center justify-center py-2 px-6 rounded-3xl gap-1 border-btn opacity-55 hover:opacity-100 duration-200'
                    onClick={() => {
                        try {
                            setLoading(true)
                            axios.get('https://linktrim-t8s2.onrender.com/api/v1/user/logout')
                                .then(() => {
                                    setIsAuthenticating(prev => !prev)
                                    setUser(null)
                                    setShortUrl('')
                                    navigate('/login')
                                    toast.success('Logged out successfully')
                                    setLoading(false)
                                })
                        } catch (error) {
                            toast.error("Could'nt logout, try again")
                            setLoading(false)
                        }
                    }}>
                    <b className='capitalize w-[80px] flex items-center justify-center gap-2'> Logout {loading ? <Loader /> : <MdOutlineLogout /> } </b> 
                </button>
            </div>
        )
    }

    return (
        <div className='absolute top-0 letf-0 flex items-center justify-around py-4 w-full z-50 
          p-5'>
            <h1 className='text-xl font-extrabold tracking-wide cursor-pointer' onClick={() => navigate('/')}>LinkTrim</h1>

            {user ?
                <div className='relative cursor-pointer flex items-center justify-evenly py-2 px-3 rounded-3xl gap-2 border-btn min-w-[80px]'
                    onClick={() => navigate('/profile')}>
                    <img src={user.profileImageUrl} alt={user.fullName} style={{ height: '20px', width: '20px', borderRadius: '50%' }} />
                    <b className='capitalize'>{user.fullName} </b> <FaAngleRight />
                </div> :
                <button className="px-7 py-[5px] flex items-center gap-1 border-btn rounded-3xl tracking-wider opacity-50 hover:opacity-100 duration-200" onClick={() => navigate('/login')}
                    style={location.pathname === '/login' ? { opacity: '0' } : { opacity: '1' } && location.pathname === '/signup' ? { opacity: '0' } : { opacity: '1' }}
                >Login <MdLogin /> </button>
            }
        </div>
    )
}
