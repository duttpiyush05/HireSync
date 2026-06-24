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
    <div className='bg-[#0c1324] min-h-screen flex flex-col items-center justify-center w-full text-white px-4 py-10'>

      <div className='w-full sm:absolute sm:top-0 sm:left-0 sm:h-20 sm:pl-10 lg:pl-16 sm:mt-8 mb-6 sm:mb-0 text-center sm:text-left'>
        <Link to='/' className='text-2xl sm:text-3xl lg:text-4xl font-bold'>HireSync</Link>
      </div>

      <div className='rounded-xl w-full max-w-[40em] min-h-fit sm:h-[75vh] bg-[#19192f] shadow-lg p-6 sm:p-2 flex flex-col justify-center items-center'>

        <h2 className='text-xl sm:text-2xl font-bold mb-6 sm:mb-10'>Client Login</h2>

        <div className='text-white flex flex-col justify-center items-center text-center'>
          <h2 className='text-2xl sm:text-4xl font-bold mb-3 sm:mb-4'>Welcome back</h2>
          <h3 className='text-sm sm:text-lg text-gray-300'>Log in to your account to continue</h3>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className='mt-8 sm:mt-12 w-full sm:w-[90%]'
        >

          <h3 className='mb-2 font-bold text-sm sm:text-base'>Email</h3>
          <div className='relative'>
            <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl"></i>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className='w-full h-12 sm:h-16 rounded-md bg-[#37374b] pl-12 sm:pl-14 pr-4 text-sm sm:text-lg'
              placeholder='john@gmail.com'
            />
          </div>

          <h3 className='mt-6 sm:mt-8 mb-2 font-bold text-sm sm:text-base'>Password</h3>
          <div className='relative'>
            <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl"></i>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className='w-full h-12 sm:h-16 rounded-md bg-[#37374b] pl-12 sm:pl-14 pr-4 text-sm sm:text-lg'
              placeholder='********'
            />
          </div>

          <button
            type='submit'
            className='text-sm sm:text-lg text-black mt-6 sm:mt-8 h-12 sm:h-15 w-full bg-[#A0A3FF] rounded-md cursor-pointer font-semibold hover:bg-[#8b8ff5] transition-colors'
          >
            Sign In
          </button>

        </form>

        <div className='mt-8 sm:mt-12 flex flex-col gap-2 justify-center text-center'>
          <p className='text-sm sm:text-lg'>
            Don't have an Account?{' '}
            <Link className='hover:underline font-bold' to="/client/register">Register</Link>
          </p>
          <p className='text-sm sm:text-lg'>
            Want to login as Freelancer?{' '}
            <Link className='hover:underline font-bold' to="/fl/login">Click here</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginClientPage