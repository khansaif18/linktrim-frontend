import React, { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider, githubProvider } from '../firebase'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const ShortnerContext = createContext()

export const useShortnerContext = () => {
    return useContext(ShortnerContext)
}

export default function ContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [shortUrl, setShortUrl] = useState('')
    const [userUrls, setUserUrls] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [burger, setBurger] = useState(false)


    const API_URL = import.meta.env.VITE_API_URL;

    async function signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        } catch (error) {
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

    async function signInWithGithub() {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const signedInUser = result.user;
            setUser(signedInUser);
        } catch (error) {
            console.log('github auth error :', error.message);
        }
    };

    function logout() {
        setUser(null)
        setShortUrl('')
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setUser(user)
                setIsAuthenticating(prev => !prev)
            } catch (error) {
                console.log(error.message);
            }
        })
        return unsubscribe
    }, [])


    useEffect(() => {
        if (user) {
            try {
                setLoading(true)
                axios.get(`${API_URL}/api/v1/url/user-url/${user.uid}`, { withCredentials: true })
                    .then(res => {
                        setUserUrls(res.data)
                    })
            } catch (error) {
                toast.error('Something went wrong')
            } finally {
                setLoading(false)
            }
        }
    }, [isAuthenticating])

    const values = { user, setUser, burger, setBurger, isAuthenticating, setIsAuthenticating, shortUrl, setShortUrl, userUrls, loading, setLoading, showLogin, setShowLogin, setUserUrls, signInWithGoogle, signInWithGithub, logout }

    return (
        <ShortnerContext.Provider value={values}>
            {children}
        </ShortnerContext.Provider>
    )
}
