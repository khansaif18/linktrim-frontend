import React, { useEffect } from 'react'
import { useShortnerContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import User from '../components/User'
import History from '../components/History'

export default function Dashboard() {

    document.title = 'LinkTrim ‧ Profile'

    const navigate = useNavigate()
    const { user, setBurger } = useShortnerContext()

    useEffect(() => {
        if (!user) {
            navigate('/')
            setBurger(true)
        }
    }, [])

    return (
        <div className='pt-[5rem] flex items-center w-full flex-col gap-3 p-3'>
            <User />
            <History />
        </div>
    )
}
