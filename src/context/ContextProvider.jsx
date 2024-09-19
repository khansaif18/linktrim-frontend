import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const ShortnerContext = createContext()

export const useShortnerContext = () => {
    return useContext(ShortnerContext)
}

export default function ContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [shortUrl, setShortUrl] = useState('')
    const [userUrls, setUserUrls] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const parseJwt = (token) => {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                return JSON.parse(jsonPayload);
            };
            const decodedToken = parseJwt(token);
            setUser(decodedToken)

        }
    }, [isAuthenticating]);

    const values = { user, setUser, setIsAuthenticating, shortUrl, setShortUrl, userUrls, setUserUrls}

    return (
        <ShortnerContext.Provider value={values}>
            {children}
        </ShortnerContext.Provider>
    )
}
