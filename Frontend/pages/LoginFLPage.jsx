import React, { useContext } from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {FLDataContext} from '../src/context/FLContext'
import { useNavigate } from 'react-router-dom'

const LoginFLPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [freelancer, setfreelancer] = useContext(FLDataContext)
  const navigate = useNavigate()

  const handleSubmit = async(e) =>
  {
    e.preventDefault()
    const freelancer = {
      email : email,
      password : password
    }

    console.log(freelancer)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/freelancers/login`, freelancer)
    console.log(response)
    if(response.status === 200)
    {
      const data = response.data
      localStorage.setItem('token', data.token)
      setfreelancer(data.freelancer)
      navigate('/fl/dashboard')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='bg-[#0c1324] h-screen w-screen flex items-center justify-center text-white'>
        <div className='rounded-xl border-white w-[25vw] h-[75vh] bg-[#19192f] shadow-lg'>
          <div className='text-white flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-[#6366F1] mt-12 mb-8'>HireSync</h1>

            <h2 className='text-3xl font-bold mb-4'>Welcome back</h2>

            <h3 className='text-lg text-gray-300'>Log in to your account to continue</h3>
          </div>

          <form 
          
          onSubmit={(e) => handleSubmit(e)}
          
          className='mt-15 w-[90%] m-10 mb-0'>
            
            <h3 className='mb-2 font-bold'>Email</h3>
            <i className="ri-mail-line absolute ri-2x p-2 pl-4"></i>

            <input 
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)} 
            type="text" 
            className='w-1/2 px-4 w-[95%] h-16 rounded-md bg-[#37374b] pl-15 text-lg ' 
            placeholder='john@gmail.com'/>

            <h3 className='mt-8 mb-2 bold-base font-bold'>Password</h3>
            
            <i className="ri-rotate-lock-line absolute ri-2x p-2 pl-4"></i>
            <input 
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password" 
            className='w-1/2 px-4 w-[95%] m h-16 rounded-md bg-[#37374b] pl-15 text-lg' 
            placeholder='********' /> 

            <button className=' text-lg text-black mt-8 h-15 w-[95%] bg-[#A0A3FF] rounded-md'>Sign In</button>

          </form>

          <p className='p-30 text-lg'>Don't have an Account? <Link className='hover:underline font-bold' to="/register " >Register</Link> 
          </p>

        </div>
    </div>
  )
}

export default LoginFLPage
