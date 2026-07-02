import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import { NotificationCountContext } from '../src/context/NotificationContext'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const ClientNavbar = () => {
  const [client, setClient] = useState()
  const navigate = useNavigate()
  const {unreadCount, setUnreadCount} = useContext(NotificationCountContext)

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
    <div className='h-full w-full max-w-[1700px] px-4 sm:px-6 lg:px-10'>
      <nav className='w-full border-[#0013be] min-h-[7rem] sm:min-h-[5rem] flex border-b-4 justify-between items-center py-3 relative sticky top-0 z-50 bg-[#15152a] rounded-b p-6'>
      
                {/* Left: Logo + Nav Links */}
                <div className='flex items-center gap-4 flex-1'>
                            <Link to='/' className='text-2xl sm:text-3xl font-bold mr-2 sm:mr-5 whitespace-nowrap '>HireSync</Link>
      
                  {/* Desktop Nav */}
                  <ol className='hidden md:flex gap-6 lg:gap-[4rem] items-center font-semibold text-base lg:text-xl text-gray-300'>
                    <Link to="/my-jobs">My Jobs</Link>
                    <Link to="/post-job">Post Job</Link>
                    <Link to="/client/contracts">Contracts</Link>
                    <Link to="/applicants">Applications</Link>
                  </ol>
                </div>
      
                {/* Right: Search + Icons */}
                <div className='flex items-center gap-2 sm:gap-3 lg:gap-4'>
                  {/* Search — hidden on mobile/tablet */}
                  <div className='relative hidden sm:block'>
                    <i className="ri-search-line ri-xl absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      className='h-[4rem] w-[12rem] lg:w-[em] pl-16 rounded-full bg-[#37374b] text-xl font-semibold '
                      type="text"
                      placeholder='Search....'
                    />
                  </div>
      
                  <i
                  onClick={gotonotifications} 
                  className="ri-mail-unread-line text-3xl cursor-pointer  flex items-center gap-1">
                    <span 
                    className={unreadCount>0?'text-2xl font-bold':'hidden'} >
                      {unreadCount}
                      </span>
                  </i>
                  <div 
                  onClick={gotoprofile}
                  className='bg-white w-10 h-10 sm:w-9 sm:h-9 rounded-full flex-shrink-0'>

                      <img 
                      className="w-full h-full object-cover rounded-full"
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${client?.profilePicture}`} alt="profile" />

                  </div>
      
                  {/* Hamburger — mobile/tablet only */}
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
                    <div className='relative'>
                      <i className="ri-search-line ri-xl absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        className='h-[3rem] w-full pl-10 rounded-full bg-[#37374b] text-base font-semibold'
                        type="text"
                        placeholder='Search....'
                      />
                    </div>
                    <Link to="/my-jobs" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>My Jobs</Link>
                    <Link to="/post-job" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Post Job</Link>
                    <Link to="/client/contracts" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Contracts</Link>
                    <Link to="/applicants" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Applications</Link>
                  </div>
                )}
              </nav>
    </div>
    </div>
  )
}

export default ClientNavbar
