import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='bg-[#0c1324] flex justify-center text-white overflow-x-hidden'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        {/* NAVBAR */}
        <nav className='w-full min-h-[5rem] sm:h-[6rem] flex items-center justify-between border-b border-[#23244a] sticky top-0 z-50 bg-[#15152a]/90 backdrop-blur-md rounded-b px-2'>

          <div className='flex items-center gap-4'>
            <Link to='/' className='flex items-center gap-2 text-2xl sm:text-3xl font-bold whitespace-nowrap'>
              <span className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-base'>
                <i className="ri-flashlight-fill"></i>
              </span>
              HireSync
            </Link>
            <ol className='hidden lg:flex gap-6 xl:gap-[3rem] items-center font-semibold text-sm xl:text-md text-gray-300'>
              <Link to="/" className='hover:text-white transition-colors'>Find Work</Link>
              <Link to="/" className='hover:text-white transition-colors'>My Jobs</Link>
              <Link to="/" className='hover:text-white transition-colors'>Messages</Link>
              <Link to="/" className='hover:text-white transition-colors'>Post a Job</Link>
              <Link to="/" className='hover:text-white transition-colors'>Invoices</Link>
            </ol>
          </div>

          <div className='flex items-center gap-3 sm:gap-6'>
            <Link to='fl/login' className='px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold bg-[#212139] hover:bg-[#2a2a4f] transition-colors text-sm sm:text-base whitespace-nowrap'>Sign in</Link>
            <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex-shrink-0'></div>
          </div>

        </nav>

        {/* HERO */}
        <div className='relative mt-6 sm:mt-8 min-h-[28rem] sm:h-[38rem] lg:h-[44rem] flex justify-center items-center bg-gradient-to-br from-[#212139] via-[#1c1c38] to-[#15152a] rounded-3xl px-4 sm:px-8 py-10 overflow-hidden'>

          <div className='absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#6366F1]/20 blur-3xl'></div>
          <div className='absolute -bottom-24 -right-10 w-80 h-80 rounded-full bg-[#a855f7]/15 blur-3xl'></div>

          <div className='relative z-10 w-full max-w-3xl flex flex-col items-center'>

            <span className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[#6366F1]/15 text-[#a5a8ff] border border-[#6366F1]/30 mb-6'>
              <i className="ri-shield-check-fill"></i>
              Trusted by 12,000+ businesses worldwide
            </span>

            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center leading-tight'>
              Find the perfect talent for your <span className='bg-gradient-to-r from-[#8c8fff] to-[#d59bff] bg-clip-text text-transparent'>next big idea.</span>
            </h1>

            <p className='text-base sm:text-xl lg:text-2xl text-center text-gray-400 mb-8 max-w-2xl mx-auto'>
              Access a global network of elite professionals ready to bring your vision to life. High-end skills, seamless collaboration.
            </p>

            <div className='w-full flex justify-center'>
              <div className='relative w-full max-w-2xl'>
                <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                <input
                  className='h-14 sm:h-16 w-full pl-14 pr-28 sm:pr-36 rounded-full bg-[#37374b]/80 border border-[#454566] focus:border-[#6366F1] outline-none text-sm sm:text-lg font-semibold transition-colors'
                  type="text"
                  placeholder='Search jobs, skills or freelancers...'
                />
                <button className='absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#6366F1] to-[#5371ea] hover:opacity-90 transition-opacity h-11 sm:h-13 px-4 sm:px-6 rounded-full text-sm sm:text-lg font-semibold whitespace-nowrap'>
                  Search
                </button>
              </div>
            </div>

            {/* Trust row */}
            <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10'>
              <div className='flex items-center gap-3'>
                <div className='flex -space-x-3'>
                  {['#6366F1', '#a855f7', '#ec4899', '#f59e0b'].map((c, i) => (
                    <div key={i} className='w-9 h-9 rounded-full border-2 border-[#15152a]' style={{ background: c }}></div>
                  ))}
                </div>
                <p className='text-sm text-gray-400'><span className='text-white font-bold'>50k+</span> freelancers</p>
              </div>
              <div className='h-8 w-px bg-[#33334d] hidden sm:block'></div>
              <p className='text-sm text-gray-400'><span className='text-white font-bold'>$200M+</span> paid out</p>
              <div className='h-8 w-px bg-[#33334d] hidden sm:block'></div>
              <p className='text-sm text-gray-400'><span className='text-white font-bold'>4.9/5</span> average rating</p>
            </div>

          </div>

        </div>

        {/* WHY CHOOSE */}
        <div className='text-center w-full mt-16 sm:mt-24'>
          <span className='text-xs sm:text-sm font-semibold text-[#a5a8ff] uppercase tracking-widest'>Why HireSync</span>
          <h2 className='text-2xl sm:text-4xl font-bold mt-2'>
            Built for serious work
          </h2>

          <div className='flex justify-center gap-6 sm:gap-8 mt-8 sm:mt-12 flex-wrap'>

            {[
              { icon: 'ri-shield-star-line', accent: 'from-[#6366F1] to-[#4338ca]', title: 'Vetted Trust', desc: 'Every professional is rigorously screened to ensure top-tier quality and reliability for your enterprise needs.' },
              { icon: 'ri-global-line', accent: 'from-[#1d9e75] to-[#0f6e56]', title: 'Global Reach', desc: 'Tap into a borderless talent pool. Find the exact skills you need, regardless of geography.' },
              { icon: 'ri-secure-payment-line', accent: 'from-[#d4537e] to-[#993556]', title: 'Fast Payments', desc: 'Secure, milestone-based payments ensure smooth transactions and peace of mind for both parties.' },
            ].map((item, i) => (
              <div key={i} className='w-full sm:w-[20rem] lg:w-[24rem] border border-[#33334d] text-left p-6 sm:p-8 rounded-2xl pb-8 sm:pb-10 bg-[#181830] hover:border-[#454566] hover:-translate-y-1 transition-all duration-300'>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-2xl`}>
                  <i className={item.icon}></i>
                </div>
                <h2 className='font-bold mt-5 text-xl sm:text-2xl'>{item.title}</h2>
                <p className='mt-3 text-base sm:text-lg text-gray-400 leading-relaxed'>{item.desc}</p>
              </div>
            ))}

          </div>
        </div>

        {/* CATEGORIES */}
        <div className='w-full mt-16 sm:mt-24'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2'>
            <div>
              <span className='text-xs sm:text-sm font-semibold text-[#a5a8ff] uppercase tracking-widest'>Browse talent</span>
              <h2 className='text-xl sm:text-3xl font-bold mt-2'>
                Explore categories
              </h2>
            </div>
            <Link to='/' className='text-sm font-semibold text-[#a5a8ff] hover:underline flex items-center gap-1'>
              View all categories <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-12'>

            {[
              { icon: 'ri-palette-line', accent: 'from-[#d4537e]/30 to-[#993556]/10', iconColor: 'text-[#f4c0d1]', title: 'Design & Creative', count: '850 Experts' },
              { icon: 'ri-megaphone-line', accent: 'from-[#ba7517]/30 to-[#854f0b]/10', iconColor: 'text-[#fac775]', title: 'Marketing', count: '430 Experts' },
              { icon: 'ri-code-s-slash-line', accent: 'from-[#6366F1]/30 to-[#4338ca]/10', iconColor: 'text-[#b5d4f4]', title: 'Development', count: '210 Experts' },
              { icon: 'ri-quill-pen-line', accent: 'from-[#1d9e75]/30 to-[#0f6e56]/10', iconColor: 'text-[#9fe1cb]', title: 'Writing & Translation', count: '180 Experts' },
            ].map((cat, i) => (
              <div key={i} className='w-full text-left p-5 h-[14rem] sm:h-[15rem] rounded-2xl border border-[#33334d] hover:border-[#454566] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between bg-[#181830]'>
                <div className={`flex-1 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center`}>
                  <i className={`${cat.icon} text-4xl ${cat.iconColor}`}></i>
                </div>
                <div className='mt-4'>
                  <p className='font-bold text-lg sm:text-xl'>{cat.title}</p>
                  <p className='mt-1 text-sm sm:text-base text-gray-400 font-medium'>{cat.count}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className='relative mt-16 sm:mt-20 min-h-[24rem] sm:h-[30rem] lg:h-[35rem] flex justify-center items-center bg-gradient-to-br from-[#2c2c4f] via-[#26264a] to-[#1c1c38] rounded-3xl sm:rounded-[2.5rem] mb-12 sm:mb-20 px-4 sm:px-8 py-10 overflow-hidden'>

          <div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6366F1]/15 blur-3xl'></div>

          <div className='relative z-10 w-full max-w-3xl flex flex-col text-center'>

            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 leading-tight'>
              Ready to build something great?
            </h1>

            <p className='text-base sm:text-xl lg:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto'>
              Join thousands of businesses scaling their operations with HireSync's elite talent pool.
            </p>

            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6 text-base sm:text-xl font-semibold'>

              <Link to='/client/register' className='h-14 sm:h-16 w-full sm:w-[15rem] rounded-full flex items-center justify-center bg-gradient-to-r from-[#6366F1] to-[#464baf] hover:opacity-90 transition-opacity'>
                Join as Client
              </Link>
              <Link to='/register' className='border border-white/30 hover:bg-white/5 transition-colors h-14 sm:h-16 w-full sm:w-[15rem] rounded-full flex items-center justify-center'>
                Apply as Talent
              </Link>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className='min-h-[10rem] sm:h-[15rem] flex flex-col sm:flex-row bg-[#15152a] rounded-t-2xl mb-0 border-t border-[#23244a]'>

          <div className='w-full sm:w-1/2 p-6 sm:p-10 lg:p-[4rem]'>
            <div className='flex items-center gap-2 mb-2 sm:mb-3'>
              <span className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-base'>
                <i className="ri-flashlight-fill"></i>
              </span>
              <h2 className='text-2xl sm:text-3xl font-bold'>HireSync</h2>
            </div>
            <p className='text-sm sm:text-lg text-gray-400'>© 2026 HireSync. All rights reserved.</p>
          </div>

          <div className='w-full sm:w-1/2 flex items-center'>
            <ol className='w-full flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-[3rem] font-semibold text-sm sm:text-lg p-6 sm:p-[5rem]'>
              <li className='cursor-pointer text-gray-300 hover:text-white transition-colors'>Company</li>
              <li className='cursor-pointer text-gray-300 hover:text-white transition-colors'>Resources</li>
              <li className='cursor-pointer text-gray-300 hover:text-white transition-colors'>Support</li>
              <li className='cursor-pointer text-gray-300 hover:text-white transition-colors'>Privacy</li>
              <li className='cursor-pointer text-gray-300 hover:text-white transition-colors'>Terms</li>
            </ol>
          </div>

        </footer>

      </div>

    </div>
  )
}

export default LandingPage