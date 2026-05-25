import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FLDataContext } from '../src/context/FLContext'

const FreelancerDashboard = () => {
  const [progress, setProgress] = useState(70)
  const [menuOpen, setMenuOpen] = useState(false)
  const { freelancer, setfreelancer } = useContext(FLDataContext)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setfreelancer(response.data.freelancer)
    }
    getProfile()
  }, [])

  console.log(freelancer)

  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        {/* NAVBAR */}
        <nav className='w-full border-[#0013be] min-h-[5rem] flex border-b-4 justify-between items-center py-3 relative sticky top-0 z-50 bg-[#15152a] rounded-b'>

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

        {/* HEADER */}
        <div className='pt-6 sm:pt-[2rem]'>
          <h1 className='text-3xl sm:text-4xl lg:text-[4rem] font-bold leading-tight'>
            Welcome Back, {freelancer?.fullname?.firstname}!
          </h1>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-3'>
            <div>
              <h5 className='font-bold mt-2 text-2xl sm:text-4xl'>Overview</h5>
              <h3 className='mt-2 text-base sm:text-lg text-gray-300'>Project Overview and metrics</h3>
            </div>

            <div className='flex gap-3 sm:gap-[2rem] flex-wrap'>
              <Link
                to='/fl/dashboard'
                className='border border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[10rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold'
              >
                <i className="ri-arrow-down-line mr-1"></i> Reports
              </Link>
              <Link
                to='/'
                className='border border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[12rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#3d3ba2]'
              >
                Find new Works
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-8 sm:pt-[3rem]'>

          {/* Stat Cards */}
          <div className='h-auto min-h-[12rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-wallet-line ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Earnings</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>$25,000</h1>
          </div>

          <div className='h-auto min-h-[12rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-building-fill ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Jobs</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>20</h1>
          </div>

          <div className='h-auto min-h-[12rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl sm:col-span-2 lg:col-span-1'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-send-plane-fill ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Proposals</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>12</h1>
          </div>

          {/* Current Projects — spans 2 cols on lg */}
          <div className='rounded-2xl bg-[#151b2d] shadow-xl p-6 sm:col-span-2 lg:col-span-2'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-2xl sm:text-3xl font-semibold'>Current Projects</h2>
              <Link to='/fl/dashboard'>View All</Link>
            </div>

            <div className='flex flex-col gap-8'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Project Name</h2>
                <h3 className='text-gray-300 text-lg'>Company Name</h3>
                <div className='w-full bg-gray-700 rounded-full h-2 mt-4'>
                  <div
                    className='bg-purple-500 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Project Name</h2>
                <h3 className='text-gray-300 text-lg'>Company Name</h3>
                <div className='w-full bg-gray-700 rounded-full h-2 mt-4'>
                  <div
                    className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
                    style={{ width: `20%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className='rounded-2xl bg-[#151b2d] shadow-xl p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl sm:text-3xl font-semibold'>Recent Messages</h2>
              <Link to='/fl/dashboard'>
                <i className="ri-external-link-line ri-xl"></i>
              </Link>
            </div>

            <div className='flex flex-col gap-6'>
              {[1, 2].map((_, i) => (
                <div key={i} className='flex gap-3 items-center'>
                  <div className='border border-white h-[3.5rem] w-[3.5rem] rounded-full flex-shrink-0'></div>
                  <div className='flex-1 font-semibold text-lg'>Name</div>
                  <div className='text-gray-300 text-sm whitespace-nowrap'>Time</div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-2xl bg-[#151b2d] shadow-xl p-6 col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2'>
            <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>Recommendations for you</h2>

            <div className='border border-gray-700 p-4 sm:p-6 flex flex-col justify-between rounded-xl bg-[#101528] min-h-[12rem]'>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl sm:text-2xl'>Senior Frontend Engineer (Vue.js)</h1>
                <h3 className='font-semibold text-base sm:text-lg text-gray-300'>Architect a portal with Vue 3 and pinis</h3>
                <div className='ml-auto p-2 text-sm text-gray-400'>TEMP BOX</div>
              </div>

              <div className='flex flex-wrap gap-3 items-center mt-4'>
                <div className='h-[2.5rem] px-4 flex items-center justify-center border border-gray-600 rounded-lg bg-[#222a43] font-semibold'>Next.Js</div>
                <div className='h-[2.5rem] px-4 flex items-center justify-center border border-gray-600 rounded-lg bg-[#222a43] font-semibold'>Node.Js</div>
                <Link to='/fl/dashboard' className='ml-auto font-semibold'>View All</Link>
              </div>
            </div>
          </div>

          <div className='rounded-2xl bg-[#151b2d] shadow-xl p-6 col-span-1'>
            <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>Activity Feed</h2>

            <div className='flex flex-col gap-2'>
              <div className='w-full flex p-3 gap-3 items-center'>
                <div className='h-[3rem] w-[3rem] rounded-full border border-white flex-shrink-0'></div>
                <div>
                  <h1 className='font-bold text-lg'>MileStone Approved</h1>
                  <h4 className='font-semibold text-gray-300'>Time</h4>
                </div>
              </div>
              <div className='w-full flex p-3 gap-3 items-center'>
                <div className='h-[3rem] w-[3rem] rounded-full border border-white flex-shrink-0'></div>
                <div>
                  <h1 className='font-bold text-lg'>MileStone Approved</h1>
                  <h4 className='font-semibold text-gray-300'>Time</h4>
                </div>
              </div>
              <Link
                to='/'
                className='border border-white flex justify-center h-[3.5rem] items-center font-semibold text-base mt-2 rounded-lg'
              >
                View All Activities
              </Link>
            </div>
          </div>

          <div className='rounded-2xl bg-[#151b2d] shadow-xl p-6 col-span-1'>
            <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>Upcoming Deadlines</h2>

            <div className='flex flex-col gap-4'>
              <div className='w-full flex items-center gap-4 p-3'>
                <div className='border border-white h-[5rem] w-[5rem] rounded-xl flex justify-center items-center flex-shrink-0 font-semibold'>DATE</div>
                <div className='flex-1 font-semibold text-base sm:text-lg'>Beta Launch TechNova</div>
                <Link to='/' className='font-semibold'>GO</Link>
              </div>
              <div className='w-full flex items-center gap-4 p-3'>
                <div className='border border-white h-[5rem] w-[5rem] rounded-xl flex justify-center items-center flex-shrink-0 font-semibold'>DATE</div>
                <div className='flex-1 font-semibold text-base sm:text-lg'>Beta Launch TechNova</div>
                <Link to='/' className='font-semibold'>GO</Link>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className='mt-10 w-full bg-[#15152a] rounded-t-2xl'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-10'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-2'>HireSync</h2>
              <p className='text-base text-gray-300'>© 2026 HireSync. All rights reserved.</p>
            </div>

            <ol className='flex flex-wrap gap-4 sm:gap-8 font-semibold text-base text-gray-300'>
              <li className='cursor-pointer hover:text-white transition-colors'>Company</li>
              <li className='cursor-pointer hover:text-white transition-colors'>Resources</li>
              <li className='cursor-pointer hover:text-white transition-colors'>Support</li>
              <li className='cursor-pointer hover:text-white transition-colors'>Privacy</li>
              <li className='cursor-pointer hover:text-white transition-colors'>Terms</li>
            </ol>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default FreelancerDashboard
