import React from 'react'
import Burger from './Burger'
import { useShortnerContext } from '../context/ContextProvider'
import Menu from './Menu'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const { user, burger } = useShortnerContext()
    const navigate = useNavigate()
    return (
        <div className=' fixed top-0 letf-0 w-full z-50 '>
            <nav className=' w-full flex items-center justify-around px-5 p-2  gap-10 z-50'>
                <button className='text-2xl font-bold tracking-wider'
                    onClick={() => navigate('/')}>
                    LinkTrim</button>
                <button>
                    <Burger />
                </button>
            </nav>
            {burger && !user ? <Login /> : burger && user ? <Menu /> : ''}
        </div>
    )
}
