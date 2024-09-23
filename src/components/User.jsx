import React from 'react'
import { useShortnerContext } from '../context/ContextProvider'

export default function User() {
    const { user } = useShortnerContext()
    
    if (user) return (
        <div className='w-full mt-6 flex items-center justify-center opacity-40'>
            <div className="profile w-fit border-btn rounded-lg flex items-center justify-center p-2   min-w-[350px] gap-1">
                <img src={user.photoURL} alt={user.displayName} style={{ height: '15px', width: '15px', borderRadius: '50%' }} />
                <p className='capitalize poppins tracking-wide text-md'>{user.displayName}</p> <span className='opacity-50'>&nbsp; &nbsp;   |  &nbsp; &nbsp;</span>
                <p className=' font-bold tracking-wide text-md flex items-center justify-center gap-2'> {user.email}</p>
            </div>
        </div>
    )
}
