import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'

const ClientDashboard = () => {
  const [progress, setProgress] = useState(70)
  const [menuOpen, setMenuOpen] = useState(false)
  const { client, setclient } = useContext(ClientDataContext)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setclient(response.data.client)
    }
    getProfile()
  }, [])

  // console.log(client)

  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        <nav className='w-full border-[#0013be] min-h-[5rem] flex border-b-4 justify-between items-center py-3 relative'>

          {/* Left: Logo + Nav Links */}
          <div className='flex items-center gap-4 flex-1'>
            <Link to='/' className='text-2xl sm:text-3xl font-bold mr-2 sm:mr-5 whitespace-nowrap'>HireSync</Link>

            {/* Desktop Nav */}
            <ol className='hidden md:flex gap-6 lg:gap-[4rem] items-center font-semibold text-base lg:text-lg text-gray-300'>
              <Link to="/">Find Work</Link>
              <Link to="/">My Jobs</Link>
              <Link to="/">Messages</Link>
              <Link to="/">Invoices</Link>
            </ol>
          </div>

          {/* Right: Search + Icons */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Search — hidden on mobile */}
            <div className='relative hidden sm:block'>
              <i className="ri-search-line ri-xl absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                className='h-[3rem] w-[12rem] lg:w-[20rem] pl-10 rounded-full bg-[#37374b] text-base font-semibold'
                type="text"
                placeholder='Search....'
              />
            </div>

            <i className="ri-notification-2-fill ri-xl cursor-pointer"></i>
            <div className='bg-white w-9 h-9 rounded-full flex-shrink-0'></div>

            {/* Hamburger — mobile only */}
            <button
              className='md:hidden ml-1 text-white'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`ri-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className='absolute top-full left-0 w-full bg-[#151b2d] z-50 flex flex-col gap-4 p-5 border-t border-[#0013be] md:hidden'>
              {/* Mobile Search */}
              <div className='relative sm:hidden'>
                <i className="ri-search-line ri-xl absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  className='h-[3rem] w-full pl-10 rounded-full bg-[#37374b] text-base font-semibold'
                  type="text"
                  placeholder='Search....'
                />
              </div>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Find Work</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>My Jobs</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Messages</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Invoices</Link>
            </div>
          )}
        </nav>
        
        <div className='pt-6 sm:pt-[2rem] '>
          <h1 className='text-3xl sm:text-4xl lg:text-[4rem] font-bold leading-tight'>
            Welcome Back, {client?.fullname?.firstname}!
          </h1>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-3'>
                      <div>
                        <h3 className='mt-2 text-base sm:text-2xl text-gray-300 font-semibold '>Here's is an Overview of your hiring pipeline and active engagements.</h3>
                      </div>
          
                      <div className='flex gap-3 sm:gap-[2rem] flex-wrap'>
                        
                        <Link
                          to='/post-job'
                          className='border border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[15rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#3d4aff] gap-2'
                        > <i className="ri-add-line ri-xl pt-[0.2rem]"></i>
                          Post a New Job
                        </Link>
                      </div>
                    </div>
          
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8 pt-8 sm:pt-[3rem] mt-[2rem]'>
            
              <div  className=' h-auto min-h-[12rem] p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>

              <div className='text-4xl font-bold p-[0.5rem] flex justify-between '>
                <h3 className='text-xl font-bold mb-4'>Total Posted Jobs</h3>
                 <div className='p-[0.3rem] rounded-lg border-1 '>
                  <i class="ri-suitcase-fill"></i>
                 </div>
              </div>

              <h2 className='font-bold mt-3 p-[1rem] text-[3rem] text-center'>
                12
              </h2>
             
              </div>
              
             <div  className=' h-auto min-h-[12rem] p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>

              <div className='text-4xl font-bold p-[0.5rem] flex justify-between '>
                <h3 className='text-xl font-bold mb-4'>Active Hires</h3>
                 <div className='p-[0.3rem] rounded-lg border-1 '>
                  <i class="ri-team-line"></i>
                 </div>
              </div>

              <h2 className='font-bold mt-3 p-[1rem] text-[3rem] text-center'>
                24

                <p className=' text-[1rem] text-gray-300 font-semibold mt-2'>
                  Across x Projects
                </p>
              </h2>
             
              </div>

              <div  className=' h-auto min-h-[12rem] p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>

              <div className='text-4xl font-bold p-[0.5rem] flex justify-between '>
                <h3 className='text-xl font-bold mb-4'>Total Spend (YTD)</h3>
                 <div className='p-[0.3rem] rounded-lg border-1 '>
                  <i class="ri-currency-fill"></i>
                 </div>
              </div>

              <h2 className='font-bold mt-3 p-[1rem] text-[3rem] text-center'>
                $12,000

                <p className=' text-[1rem] text-gray-300 font-semibold mt-2'>On track with budget</p>
              </h2>
             
              </div>

              <div  className=' h-auto min-h-[12rem] p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>

              <div className='text-4xl font-bold p-[0.5rem] flex justify-between '>
                <h3 className='text-xl font-bold mb-4'>Upcoming Projects</h3>
                 <div className='p-[0.3rem] rounded-lg border-1 '>
                  <i class="ri-receipt-fill"></i>
                 </div>
              </div>

              <h2 className='font-bold mt-3 p-[1rem] text-[3rem] text-center'>
                3

                <p className=' text-[1rem] text-red-300 font-semibold mt-2'>3 Due within 7 days</p>
              </h2>
             
              </div>

          </div>

        </div>

    </div>
  )
}

export default ClientDashboard
