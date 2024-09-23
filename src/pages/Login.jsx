import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useShortnerContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

export default function Login() {

    document.title = 'LinkTrim ‧ Login'

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setIsAuthenticating, user } = useShortnerContext()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (email && password) {
                setLoading(true)
                axios.post(`${API_URL}/v1/user/login`, { email, password }, { withCredentials: true })
                    .then(() => {
                        setIsAuthenticating(prev => !prev)
                        navigate('/')
                        setEmail('')
                        setPassword('')
                        toast.success('Logged in successfully')
                        setLoading(false)
                    }).catch(err => {
                        toast.error(err?.response?.data?.error || 'Error logging in, try again')
                        setLoading(false)
                        console.log('login error :', err.message);

                    })
            }
            else toast.error('fill the required fields')
        } catch (error) {
            toast.error('Error logging in, try again')
        }
    }

    useEffect(() => { user !== null ? navigate('/') : '' }, [])


    return (
        <div className='login-form-cont min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 h-screen pt-5'>
            <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-5 min-h-[80vh] '>
                <h1 className='text-3xl font-bold opacity-50 tracking-normal'>Login to LinkTrim</h1>
                <input
                    className='px-5 placeholder:opacity-50 py-3 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="email"
                    placeholder='Email Address*'
                    value={email}
                    autoComplete='off'
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className='px-5 py-3 placeholder:opacity-50 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="password"
                    placeholder='Password*'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type='submit' className=' relative border-btn  px-5 py-3 rounded-lg w-[300px]'>Log In
                    {loading ? <Loader /> : ''}
                </button>
                <span className='text-sm text-[#cccc] decoration-gray-100'>Don't have an account? <button className='text-lg text-white' onClick={() => navigate('/signup')}>signup</button></span>
            </form>
        </div>
    )
}
