import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'

import Menu from './Menu'
import Login from './Login'
import { useShortnerContext } from '../context/ContextProvider'

export default function Layout() {
    const { user, burger } = useShortnerContext()
    return (
        <div >
            {burger && !user ? <Login /> : burger && user ? <Menu /> : ''}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    )
}
