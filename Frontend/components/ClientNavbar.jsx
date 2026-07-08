import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import { NotificationsContext } from '../src/context/NotificationContext'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const ClientNavbar = () => {
  const [client, setClient] = useState()
  const navigate = useNavigate()
  const {unreadCount, setUnreadCount} = useContext(NotificationsContext)

  const gotoprofile=()=>
  {
    navigate('/client/dashboard')
  }

    const gotonotifications=()=>
    {
      navigate('/client/notifications')
    }

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(()=>
  {
    const getClient = async()=>
    {
      try
      {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`,
          {
            headers : 
            {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setClient(res?.data?.user)
      }
      catch(err)
      {
      }
    }
    getClient()
  },[])

  return (
    <div className='bg-[#0c1324] flex justify-center text-white'>
    <div className='h-full w-full max-w-[1900px] px-4 sm:px-6 lg:px-20'>
      <nav className='w-full min-h-[5rem] flex justify-between items-center py-3 relative sticky top-0 z-50 bg-[#111827]/80 backdrop-blur-xl border border-[#1e2230] rounded-2xl mt-4 px-4 sm:px-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'>

                {/* Left: Logo + Nav Links */}
                <div className='flex items-center gap-4 sm:gap-8 flex-1'>
                  <Link
              to='/'
              className='text-xl sm:text-2xl lg:text-3xl font-extrabold whitespace-nowrap bg-gradient-to-r from-[#a5a8ff] via-[#c7c9ff] to-[#a855f7] bg-clip-text text-transparent'
            >
              HireSync
            </Link>

                  {/* Desktop Nav */}
                  <ol className='hidden md:flex gap-1 lg:gap-2 items-center font-semibold text-sm lg:text-base'>
                    <Link
                      to="/my-jobs"
                      className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/post-job"
                      className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/client/contracts"
                      className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
                    >
                      Contracts
                    </Link>
                    <Link
                      to="/applicants"
                      className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
                    >
                      Applications
                    </Link>
                  </ol>
                </div>

                {/* Right: Icons */}
                <div className='flex items-center gap-2 sm:gap-3'>

                  <button
                    onClick={gotonotifications}
                    aria-label="Notifications"
                    className='relative w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors flex-shrink-0'
                  >
                    <i className="ri-notification-3-line text-2xl sm:text-xl"></i>
                    {unreadCount > 0 && (
                      <span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ef4444] ring-2 ring-[#111827] animate-pulse'></span>
                    )}
                  </button>

                  <button
                    onClick={gotoprofile}
                    aria-label="Profile"
                    className='bg-gradient-to-br from-[#6366F1] to-[#a855f7] w-11 h-11 sm:w-10 sm:h-10 rounded-full flex-shrink-0 cursor-pointer p-[2px] hover:opacity-90 transition-opacity'
                  >
                    {
                      client?.profilePicture && (
                        <img
                      className="w-full h-full object-cover rounded-full border-2 border-[#111827]"
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${client?.profilePicture}`}
                      alt="profile"
                    />
                      )
                    }
                  </button>

                  {/* Hamburger — mobile/tablet only */}
                  <button
                    className='md:hidden w-11 h-11 rounded-xl flex items-center justify-center text-white hover:bg-[#1e2230] transition-colors flex-shrink-0'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                  >
                    <i className={`text-2xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
                  </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                  <div className='absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[#111827] border border-[#1e2230] rounded-2xl z-50 flex flex-col gap-1 p-3 md:hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]'>
                    {/* Mobile Search */}
                    <div className='relative mb-1'>
                      <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                      <input
                        className='h-11 w-full pl-10 pr-4 rounded-xl bg-[#0c1324] border border-[#1e2230] text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                        type="text"
                        placeholder='Search....'
                      />
                    </div>
                    <Link
                      to="/my-jobs"
                      className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                      onClick={() => setMenuOpen(false)}
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/post-job"
                      className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                      onClick={() => setMenuOpen(false)}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/client/contracts"
                      className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                      onClick={() => setMenuOpen(false)}
                    >
                      Contracts
                    </Link>
                    <Link
                      to="/applicants"
                      className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                      onClick={() => setMenuOpen(false)}
                    >
                      Applications
                    </Link>
                  </div>
                )}
              </nav>
    </div>
    </div>
  )
}

export default ClientNavbar