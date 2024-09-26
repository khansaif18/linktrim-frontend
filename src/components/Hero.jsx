import React from 'react'
import Urlform from './Urlform'
import { useShortnerContext } from '../context/ContextProvider'
import { IoCopyOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import FirstCallMessage from './FirstCallMessage';

export default function Hero() {

    document.title = 'LinkTrim ‧ Home'
    const { shortUrl, userUrls } = useShortnerContext()

    return (
        <div className='flex flex-col items-center justify-center w-full  pt-[6rem]  overflow-hidden'>
            <Urlform />
            {
                shortUrl && userUrls !== null ?
                    <div className='  '>
                        <h2 className='opacity-55 font-bold text-center mb-2'>Copy the short url below and share</h2>
                        <p className='border-btn py-2 px-1 rounded-md min-w-[340px] flex items-center justify-center gap-2 opacity-45 cursor-default'>{shortUrl} <button onClick={() => {
                            navigator.clipboard.writeText(shortUrl)
                            toast.success('url copied to clipboard')
                        }} className='opacity-45 hover:opacity-90 duration-200'><IoCopyOutline /></button></p>
                    </div> :
                    <h2 className='text-xl font-semibold opacity-40 tracking-wide '>Shorten you Long urls in seconds</h2>
            }
            <FirstCallMessage />
        </div>
    )
}
