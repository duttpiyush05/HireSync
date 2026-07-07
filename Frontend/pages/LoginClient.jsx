import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginClientPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { client, setclient } = useContext(ClientDataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const client = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/clients/login`, client)
      console.log(response)
      if (response.status === 201) {
        const data = response.data
        localStorage.setItem('token', data.token)
        setclient(data.client)
        console.log(data.client)
        toast.success("Login Sucessfully", {
          hideProgressBar: true
        })
        navigate('/client/dashboard')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message)

      const errors = err?.response?.data?.errors
      if (errors) {
        toast.error(errors[0].msg)
      }
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='bg-[#0c1324] min-h-screen w-full text-white flex items-center justify-center px-4 py-8 sm:py-10'>

      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#1e2230] shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>

        {/* LEFT — brand / hero panel */}
        <div className='relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#2b2470] via-[#1f2261] to-[#3a1f5e] overflow-hidden'>

          <div className='absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl'></div>
          <div className='absolute bottom-0 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl'></div>

          <Link to='/' className='relative z-10 text-3xl font-extrabold whitespace-nowrap'>HireSync</Link>

          <div className='relative z-10'>
            <h1 className='text-3xl font-bold leading-tight mb-4'>
              Hire the right talent, faster.
            </h1>
            <p className='text-white/80 text-base leading-relaxed max-w-sm'>
              Sign in to post jobs, review proposals, and manage every contract from one dashboard.
            </p>

            <div className='mt-8 flex flex-col gap-3'>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0'>
                  <i className="ri-user-search-line text-lg"></i>
                </div>
                <p className='text-sm text-white/90'>Access vetted, top-rated freelancers</p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0'>
                  <i className="ri-chat-3-line text-lg"></i>
                </div>
                <p className='text-sm text-white/90'>Message candidates in real time</p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0'>
                  <i className="ri-shield-check-line text-lg"></i>
                </div>
                <p className='text-sm text-white/90'>Secure contracts and milestone payments</p>
              </div>
            </div>
          </div>

          <p className='relative z-10 text-xs text-white/60'>© {new Date().getFullYear()} HireSync. All rights reserved.</p>
        </div>

        {/* RIGHT — form panel */}
        <div className='bg-[#111827] flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 sm:py-14'>

          {/* Mobile-only logo */}
          <Link to='/' className='lg:hidden text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#a5a8ff] via-[#c7c9ff] to-[#a855f7] bg-clip-text text-transparent'>
            HireSync
          </Link>

          <div className='mb-8 sm:mb-10 text-center lg:text-left'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Welcome back</h2>
            <p className='text-sm sm:text-base text-gray-400'>Log in to your client account to continue</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className='w-full'>

            <label className='block text-sm font-semibold text-gray-300 mb-2'>Email</label>
            <div className='relative mb-5'>
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500"></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className='w-full h-12 sm:h-14 rounded-xl bg-[#0c1324] border border-[#1e2230] pl-12 pr-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                placeholder='john@gmail.com'
              />
            </div>

            <label className='block text-sm font-semibold text-gray-300 mb-2'>Password</label>
            <div className='relative mb-2'>
              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500"></i>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className='w-full h-12 sm:h-14 rounded-xl bg-[#0c1324] border border-[#1e2230] pl-12 pr-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                placeholder='********'
              />
            </div>

            <button
              type='submit'
              className='mt-6 sm:mt-8 h-12 sm:h-14 w-full rounded-xl font-semibold text-base text-white bg-gradient-to-r from-[#6366F1] to-[#a855f7] hover:opacity-90 transition-opacity cursor-pointer'
            >
              Sign In
            </button>

          </form>

          <div className='mt-8 sm:mt-10 flex flex-col gap-2.5 text-center'>
            <p className='text-sm sm:text-base text-gray-400'>
              Don't have an account?{' '}
              <Link className='text-[#a5a8ff] hover:underline font-semibold' to="/client/register">Register</Link>
            </p>
            <p className='text-sm sm:text-base text-gray-400'>
              Want to login as Freelancer?{' '}
              <Link className='text-[#a5a8ff] hover:underline font-semibold' to="/fl/login">Click here</Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default LoginClientPage