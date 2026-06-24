import React, { useContext } from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {ClientDataContext} from '../src/context/ClientContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginClientPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {client, setclient} = useContext(ClientDataContext)
  const navigate = useNavigate()

  const handleSubmit = async(e) =>
  {
    e.preventDefault()
    const client = {
      email : email,
      password : password
    }

    try
    {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/clients/login`, client)
        console.log(response)
        if(response.status === 201)
        {
          const data = response.data
          localStorage.setItem('token', data.token)
          setclient(data.client)
          console.log(data.client)
          toast.success("Login Sucessfully" ,{
            hideProgressBar : (true)
          })
          navigate('/client/dashboard')
        }
    }catch(err)
    {
      toast.error(err?.response?.data?.message)

      const errors = err?.response?.data?.errors     

      if(errors)
      {
        toast.error(errors[0].msg)
      }
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='bg-[#0c1324] h-screen flex justify-center items-center w-screen text-white'>

      <div className='absolute w-full h-20 pl-25 self-start mt-[4rem]'>
                  <Link to='/' className='text-4xl font-bold '>HireSync</Link>
              </div>

        <div className='rounded-xl border-white w-[40em] h-[75vh] bg-[#19192f] shadow-lg p-auto flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold mb-10'>Login as Client</h2>
          <div className='text-white flex flex-col justify-center items-center'>


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

            <button className=' text-lg text-black mt-8 h-15 w-[95%] bg-[#A0A3FF] rounded-md cursor-pointer'>Sign In</button>

          </form>

          <div
          className='mt-20 flex flex-col gap-2 justify-center'>
            <p className=' text-lg'>Don't have an Account? <Link className='hover:underline font-bold' to="/client/register " >Register</Link> 
          </p>
            <p className=' text-lg'>Want to login as Freelancer? <Link className='hover:underline font-bold' to="/fl/login " >Click here</Link> 
          </p>
          </div>

        </div>
    </div>
  )
}

export default LoginClientPage
