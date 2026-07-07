import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import registerImage from '../src/assets/register.png'
import { ClientDataContext } from '../src/context/ClientContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState(true)
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contactno, setContactno] = useState('')
  const [gender, setGender] = useState('')
  const [check, setcheck] = useState(false)

  const { client, setclient } = useContext(ClientDataContext)

  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])
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

    if (isLoading) {
    return (
      <div className='fixed inset-0 bg-[#0c1324] flex flex-col items-center justify-center z-[9999]'>
        <style>{`
          @keyframes logo-pop {
            0% { opacity: 0; transform: scale(0.8) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes bar-fill {
            0% { width: 0%; }
            30% { width: 35%; }
            60% { width: 65%; }
            85% { width: 88%; }
            100% { width: 100%; }
          }
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-8px); opacity: 1; }
          }
          .logo-anim { animation: logo-pop 0.6s ease-out forwards; }
          .bar-anim { animation: bar-fill 2s ease-in-out forwards; }
          .dot1 { animation: dot-bounce 1.2s ease-in-out infinite 0s; }
          .dot2 { animation: dot-bounce 1.2s ease-in-out infinite 0.2s; }
          .dot3 { animation: dot-bounce 1.2s ease-in-out infinite 0.4s; }
        `}</style>

        <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6366F1]/15 blur-3xl'></div>
        <div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/10 blur-3xl'></div>

        <div className='relative z-10 flex flex-col items-center gap-8'>
          <div className='logo-anim flex items-center gap-3'>
            <span className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-2xl'>
              <i className="ri-flashlight-fill text-white"></i>
            </span>
            <span className='text-4xl font-bold text-white'>HireSync</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-[#6366F1] dot1'></span>
            <span className='w-2 h-2 rounded-full bg-[#a855f7] dot2'></span>
            <span className='w-2 h-2 rounded-full bg-[#6366F1] dot3'></span>
          </div>

          <div className='w-48 h-1 bg-[#1e2230] rounded-full overflow-hidden'>
            <div className='h-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full bar-anim'></div>
          </div>

          <p className='text-sm text-gray-500 font-medium'>Please Wait...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden bg-[#0c1324]'>

      {/* Left Panel */}
      <div className='hidden lg:flex lg:w-1/2 relative text-white flex-shrink-0 flex-col justify-between min-h-screen'>
        <img className='absolute inset-0 h-full w-full object-cover' src={registerImage} alt="" />
        <div className='absolute inset-0 bg-gradient-to-b from-[#0c1324]/70 via-[#0c1324]/40 to-[#0c1324]/90'></div>

        {/* Logo */}
        <div className='relative z-10 pt-8 pl-10 xl:pl-16'>
          <Link to='/' className='text-3xl xl:text-4xl font-extrabold'>HireSync</Link>
        </div>

        {/* Bottom Text */}
        <div className='relative z-10 pb-12 px-10 xl:px-16'>
          <h1 className='text-3xl xl:text-5xl 2xl:text-6xl leading-tight font-bold mb-4'>
            Elevate your professional trajectory.
          </h1>
          <div className='w-[90%]'>
            <h3 className='text-sm xl:text-base 2xl:text-xl leading-relaxed text-gray-300'>
              Access exclusive contracts with top-tier enterprise clients in a
              streamlined, developer-first workspace engineered for high-performance talent.
            </h3>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className='lg:hidden w-full bg-[#0c1324] text-white px-6 pt-6 pb-2'>
        <Link to='/' className='text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#a5a8ff] via-[#c7c9ff] to-[#a855f7] bg-clip-text text-transparent'>
          HireSync
        </Link>
      </div>

      {/* Right Panel */}
      <div className='w-full lg:w-1/2 bg-[#0c1324] text-white px-4 sm:px-8 md:px-12 lg:px-12 xl:px-20 py-6 sm:py-10 lg:py-12 overflow-y-auto'>
        <div className='w-full max-w-xl mx-auto lg:mx-0'>

          <h1 className='text-2xl sm:text-3xl xl:text-4xl mb-2 font-bold'>Create an Account</h1>
          <p className='text-sm sm:text-base text-gray-400'>
            Select your primary role to customize your onboarding.
          </p>

          {/* Role Cards */}
          <div className='flex w-full mt-6 gap-3 sm:gap-4 mb-8'>
            <div
              className='flex-1 p-4 sm:p-5 rounded-xl bg-[#111827] border-2 border-[#1e2230] cursor-pointer hover:border-[#33336e] transition-colors'
              onClick={() => navigate('/register')}
            >
              <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1e2230] text-gray-400 flex items-center justify-center mb-3'>
                <i className="ri-suitcase-line text-lg sm:text-xl"></i>
              </div>
              <h3 className='font-bold mb-1 text-sm sm:text-base'>Join as Freelancer</h3>
              <p className='text-xs sm:text-sm text-gray-400 leading-relaxed'>Find high-end contracts and manage projects.</p>
            </div>

            <div
              className='flex-1 p-4 sm:p-5 rounded-xl bg-[#111827] border-2 border-[#6366F1] shadow-[0_0_0_3px_rgba(99,102,241,0.15)] cursor-pointer'
              onClick={() => navigate('/client/register')}
            >
              <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#6366F1]/20 text-[#a5a8ff] flex items-center justify-center mb-3'>
                <i className="ri-building-line text-lg sm:text-xl"></i>
              </div>
              <h3 className='font-bold mb-1 text-sm sm:text-base'>Join as Client</h3>
              <p className='text-xs sm:text-sm text-gray-400 leading-relaxed'>Hire vetted experts for your enterprise needs.</p>
            </div>
          </div>

          <form onSubmit={(e) => { submitHandler(e) }} className='w-full'>

            {/* Name Row */}
            <div className='w-full flex gap-3 sm:gap-4'>
              <div className='w-1/2'>
                <label className='block mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300'>First Name</label>
                <input
                  required
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  className='px-4 w-full h-11 sm:h-12 rounded-xl bg-[#111827] border border-[#1e2230] capitalize text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                  type="text"
                  placeholder='John'
                />
              </div>
              <div className='w-1/2'>
                <label className='block mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300'>Last Name</label>
                <input
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className='px-4 w-full h-11 sm:h-12 rounded-xl bg-[#111827] border border-[#1e2230] capitalize text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                  type="text"
                  placeholder='Doe'
                />
              </div>
            </div>

            {/* Email */}
            <label className='block mt-5 mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300'>Work Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='px-4 w-full h-11 sm:h-12 rounded-xl bg-[#111827] border border-[#1e2230] text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
              type="email"
              placeholder='John@gmail.com'
            />

            {/* Password */}
            <label className='block mt-5 mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300'>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-4 w-full h-11 sm:h-12 rounded-xl bg-[#111827] border border-[#1e2230] text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
              type="password"
              placeholder='*******'
            />
            <span className='block text-xs sm:text-sm mt-2 text-gray-500'>
              *Must be at least 6 characters containing a number and a symbol.
            </span>

            {/* Contact + Gender */}
            <label className='block mt-5 mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300'>Contact No.</label>
            <div className='flex gap-3 w-full'>
              <input
                required
                value={contactno}
                onChange={(e) => setContactno(e.target.value)}
                className='px-4 h-11 sm:h-12 rounded-xl bg-[#111827] border border-[#1e2230] flex-1 min-w-0 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                type='text'
                placeholder='+91'
              />
              <select
                required
                onChange={(e) => setGender(e.target.value)}
                className='h-11 sm:h-12 rounded-xl px-3 bg-[#111827] border border-[#1e2230] cursor-pointer text-xs sm:text-sm text-white flex-shrink-0 focus:outline-none focus:border-[#6366F1] transition-colors'
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className='flex items-start gap-3 mt-6'>
              <input
                required
                value={check}
                onChange={() => setcheck(true)}
                type="checkbox"
                className='h-4 w-4 sm:h-5 sm:w-5 mt-0.5 accent-[#6366F1] border-none rounded flex-shrink-0'
              />
              <p className='text-xs sm:text-sm text-gray-400 leading-relaxed'>
                I agree to the HireSync Terms of Service and acknowledge the Privacy Policy.
              </p>
            </div>

            <button
              className='block w-full mt-6 h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-sm sm:text-base font-semibold text-white hover:opacity-90 transition-opacity'
              type='submit'
            >
              Create Account
            </button>

            <p className='mt-6 text-center text-sm sm:text-base text-gray-400 border-t border-[#1e2230] pt-5'>
              Already have an account?{' '}
              <Link to="/client/login" className='text-[#a5a8ff] hover:underline font-semibold'>Log In</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage