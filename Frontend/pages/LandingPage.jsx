import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='bg-[#0c1324] flex justify-center text-white overflow-x-hidden'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        {/* NAVBAR */}
        <nav className='w-full border-b-2 border-[#0c1324] min-h-[5rem] sm:h-[6rem] flex items-center justify-between border-b border-white sticky top-0 z-50 bg-[#15152a] rounded-b px-2'>

          <div className='flex items-center gap-4'>
            <Link to='/' className='text-2xl sm:text-3xl font-bold whitespace-nowrap'>HireSync</Link>
            <ol className='hidden lg:flex gap-6 xl:gap-[3rem] items-center font-semibold text-sm xl:text-md text-gray-300'>
              <Link to="/">Find Work</Link>
              <Link to="/">My Jobs</Link>
              <Link to="/">Messages</Link>
              <Link to="/">Post a Job</Link>
              <Link to="/">Invoices</Link>
            </ol>
          </div>

          <div className='flex items-center gap-3 sm:gap-6'>
            <Link to='fl/login' className='px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold bg-[#212139] text-sm sm:text-base whitespace-nowrap'>Sign in</Link>
            <div className='bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0'></div>
          </div>

        </nav>

        {/* HERO */}
        <div className='mt-6 sm:mt-8 min-h-[26rem] sm:h-[36rem] lg:h-[42rem] flex justify-center items-center bg-[#212139] rounded-3xl px-4 sm:px-8 py-10'>

          <div className='w-full max-w-3xl flex flex-col'>
            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 text-center leading-tight'>
              Find the perfect talent for your next big idea.
            </h1>

            <p className='text-base sm:text-xl lg:text-2xl text-center text-gray-400 mb-4 max-w-2xl mx-auto'>
              Access a global network of elite professionals ready to bring your vision to life. High-end skills, seamless collaboration.
            </p>

            <div className='w-full flex justify-center mt-6 sm:mt-8'>
              <div className='relative w-full max-w-2xl'>
                <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                <input
                  className='h-14 sm:h-16 w-full pl-14 pr-28 sm:pr-36 rounded-full bg-[#37374b] text-sm sm:text-lg font-semibold'
                  type="text"
                  placeholder='Search jobs, skills or freelancers...'
                />
                <button className='absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#5371ea] h-11 sm:h-13 px-4 sm:px-6 rounded-full text-sm sm:text-lg font-semibold whitespace-nowrap'>
                  Search
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* WHY CHOOSE */}
        <div className='text-center w-full mt-12 sm:mt-20'>
          <h2 className='text-2xl sm:text-4xl font-bold'>
            Why Choose HireSync
          </h2>

          <div className='flex justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 flex-wrap'>

            {[
              { title: 'Vetted Trust', desc: 'Every professional is rigorously screened to ensure top-tier quality and reliability for your enterprise needs.' },
              { title: 'Global Reach', desc: 'Tap into a borderless talent pool. Find the exact skills you need, regardless of geography.' },
              { title: 'Fast Payments', desc: 'Secure, milestone-based payments ensure smooth transactions and peace of mind for both parties.' },
            ].map((item, i) => (
              <div key={i} className='w-full sm:w-[20rem] lg:w-[24rem] border border-[#33334d] text-left p-6 sm:p-8 rounded-xl pb-8 sm:pb-10 shadow-lg bg-[#212139]'>
                <div className='w-10 h-10 rounded-full bg-white'></div>
                <h2 className='font-bold mt-4 text-xl sm:text-2xl'>{item.title}</h2>
                <p className='mt-3 text-base sm:text-lg text-gray-300 font-semibold leading-relaxed'>{item.desc}</p>
              </div>
            ))}

          </div>
        </div>

        {/* CATEGORIES */}
        <div className='w-full mt-12 sm:mt-20'>
          <h2 className='text-xl sm:text-3xl font-bold'>
            Explore Categories
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-12'>

            {[
              { title: 'Design & Creative', count: '850 Experts' },
              { title: 'Marketing', count: '430 Experts' },
              { title: 'Development', count: '210 Experts' },
              { title: 'Writing & Translation', count: '180 Experts' },
            ].map((cat, i) => (
              <div key={i} className='w-full text-left p-4 h-[15rem] sm:h-[16rem] rounded-xl shadow-lg flex flex-col justify-between bg-[#212139]'>
                <div className='flex-1 rounded-lg bg-white'></div>
                <div className='mt-3'>
                  <p className='font-bold text-lg sm:text-2xl'>{cat.title}</p>
                  <p className='mt-1 text-sm sm:text-xl text-gray-300 font-semibold'>{cat.count}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className='mt-12 sm:mt-16 min-h-[24rem] sm:h-[30rem] lg:h-[35rem] flex justify-center items-center bg-[#2c2c4f] rounded-3xl sm:rounded-[2.5rem] mb-12 sm:mb-20 px-4 sm:px-8 py-10'>

          <div className='w-full max-w-3xl flex flex-col text-center'>

            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 leading-tight'>
              Ready to build something great?
            </h1>

            <p className='text-base sm:text-xl lg:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto'>
              Join thousands of businesses scaling their operations with HireSync's elite talent pool.
            </p>

            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6 text-base sm:text-xl font-semibold'>

              <Link to='/client/register' className='border border-white/30 h-14 sm:h-16 w-full sm:w-[15rem] rounded-full flex items-center justify-center bg-[#464baf]'>
                Join as Client
              </Link>
              <Link to='/register' className='border border-white/30 h-14 sm:h-16 w-full sm:w-[15rem] rounded-full flex items-center justify-center'>
                Apply as Talent
              </Link>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className='min-h-[10rem] sm:h-[15rem] flex flex-col sm:flex-row bg-[#15152a] rounded-t-2xl mb-0'>

          <div className='w-full sm:w-1/2 p-6 sm:p-10 lg:p-[4rem]'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-2 sm:mb-3'>HireSync</h2>
            <p className='text-sm sm:text-lg'>© 2026 HireSync. All rights reserved.</p>
          </div>

          <div className='w-full sm:w-1/2 flex items-center'>
            <ol className='w-full flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-[3rem] font-semibold text-sm sm:text-lg p-6 sm:p-[5rem]'>
              <li className='cursor-pointer hover:text-gray-300 transition-colors'>Company</li>
              <li className='cursor-pointer hover:text-gray-300 transition-colors'>Resources</li>
              <li className='cursor-pointer hover:text-gray-300 transition-colors'>Support</li>
              <li className='cursor-pointer hover:text-gray-300 transition-colors'>Privacy</li>
              <li className='cursor-pointer hover:text-gray-300 transition-colors'>Terms</li>
            </ol>
          </div>

        </footer>

      </div>

    </div>
  )
}

export default LandingPage