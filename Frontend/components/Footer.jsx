import React from 'react'

const Footer = () => {
  return (
    <footer className='min-h-[10rem] sm:h-[14rem] flex flex-col sm:flex-row bg-[#15152a] shadow-2xl px-4 sm:px-0'>

      <div className='w-full sm:w-1/2 h-full flex flex-col justify-center items-center py-6 sm:py-0 '>
        <h2 className='text-2xl sm:text-3xl font-bold mb-2 sm:mb-3'>HireSync</h2>
        <p className='text-sm sm:text-lg text-center'>© 2026 HireSync. All rights reserved.</p>
      </div>

      <div className='w-full sm:w-1/2 h-full flex flex-col justify-center items-center py-6 sm:py-0'>
        <ol className='flex flex-wrap justify-center gap-4 sm:gap-[3rem] font-semibold text-sm sm:text-lg px-4 sm:px-[5rem]'>
          <li className='cursor-pointer hover:text-gray-300 transition-colors'>Company</li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors'>Resources</li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors'>Support</li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors'>Privacy</li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors'>Terms</li>
        </ol>
      </div>

    </footer>
  )
}

export default Footer