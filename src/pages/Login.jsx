import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useShortnerContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

export default function Login() {

  document.title = 'LinkTrim ‧ Login'

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticating, user, signInWithGoogle } = useShortnerContext()
  const [loading, setLoading] = useState(false)

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     try {
  //         if (email && password) {
  //             setLoading(true)
  //             axios.post(`${API_URL}/v1/user/login`, { email, password }, { withCredentials: true })
  //                 .then(() => {
  //                     setIsAuthenticating(prev => !prev)
  //                     navigate('/')
  //                     setEmail('')
  //                     setPassword('')
  //                     toast.success('Logged in successfully')
  //                     setLoading(false)
  //                 }).catch(err => {
  //                     toast.error(err?.response?.data?.error || 'Error logging in, try again')
  //                     setLoading(false)
  //                 })
  //         }
  //         else toast.error('fill the required fields')
  //     } catch (error) {
  //         toast.error('Error logging in, try again')
  //     }
  // }

  // useEffect(() => { user !== null ? navigate('/') : '' }, [])


  return (
    // <div className='login-form-cont min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 h-screen pt-5'>
    //     <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-5 min-h-[80vh] '>
    //         <h1 className='text-3xl font-bold opacity-50 tracking-normal'>Login to LinkTrim</h1>
    //         <input
    //             className='px-5 placeholder:opacity-50 py-3 rounded-lg w-[300px] outline-none bg-transparent border-btn'
    //             type="email"
    //             placeholder='Email Address*'
    //             value={email}
    //             autoComplete='off'
    //             onChange={e => setEmail(e.target.value)}
    //         />
    //         <input
    //             className='px-5 py-3 placeholder:opacity-50 rounded-lg w-[300px] outline-none bg-transparent border-btn'
    //             type="password"
    //             placeholder='Password*'
    //             value={password}
    //             onChange={e => setPassword(e.target.value)}
    //         />
    //         <button type='submit' className=' relative border-btn  px-5 py-3 rounded-lg w-[300px]'>Log In
    //             {loading ? <Loader /> : ''}
    //         </button>
    //         <span className='text-sm text-[#cccc] decoration-gray-100'>Don't have an account? <button className='text-lg text-white' onClick={() => navigate('/signup')}>signup</button></span>
    //     </form>
    // </div>
    // <div className='flex w-full h-screen items-center justify-center'>
    //     <button onClick={() => {
    //         signInWithGoogle()
    //     }}>Sign With Google</button>
    // </div>
    <div className='flex w-full h-screen items-center justify-center '>

      <button className="google-button bg-transparent border-btn mt-[-5rem] text-white" onClick={() => {
        try {
          signInWithGoogle().then(() => {
            navigate('/')
            toast.success(user ? `Signed in as ${user?.displayName}` : 'Signed in successfully')
          })
        } catch (error) {
          toast.error('Could not log  in, try again')
        }
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
          <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
          <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
          <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
          <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  )
}
