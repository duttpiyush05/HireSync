import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { NotificationsContext } from '../src/context/NotificationContext'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
    const [freelancer, setFreelancer] = useState()
  const navigate = useNavigate()

  const {unreadCount, setUnreadCount} = useContext(NotificationsContext)

  const gotoprofile=()=>
  {
    navigate('/fl/dashboard')
  }
  const gotonotifications=()=>
  {
    navigate('/freelancer/notifications')
  }

  useEffect(()=>
  {
    const getFreelancer = async()=>
    {
      try
      {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`,
          {
            headers : 
            {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )        
        setFreelancer(res?.data?.user)
      }
      catch(err)
      {
        toast.error(err?.res?.data?.message)
      }
    }
    getFreelancer()
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
                to="/find-work"
                className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
              >
                Find Work
              </Link>
              <Link
                to="/my-work"
                className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
              >
                My Jobs
              </Link>
              <Link
                to="/freelancer/contracts"
                className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'
              >
                Contracts
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
                freelancer?.profile?.profilePicture && (
                  <img
                className="w-full h-full object-cover rounded-full border-2 border-[#111827]"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${freelancer?.profile?.profilePicture}`}
                alt="profile"
              />
                )
              }
            </button>

            {/* Hamburger — mobile only */}
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
              <Link
                to="/find-work"
                className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Find Work
              </Link>
              <Link
                to="/my-work"
                className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                My Jobs
              </Link>
              <Link
                to="/freelancer/contracts"
                className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Contracts
              </Link>
            </div>
          )}
        </nav>
    </div>
    </div>
  )
}

export default Navbar