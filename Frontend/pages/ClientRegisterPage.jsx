import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import registerImage from '../src/assets/register.png'
import { ClientDataContext } from '../src/context/ClientContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contactno, setContactno] = useState('')
  const [gender, setGender] = useState('')
  const [check, setcheck] = useState(false)

  const { client, setclient } = useContext(ClientDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const clientData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      contactno: contactno,
      gender: gender
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/clients/register`, clientData)
      if (response.status === 201) {
        const data = response.data
        setclient(data.client)
        localStorage.setItem('token', data.token)
        navigate('/client/dashboard')
      }
    } catch (err) {
      console.log(err.response.data)
    }

    setfirstname('')
    setlastname('')
    setEmail('')
    setPassword('')
    setContactno('')
    setGender('')
    setcheck(false)
  }

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden'>

      {/* Left Panel */}
      <div className='hidden lg:flex lg:w-1/2 relative text-white flex-shrink-0 flex-col justify-between min-h-screen'>
        <img className='absolute inset-0 h-full w-full object-cover' src={registerImage} alt="" />

        {/* Logo */}
        <div className='relative z-10 pt-8 pl-10 xl:pl-16'>
          <Link to='/' className='text-3xl xl:text-4xl font-bold'>HireSync</Link>
        </div>

        {/* Bottom Text */}
        <div className='relative z-10 pb-10 px-10 xl:px-16'>
          <h1 className='text-xl xl:text-4xl 2xl:text-[6rem] leading-tight font-bold'>
            Elevate your professional trajectory.
          </h1>
          <div className='w-[90%] mt-4'>
            <h3 className='text-sm xl:text-base 2xl:text-2xl leading-relaxed text-gray-300'>
              Access exclusive contracts with top-tier enterprise clients in a
              streamlined, developer-first workspace engineered for high-performance talent.
            </h3>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className='lg:hidden w-full bg-[#0c1324] text-white px-6 pt-6 pb-4'>
        <Link to='/' className='text-2xl sm:text-3xl font-bold'>HireSync</Link>
      </div>

      {/* Right Panel */}
      <div className='w-full lg:w-1/2 bg-[#0c1324] text-white px-6 sm:px-10 md:px-16 lg:px-12 xl:px-20 py-8 lg:py-12 overflow-y-auto'>

        <h1 className='text-2xl sm:text-3xl xl:text-4xl mb-2 font-bold'>Create an Account</h1>
        <h4 className='text-sm sm:text-base lg:text-lg text-gray-400'>
          Select your primary role to customize your onboarding.
        </h4>

        {/* Role Cards */}
        <div className='flex w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] mt-6 gap-4 mb-6'>
          <div
            className='flex-1 p-4 sm:p-5 rounded-xl bg-[#19192f] cursor-pointer'
            onClick={() => navigate('/register')}
          >
            <h2 className='mb-2 text-xl sm:text-2xl'><i className="ri-suitcase-line"></i></h2>
            <h3 className='font-bold mb-1 sm:mb-2 text-sm sm:text-base'>Join as Freelancer</h3>
            <h4 className='text-xs sm:text-sm text-gray-300'>Find high-end contracts and manage projects.</h4>
          </div>

          <div
            className='flex-1 p-4 sm:p-5 rounded-xl bg-[#19192f] border-3 border-[#33336e] cursor-pointer'
            onClick={() => navigate('/client/register')}
          >
            <h2 className='mb-2 text-xl sm:text-2xl'><i className="ri-building-line"></i></h2>
            <h3 className='font-bold mb-1 sm:mb-2 text-sm sm:text-base'>Join as Client</h3>
            <h4 className='text-xs sm:text-sm text-gray-300'>Hire vetted experts for your enterprise needs.</h4>
          </div>
        </div>

        <form onSubmit={(e) => { submitHandler(e) }}>

          {/* Name Row */}
          <div className='w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] flex gap-4'>
            <div className='w-1/2'>
              <h2 className='py-2 sm:py-3 pl-0 text-sm sm:text-base'>First Name</h2>
              <input
                required
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className='px-4 w-full h-10 sm:h-12 rounded-md bg-[#19192f] capitalize text-sm sm:text-base'
                type="text"
                placeholder='John'
              />
            </div>
            <div className='w-1/2'>
              <h2 className='py-2 sm:py-3 pl-0 text-sm sm:text-base'>Last Name</h2>
              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className='px-4 w-full h-10 sm:h-12 rounded-md bg-[#19192f] capitalize text-sm sm:text-base'
                type="text"
                placeholder='Doe'
              />
            </div>
          </div>

          {/* Email */}
          <h3 className='mt-4 sm:mt-5 mb-2 sm:mb-3 text-sm sm:text-base'>Work Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='px-4 w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] h-10 sm:h-12 rounded-md bg-[#19192f] text-sm sm:text-base'
            type="email"
            placeholder='John@gmail.com'
          />

          {/* Password */}
          <h3 className='mt-4 sm:mt-5 mb-2 sm:mb-3 text-sm sm:text-base'>Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#19192f] px-4 w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] h-10 sm:h-12 rounded-md text-sm sm:text-base'
            type="password"
            placeholder='*******'
          />
          <span className='block text-xs sm:text-sm mt-1 mb-4 sm:mb-6 text-gray-400'>
            *Must be at least 6 characters containing a number and a symbol.
          </span>

          {/* Contact + Gender */}
          <h3 className='mt-4 sm:mt-5 mb-2 sm:mb-3 text-sm sm:text-base'>Contact No.</h3>
          <div className='flex gap-3 w-full sm:w-[90%] lg:w-[85%] xl:w-[80%]'>
            <input
              required
              value={contactno}
              onChange={(e) => setContactno(e.target.value)}
              className='bg-[#19192f] px-4 h-10 sm:h-12 rounded-md flex-1 min-w-0 text-sm sm:text-base'
              type='text'
              placeholder='+91'
            />
            <select
              required
              onChange={(e) => setGender(e.target.value)}
              className='h-10 sm:h-12 rounded-md px-2 sm:px-3 bg-[#19192f] cursor-pointer text-xs sm:text-sm flex-shrink-0'
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className='flex items-start sm:items-center gap-2 mt-6 sm:mt-8 w-full sm:w-[90%] lg:w-[85%] xl:w-[80%]'>
            <input
              required
              value={check}
              onChange={() => setcheck(true)}
              type="checkbox"
              className='h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-5 accent-green-500 border-none rounded flex-shrink-0'
            />
            <p className='text-xs sm:text-lg mt-5 font-semibold'>
              I agree to the HireSync Terms of Service and acknowledge the Privacy Policy.
            </p>
          </div>

          <button
            className='block w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] mt-4 h-10 sm:h-12 rounded-md bg-[#6366F1] text-sm sm:text-base font-medium hover:bg-[#4f52d9] transition-colors'
            type='submit'
          >
            Create Account
          </button>

          <p className='mt-4 sm:mt-5 text-center text-sm sm:text-lg w-[80%]  border-t border-gray-700 pt-4'>
            Already have an account?{' '}
            <Link to="/client/login" className='hover:underline font-bold'>Log In</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage