import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='bg-[#0c1324] flex justify-center text-white'>

      <div className=' h-[100%] w-[75%] border-white'>
      
      <nav className='w-full border-b-2 border-[#0c1324] h-[6rem] flex border-b-1 border-white justifyy-between sticky top-0 z-50 bg-[#15152a] rounded-b'>

        <div className=' h-full flex items-center gap-4 w-[60rem]'>
          <Link to='/' className='text-3xl font-bold mr-5'>HireSync</Link>
        <ol className='flex gap-[4rem] h-full items-center font-semibold text-md text-gray-300'>
          <Link to="/">Find Work</Link>
          <Link to="/">My Jobs</Link>
          <Link to="/">Messages</Link>
          <Link to="/">Post a Job</Link>
          <Link to="/">Invoices</Link>
        </ol>

        </div>

        <div className='text-white w-[50%] flex items-center justify-end'>
         <Link to='fl/login' className='p-[1rem] rounded-lg font-semibold bg-[#212139]'> Sign in</Link>
          <div className='bg-white w-10 h-10 rounded-3xl ml-10 mr-15'>

          </div>
        </div>
        
      </nav>

      <div className='mt-[2rem] h-[42rem] flex justify-center items-center bg-[#212139] rounded-3xl'>

        <div className='h-[60%] w-[55rem] flex flex-col'>
          <h1 className='text-6xl font-bold mb-[3rem] text-center'>
          Find the perfect talent for your next big idea.
          </h1>

          <p className='text-2xl p-3 text-center text-gray-400 mb-4'>
            Access a global network of elite professionals ready to bring your vision to life. High-end skills, seamless collaboration.
          </p>

          <i className="ri-search-line absolute ri-2x pt-80 pl-17"></i>
          <div className='w-[100%] flex justify-center items-center'>
            <input 
            className='h-[5rem] w-[50rem] align-center pl-20 rounded-full bg-[#37374b] text-lg font-semibold mt-[2rem]'
            type="text" 
            placeholder='Search for jobs, skills or freelancers...'
          />
          <button className='absolute p-0 bg-[#5371ea] h-[4rem] w-[10rem] rounded-full ml-155 mt-[2rem] text-lg font-semibold'>
            Search
          </button>
          </div>
        </div>

      </div>

      <div className='text-center w-full mt-[6rem]'>
        <h2 className='text-4xl font-bold'>
          Why Choose HireSync
        </h2>

        <div className='flex justify-center gap-[2rem] mt-[3rem] p-[1rem] flex-wrap'>

            <div className='w-[30rem] border-1 text-left p-[2rem] rounded-xl pb-10 shadow-lg bg-[#212139]'>

              <div className='w-1 rounded-full bg-white p-[2rem] border-1 '>
            </div>
            <h2 className='font-bold mt-3 text-2xl'>
                Vetted Trust
              </h2>

              <p className='mt-4 text-xl text-gray-300 font-semibold'>
                Every professional is rigorously screened to ensure top-tier quality and reliability for your enterprise needs.

              </p>
            </div>

            <div className='w-[30rem] border-1 text-left p-[2rem] rounded-xl pb-10 shadow-lg bg-[#212139]'>

              <div className='w-1 rounded-full bg-white p-[2rem] border-1'>
            </div>
            <h2 className='font-bold mt-3 text-2xl'>
                Global Reach
              </h2>

              <p className='mt-4 text-xl text-gray-300 font-semibold'>
                Tap into a borderless talent pool. Find the exact skills you need, regardless of geography.

              </p>
            </div>

            <div className='w-[30rem] border-1 text-left p-[2rem] rounded-xl pb-10 shadow-lg bg-[#212139]'>

              <div className='w-1 rounded-full bg-white p-[2rem] border-1'>
            </div>
            <h2 className='font-bold mt-3 text-2xl'>
                Fast Payments
              </h2>

              <p className='mt-4 text-xl text-gray-300 font-semibold'>
                Secure, milestone-based payments ensure smooth transactions and peace of mind for both parties.

              </p>
            </div>

        </div>

      </div>
      
      <div className='w-full mt-[6rem]'>
        <h2 className='text-3xl font-bold ml-0'>
          Explore Categories
        </h2>

        <div className='flex justify-center gap-[1rem] mt-[3rem] p-[1rem] flex-wrap'>

            <div className='w-[18rem] text-left p-[1rem] h-[16rem] rounded-xl shadow-lg flex flex-col justify-between bg-[#212139]'>

              <div className=' h-[75%] rounded-lg bg-white p-[2rem] border-1'>
            </div>

              <div>
                <p className='font-bold mt-3 text-2xl'>
                Design & Creative
              </p>

              <p className='mt-1 text-xl text-gray-300 font-semibold'>
               850 Experts
              </p>
              </div>

            </div>
            <div className='w-[18rem] text-left p-[1rem] h-[16rem] rounded-xl shadow-lg flex flex-col justify-between bg-[#212139]'>

              <div className=' h-[75%] rounded-lg bg-white p-[2rem] border-1'>
            </div>

              <div>
                <p className='font-bold mt-3 text-2xl'>
                Marketing
              </p>

              <p className='mt-1 text-xl text-gray-300 font-semibold'>
               430 Experts
              </p>
              </div>

            </div>
            <div className='w-[18rem] bg-[#212139] text-left p-[1rem] h-[16rem] rounded-xl shadow-lg flex flex-col justify-between'>

              <div className=' h-[75%] rounded-lg bg-white p-[2rem] border-1'>
            </div>

              <div>
                <p className='font-bold mt-3 text-2xl'>
                Development
              </p>

              <p className='mt-1 text-xl text-gray-300 font-semibold'>
               210 Experts
              </p>
              </div>

            </div>
            <div className='w-[18rem] bg-[#212139] text-left p-[1rem] h-[16rem] rounded-xl shadow-lg flex flex-col justify-between'>

              <div className=' h-[75%] rounded-lg bg-white p-[2rem] border-1'>
            </div>

              <div>
                <p className='font-bold mt-3 text-2xl'>
                Development
              </p>

              <p className='mt-1 text-xl text-gray-300 font-semibold'>
               Design & Creative
              </p>
              </div>

            </div>
            <div className='w-[18rem] bg-[#212139] text-left p-[1rem] h-[16rem] rounded-xl shadow-lg flex flex-col justify-between'>

              <div className=' h-[75%] rounded-lg bg-white p-[2rem] border-1'>
            </div>

              <div>
                <p className='font-bold mt-3 text-2xl'>
                Development
              </p>

              <p className='mt-1 text-xl text-gray-300 font-semibold'>
               Design & Creative
              </p>
              </div>

            </div>

        </div>
      </div>

      <div className='mt-[2rem] h-[35rem] flex justify-center items-center bg-[#2c2c4f] rounded-4xl mb-[5rem]'>

        <div className='h-[60%] w-[60rem] flex flex-col text-center'>

          <h1 className='text-6xl font-bold mb-[3rem] text-center'>
          Ready to build something great?
          </h1>

          <p className='text-2xl p-3 text-gray-400 mb-4 max-w-2xl ml-[10rem]'>
            Join thousands of businesses scaling their operations with HireSync’s elite talent pool.
          </p>

          
          <div className='w-[100%] flex justify-center items-center gap-[2rem] mt-5 text-xl font-semibold'>
            
            <Link to='/client/register' className='border-1 h-[5rem] w-[15rem] rounded-full pt-6 bg-[#464baf]'>
              Join as Client
            </Link>
            <Link to='/register' className='border-1 h-[5rem] w-[15rem] rounded-full pt-6'>
              Apply as talent
            </Link>

          </div>
        </div>

      </div>

      <footer  className=' h-[15rem] w- flex bg-[#15152a]'>
          <div className='w-[60%] h-full p-[4rem]'>
            <h2 className='text-3xl font-bold mb-3'>HireSync</h2>
            <p className='text-lg'>© 2026 HireSync. All rights reserved.</p>
          </div>

          <div >
            <ol className='w-full flex h-[20%] p-[5rem] gap-[3rem] font-semibold text-lg'>
              <li>Company</li>
              <li>Resources</li>
              <li>Support</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ol>
          </div>
      </footer>

      </div>

      
    </div>
  )
}

export default LandingPage