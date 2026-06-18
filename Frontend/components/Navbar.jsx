import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='bg-[#0c1324] flex justify-center text-white'>
    <div className='h-full w-full max-w-[1700px] px-4 sm:px-6 lg:px-10'>
      <nav className='w-full border-[#0013be] min-h-[7rem] flex border-b-4 justify-between items-center py-3 relative sticky top-0 z-50 bg-[#15152a] rounded-b p-6 sticky'>

          {/* Left: Logo + Nav Links */}
          <div className='flex items-center gap-4 flex-1'>
            <Link to='/' className='text-2xl sm:text-3xl font-bold mr-2 sm:mr-5 whitespace-nowrap '>HireSync</Link>

            {/* Desktop Nav */}
            <ol className='hidden md:flex gap-6 lg:gap-[4rem] items-center font-semibold text-base lg:text-xl text-gray-300'>
              <Link to="/find-work">Find Work</Link>
              <Link to="/">My Jobs</Link>
              <Link to="/">Messages</Link>
              <Link to="/">Invoices</Link>
            </ol>
          </div>

          {/* Right: Search + Icons */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Search — hidden on mobile */}
            <div className='relative hidden sm:block'>
              <i className="ri-search-line ri-xl absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                className='h-[4rem] w-[12rem] lg:w-[em] pl-16 rounded-full bg-[#37374b] text-xl font-semibold '
                type="text"
                placeholder='Search....'
              />
            </div>

            <i className="ri-notification-2-fill ri-xl cursor-pointer"></i>
            <div className='bg-white w-15 h-15 rounded-full flex-shrink-0'></div>

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
    </div>
    </div>
  )
}

export default Navbar
