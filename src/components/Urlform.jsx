import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function Urlform() {

    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const { user, setShortUrl, setIsAuthenticating, setBurger } = useShortnerContext()
    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = (e) => {
        e.preventDefault()
        if (url) {
            if (user) {
                try {
                    setLoading(true)
                    axios.post(`${API_URL}/api/v1/url`, { url, userId: user.uid }, { withCredentials: true })
                        .then((res) => {
                            setShortUrl(`${API_URL}/${res.data.id}`)
                            setUrl('')
                            setLoading(false)
                            setIsAuthenticating(prev => !prev)
                        })
                        .catch(err => {
                            toast.error('Some error occured, try again')
                            setLoading(false)
                        })
                } catch (error) {
                    toast.error('Some error occured, try again')
                    setLoading(false)
                }
            } else {
                setBurger(true)
                toast.error('please login first..')
            }
        }
        else toast.error('enter a valid long url')
    }

    return (
        <form onSubmit={handleSubmit} className=' rounded-xl p-6 flex flex-col items-center max-w-[90vw] justify-center mt-5 gap-3 '>
            <label htmlFor='url' className=' opacity-30 w-full ml-5 tracking-wide font-bold'>Paste your long link here</label>
            <input
                className='px-5 py-3 rounded-lg w-[350px] outline-none bg-transparent border-btn placeholder:opacity-30 max-w-[95%]'
                id='url'
                type="text"
                placeholder='https://www.example.com/long-url'
                value={url}
                autoComplete='off'
                onChange={e => setUrl(e.target.value)}
            />
            <button type='submit' className='border-btn relative font-bold tracking-wide opacity-40 hover:opacity-100 duration-200 px-5 py-3 rounded-lg w-[350px] max-w-[95%]'>Get Short Url {loading ? <Loader /> : ""}</button>
        </form>
    )
}
