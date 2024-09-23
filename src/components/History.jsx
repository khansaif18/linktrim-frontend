import React, { useEffect, useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import axios from 'axios'
import { IoCopyOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import toast from 'react-hot-toast';
import Loader from './Loader';

export default function History() {

    const { user, userUrls, setUserUrls, isAuthenticating } = useShortnerContext()
    const [loading, setLoading] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setLoading(true)
        try {
            axios.get(`${API_URL}/v1/url/user-url/${user._id}`, { withCredentials: true })
                .then(res => {
                    setUserUrls(res.data)
                    setLoading(false)
                }).catch(err => {
                    toast.error('Something went wrong')
                    setLoading(false)
                })
        } catch (error) {
            // console.log('Error fetching user urls : ', error);
            toast.error('Something went wrong')
        }
    }, [isAuthenticating])



    if (loading) return <Loader relative />

    else return (
        <>
            {
                userUrls && userUrls.length < 1 ? <h2>No Recent Urls found 🤷‍♂️</h2> :
                    <div className='w-full'>
                        <h2 className='text-center text-xl mb-2 font-semibold tracking-wider min-w-[350px]'> Recent Generated Urls</h2>
                        <div className='flex flex-wrap items-center justify-center  rounded-md p-2 gap-2'>
                            {
                                userUrls && userUrls.map(url => (
                                    <div key={url._id} className='border-btn py-5 px-3 rounded-md w-[320px] gap-2 flex  items-center justify-center flex-col'>
                                        <div>
                                            <div className='text-gray-600 text-sm flex items-center justify-center gap-1'> short url <span className='text-[#ccc] '>{`https://linktrim-t8s2.onrender.com/{url.shortId}`.slice(0, 30)}..</span>
                                                <button className='mt-1 text-lg opacity-50 hover:opacity-100 duration-200'
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`https://linktrim-t8s2.onrender.com/short/${url.shortId}`)
                                                        toast.success('url copied to clipboard')
                                                    }}><IoCopyOutline /></button>
                                            </div>
                                            <div className='text-gray-600 text-sm flex items-center justify-center gap-2'>original   url <span className='text-[#cccc]'>{url.redirectUrl.slice(0, 20) + '..'}</span>
                                                <button className='mt-1 text-lg  opacity-50 hover:opacity-100 duration-200'
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(url.redirectUrl)
                                                        toast.success('url copied to clipboard')
                                                    }}><IoCopyOutline /></button>
                                            </div>
                                        </div>
                                        <div className='flex w-[80%] items-center justify-center gap-2 border-btn px-4 py-1 rounded-md tracking-wide opacity-70'>
                                            <TbBrandGoogleAnalytics />
                                            <p className='text-sm'>total visits : {url.visitHistory.length}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </>
    )
}
