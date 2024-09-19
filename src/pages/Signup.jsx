import React, { useEffect, useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

export default function Signup() {

    document.title = 'LinkTrim ‧ Signup'

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        cnfPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const { setIsAuthenticating, user } = useShortnerContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (formData.fullName && formData.email && formData.password && formData.cnfPassword) {
                if (formData.password === formData.cnfPassword) {
                    setLoading(true)
                    axios.post('/api/v1/user/signup', { fullName: formData.fullName, email: formData.email, password: formData.password })
                        .then(() => {
                            setIsAuthenticating(prev => !prev)
                            toast.success('Signed up successfully')
                            navigate('/')
                            setFormData({ fullName: '', email: '', password: '', cnfPassword: '' })
                            setLoading(false)
                        }).catch(err => {
                            toast.error(     'Error signing up, try again')
                            setLoading(false)
                        })
                } else {
                    toast.error('passwords does not match')
                }
            }
            else {
                toast.error('fill the required fields')
            }
        } catch (error) {
            toast.error('Error signing in, try again')
        }
    }

    useEffect(() => { user !== null ? navigate('/') : '' }, [])

    if (user) return navigate('/')

    return (
        <div className='login-form-cont min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 h-screen pt-5'>
            <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-5 min-h-[80vh] '>
                <h2 className='text-3xl font-bold opacity-50 tracking-normal'>Signup to LinkTrim</h2>
                <input
                    className='px-5 placeholder:opacity-50 py-3 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="text"
                    placeholder='Full Name*'
                    autoComplete='off'
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
                <input
                    className='px-5 placeholder:opacity-50 py-3 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="email"
                    placeholder='Email Address*'
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    className='px-5 py-3 placeholder:opacity-50 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="password"
                    placeholder='Password*'
                    autoCorrect='off'
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                    className='px-5 py-3 placeholder:opacity-50 rounded-lg w-[300px] outline-none bg-transparent border-btn'
                    type="text"
                    placeholder='Confirm Password*'
                    autoCorrect='off'
                    value={formData.cnfPassword}
                    onChange={e => setFormData({ ...formData, cnfPassword: e.target.value })}
                />
                <button type='submit' className='px-5 py-3 rounded-lg w-[300px] outline-none bg-transparent border-btn relative'>Sign Up {loading ? <Loader /> : ''}</button>
                <span className='text-sm text-[#cccc] decoration-gray-100'>already have an account? <button className='text-lg text-white' onClick={() => navigate('/login')}>login</button></span>
            </form>
        </div>
    )
}
