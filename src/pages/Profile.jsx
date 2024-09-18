import React from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import User from '../components/User'
import History from '../components/History'

export default function Profile() {

     document.title = 'LinkTrim ‧ Profile'

    const navigate = useNavigate()
    const { user } = useShortnerContext()

    if (!user) return navigate('/login')
    return (
        <div className='pt-[5rem] flex items-center w-full flex-col gap-3 p-3'>
            <User />
            <History />
        </div>
    )
}
