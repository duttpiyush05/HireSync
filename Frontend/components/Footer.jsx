import React from 'react'

const Footer = () => {
  return (
    <footer  className=' h-[15rem] w- flex bg-[#15152a] border border-black'>
          <div className='w-[45%] h-full flex flex-col justify-center items-center '>
            <h2 className='text-3xl font-bold mb-3'>HireSync</h2>
            <p className='text-lg'>© 2026 HireSync. All rights reserved.</p>
          </div>

          <div className='w-[55%] h-full flex flex-col justify-center items-center '>
            <ol className=' flex h-[20%] p-[5rem] gap-[3rem] font-semibold text-lg '>
              <li>Company</li>
              <li>Resources</li>
              <li>Support</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ol>
          </div>
      </footer>
  )
}

export default Footer
