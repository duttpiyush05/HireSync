import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FLDataContext } from '../src/context/FLContext'

const FreelancerDashboard = () => {
  const [progress, setProgress] = useState(70)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isloading, setisLoading] = useState(true)
  const { freelancer, setfreelancer } = useContext(FLDataContext)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getProfile = async () => {
     try
     {
       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })       
      setfreelancer(response.data.freelancer)
     }
     catch(err)
     {
      console.log(err?.response?.data);
     }
     finally{
      setTimeout(() => {
        setisLoading(false)
      }, 2000);
     }
    }
    
    getProfile()
  }, [])

  if(isloading)
    {
      return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
  
        <div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
  
        <h3 className='text-white block mt-5 font-bold text-xl'>Please Wait...</h3>
        </div>
      )
    }

  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>


        {/* HEADER */}
        <div className='pt-6 sm:pt-[2rem]'>
          <h1 className='text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-tight capitalize'>
            Welcome Back, {freelancer?.fullname?.firstname}!
          </h1>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-3'>
            <div>
              <h5 className='font-bold mt-2 text-2xl sm:text-4xl'>Overview</h5>
              <h3 className='mt-2 text-base sm:text-lg text-gray-300'>Project Overview and metrics</h3>
            </div>

            <div className='flex gap-3 sm:gap-[2rem] flex-wrap'>
              <Link
                to='/find-work'
                className=' border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[12rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#3d3ba2]'
              > <i className="ri-phone-find-line mr-1"></i>
                Find new Works
              </Link>
               <Link
                to='/freelancer/profile'
                className=' border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[10rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#008500]'
              >
                <i className="ri-pencil-line mr-1"></i> Edit Profile
              </Link>
               <Link
                to='/fl/logout'
                className=' border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[10rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#b42222]'
              >
                <i className="ri-logout-box-line mr-1"></i> Logout
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-8 sm:pt-[3rem] mb-10'>

          {/* Stat Cards */}
          <div className='h-auto min-h-[13rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-wallet-line ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Earnings</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>$25,000</h1>
          </div>

          <div className='h-auto min-h-[13rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-building-fill ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Jobs</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>20</h1>
          </div>

          <div className='h-auto min-h-[13rem] p-6 rounded-2xl bg-[#151b2d] shadow-xl sm:col-span-2 lg:col-span-1'>
            <div className='border border-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
              <i className="ri-send-plane-fill ri-xl"></i>
            </div>
            <h3 className='font-bold mt-5 text-xl'>Proposals</h3>
            <h1 className='text-3xl sm:text-4xl font-bold mt-2'>12</h1>
          </div>

          {/* Current Projects — spans 2 cols on lg */}
          <div className='rounded-2xl bg-[#151b2d] shadow-2xl p-6 sm:col-span-2 lg:col-span-2'>
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


      </div>
    </div>
  )
}

export default FreelancerDashboard
