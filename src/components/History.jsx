import React, { useEffect, useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import axios from 'axios'
import { IoCopyOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import toast from 'react-hot-toast';
import DeleteModal from './DeleteModal';
import Loader from './Loader';

export default function History() {

    const { userUrls, setIsAuthenticating, loading, setLoading } = useShortnerContext()
    const [showModal, setShowModal] = useState(false)
    const [urlId, setUrlId] = useState('')

    const API_URL = import.meta.env.VITE_API_URL;

    return (
        <>
            {loading ? <Loader relative /> :
                userUrls && userUrls.length < 1 ? <h2 className='font-bold tracking-wide mt-2 text-xl'>No Recent Urls found 🤷‍♂️</h2> :
                    <div className='w-full'>
                        <h2 className='text-center text-xl mb-2 font-semibold tracking-wider min-w-[350px]'> Recent Generated Urls</h2>
                        <div className='flex flex-wrap items-center justify-center  rounded-md p-2 gap-2'>
                            {
                                userUrls && userUrls.map(url => (
                                    <div key={url._id} className='border-btn py-5 px-3 rounded-md w-[320px] gap-2 flex  items-center justify-center flex-col opacity-60 hover:opacity-100 duration-100 cursor-default relative'>
                                        <div className='flex items-center justify-center w-full gap-2'>
                                            <div className='flex w-[65%] items-center justify-center gap-2 border-btn px-4 py-1 rounded-md tracking-wide opacity-70'>
                                                <TbBrandGoogleAnalytics />
                                                <p className='text-sm'>total visits : {url.visitHistory.length}</p>
                                            </div>
                                            <button className=' border-btn p-1 text-lg rounded-sm opacity-50 hover:opacity-100 duration-100'
                                                onClick={() => {
                                                    setShowModal(true)
                                                    setUrlId(url._id)
                                                }}
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                        <div>
                                            <div className='text-gray-600 text-sm flex items-center justify-center gap-1'> short url : <span className='text-[#ccc] '>{`${API_URL}/${url.shortId}`.slice(0, 30) + '..'}</span>
                                                <button className='mt-1 text-lg opacity-80 hover:opacity-100 duration-200'
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`${API_URL}/${url.shortId}`)
                                                        toast.success('url copied to clipboard')
                                                    }}><IoCopyOutline /></button>
                                            </div>
                                            <div className='text-gray-600 text-sm flex items-center justify-center gap-2'>original url :<span className='text-[#cccc]'>{url.redirectUrl.slice(0, 20) + '..'}</span>
                                                <button className='mt-1 text-lg  opacity-50 hover:opacity-100 duration-200'
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(url.redirectUrl)
                                                        toast.success('url copied to clipboard')
                                                    }}><IoCopyOutline /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
            {showModal ? <DeleteModal
                handelDelete={() => {
                    try {
                        setLoading(true)
                        axios.delete(`${API_URL}/api/v1/url/delete/${urlId}`)
                            .then(res => {
                                if (res.data.error) {
                                    toast.error(res.data.error)
                                }
                                toast.success(res.data.status)
                                setShowModal(false)
                                setIsAuthenticating(prev => !prev)
                            })
                            .catch(err => {
                                toast.error('could not delete url, try again')
                            })
                    } catch (error) {
                        toast.error('could not delete url, try again')
                    } finally {
                        setLoading(false)
                    }
                }}

                handleCancel={() => {
                    setShowModal(false)
                    setUrlId('')
                }}

            /> : ''}
        </>
    )
}
