import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const [activeRole, setActiveRole] = useState('client')

  return (
    <div className='bg-[#0c1324] flex justify-center text-white overflow-x-hidden'>
      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        {/* NAVBAR */}
        <nav className='w-full min-h-[5rem] sm:h-[6rem] flex items-center justify-between border-b border-[#23244a] sticky top-0 z-50 bg-[#0c1324]/90 backdrop-blur-md px-2'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='flex items-center gap-2 text-2xl sm:text-3xl font-bold whitespace-nowrap'>
              <span className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-base'>
                <i className="ri-flashlight-fill"></i>
              </span>
              HireSync
            </Link>
            <ol className='hidden lg:flex gap-6 xl:gap-10 items-center font-semibold text-sm text-gray-400'>
              <Link to="/" className='hover:text-white transition-colors'>Find Work</Link>
              <Link to="/" className='hover:text-white transition-colors'>My Jobs</Link>
              <Link to="/" className='hover:text-white transition-colors'>Messages</Link>
              <Link to="/" className='hover:text-white transition-colors'>Post a Job</Link>
              <Link to="/" className='hover:text-white transition-colors'>Invoices</Link>
            </ol>
          </div>
          <div className='flex items-center gap-3'>
            <Link to='/fl/login' className='px-4 py-2 rounded-lg font-semibold text-sm text-gray-300 hover:text-white transition-colors'>Sign in</Link>
            <Link to='/register' className='px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-[#6366F1] to-[#a855f7] hover:opacity-90 transition-opacity whitespace-nowrap'>Get Started</Link>
          </div>
        </nav>

        {/* HERO */}
        <div className='relative mt-6 sm:mt-10 rounded-3xl overflow-hidden'>

          <div className='absolute inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#12122a] to-[#0c1324]'></div>
          <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6366F1]/20 blur-3xl'></div>
          <div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/15 blur-3xl'></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/5 blur-3xl'></div>

          <div className='relative z-10 px-4 sm:px-12 py-14 sm:py-20 lg:py-28 flex flex-col items-center text-center'>

            {/* Role Toggle */}
            <div className='flex items-center bg-[#ffffff10] border border-[#ffffff15] rounded-full p-1 mb-8 backdrop-blur-sm'>
              <button
                onClick={() => setActiveRole('client')}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeRole === 'client'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="ri-building-line mr-2"></i>I'm a Client
              </button>
              <button
                onClick={() => setActiveRole('freelancer')}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeRole === 'freelancer'
                    ? 'bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="ri-user-star-line mr-2"></i>I'm a Freelancer
              </button>
            </div>

            {/* Dynamic heading */}
            {activeRole === 'client' ? (
              <h1 className='text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight max-w-4xl'>
                Hire the world's{' '}
                <span className='bg-gradient-to-r from-[#8c8fff] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent'>
                  top talent
                </span>{' '}
                on demand.
              </h1>
            ) : (
              <h1 className='text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight max-w-4xl'>
                Turn your skills into{' '}
                <span className='bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#059669] bg-clip-text text-transparent'>
                  real income.
                </span>
              </h1>
            )}

            {activeRole === 'client' ? (
              <p className='text-base sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed'>
                Post a project and connect with vetted freelancers within hours. From startups to enterprise — HireSync delivers talent that ships.
              </p>
            ) : (
              <p className='text-base sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed'>
                Join 50,000+ freelancers earning on their own terms. Find high-value contracts, build your portfolio, and grow your career — on HireSync.
              </p>
            )}

            {/* Search */}
            <div className='relative w-full max-w-2xl mb-10'>
              <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
              <input
                className='h-14 sm:h-16 w-full pl-14 pr-36 sm:pr-40 rounded-full bg-[#ffffff0d] border border-[#ffffff20] focus:border-[#6366F1] outline-none text-sm sm:text-base font-medium transition-colors placeholder-gray-500 backdrop-blur-sm'
                type="text"
                placeholder={activeRole === 'client' ? 'Search for skills, roles or freelancers...' : 'Search for projects, clients or skills...'}
              />
              <button className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-11 sm:h-12 px-5 sm:px-7 rounded-full text-sm sm:text-base font-semibold whitespace-nowrap transition-opacity hover:opacity-90 ${
                activeRole === 'client'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#a855f7]'
                  : 'bg-gradient-to-r from-[#1d9e75] to-[#0f6e56]'
              }`}>
                Search
              </button>
            </div>

            {/* Trust Pills */}
            <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-5'>
              {[
                { icon: 'ri-checkbox-circle-fill', text: 'No subscription fees' },
                { icon: 'ri-shield-check-fill', text: 'Escrow protected' },
                { icon: 'ri-star-fill', text: '4.9/5 satisfaction' },
              ].map((pill, i) => (
                <span key={i} className='flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 bg-[#ffffff08] border border-[#ffffff12] px-4 py-2 rounded-full backdrop-blur-sm'>
                  <i className={`${pill.icon} text-[#a5a8ff]`}></i>
                  {pill.text}
                </span>
              ))}
            </div>

            {/* Avatar row */}
            <div className='flex items-center gap-4 mt-8'>
              <div className='flex -space-x-3'>
                {['#6366F1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'].map((c, i) => (
                  <div key={i} className='w-9 h-9 rounded-full border-2 border-[#12122a] flex-shrink-0' style={{ background: c }}></div>
                ))}
              </div>
              <p className='text-sm text-gray-400'>
                <span className='text-white font-bold'>50,000+</span> {activeRole === 'client' ? 'freelancers ready to hire' : 'projects posted this month'}
              </p>
            </div>

          </div>
        </div>

        {/* DUAL VALUE SECTION */}
        <div className='mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-5'>

          {/* For Clients */}
          <div className='relative bg-gradient-to-br from-[#1a1a3a] to-[#12122a] border border-[#6366F1]/30 rounded-2xl p-7 sm:p-10 overflow-hidden group hover:border-[#6366F1]/60 transition-all duration-300'>
            <div className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#6366F1]/10 blur-3xl group-hover:bg-[#6366F1]/20 transition-all duration-500'></div>
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-xl mb-5'>
                <i className="ri-building-4-line"></i>
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-3'>For Clients</h2>
              <p className='text-gray-400 leading-relaxed mb-6'>Post jobs, review proposals, hire vetted talent, and manage contracts — all in one place. Scale your team without the overhead.</p>
              <ul className='flex flex-col gap-3 mb-8'>
                {[
                  'Post unlimited job listings for free',
                  'Review proposals within 24 hours',
                  'Milestone-based escrow payments',
                  'Dedicated account management',
                ].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 text-sm text-gray-300'>
                    <span className='w-5 h-5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center flex-shrink-0'>
                      <i className="ri-check-line text-[#a5a8ff] text-xs"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to='/client/register' className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-semibold text-sm hover:opacity-90 transition-opacity'>
                Start Hiring <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          {/* For Freelancers */}
          <div className='relative bg-gradient-to-br from-[#0d2a1e] to-[#0a1f16] border border-[#1d9e75]/30 rounded-2xl p-7 sm:p-10 overflow-hidden group hover:border-[#1d9e75]/60 transition-all duration-300'>
            <div className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#1d9e75]/10 blur-3xl group-hover:bg-[#1d9e75]/20 transition-all duration-500'></div>
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#1d9e75] to-[#0f6e56] flex items-center justify-center text-xl mb-5'>
                <i className="ri-user-star-line"></i>
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-3'>For Freelancers</h2>
              <p className='text-gray-400 leading-relaxed mb-6'>Browse high-value contracts, submit proposals, build your profile, and get paid securely — on your schedule, your terms.</p>
              <ul className='flex flex-col gap-3 mb-8'>
                {[
                  'Browse 10,000+ active job listings',
                  'Keep up to 90% of every payment',
                  'Build a verified portfolio profile',
                  'Get paid safely via escrow',
                ].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 text-sm text-gray-300'>
                    <span className='w-5 h-5 rounded-full bg-[#1d9e75]/20 border border-[#1d9e75]/40 flex items-center justify-center flex-shrink-0'>
                      <i className="ri-check-line text-[#34d399] text-xs"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to='/register' className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] font-semibold text-sm hover:opacity-90 transition-opacity'>
                Start Earning <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

        </div>

        {/* STATS MARQUEE STRIP */}
        <div className='mt-16 sm:mt-24 rounded-2xl bg-gradient-to-r from-[#181830] via-[#1c1c3a] to-[#181830] border border-[#33334d] overflow-hidden'>
          <div className='grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#33334d]'>
            {[
              { icon: 'ri-user-star-line', color: 'text-[#a5a8ff]', val: '50,000+', label: 'Active Freelancers' },
              { icon: 'ri-briefcase-4-line', color: 'text-[#34d399]', val: '120,000+', label: 'Jobs Completed' },
              { icon: 'ri-money-dollar-circle-line', color: 'text-[#fbbf24]', val: '$200M+', label: 'Total Paid Out' },
              { icon: 'ri-global-line', color: 'text-[#f472b6]', val: '150+', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className='flex flex-col items-center justify-center py-8 sm:py-10 px-4 gap-2 text-center'>
                <i className={`${stat.icon} text-2xl ${stat.color}`}></i>
                <p className='text-2xl sm:text-3xl font-bold'>{stat.val}</p>
                <p className='text-xs sm:text-sm text-gray-400 font-medium'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className='mt-16 sm:mt-24'>
          <div className='text-center mb-10 sm:mb-14'>
            <span className='text-xs sm:text-sm font-semibold text-[#a5a8ff] uppercase tracking-widest'>Simple process</span>
            <h2 className='text-2xl sm:text-4xl font-bold mt-2'>How HireSync works</h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14'>

            {/* Client Steps */}
            <div>
              <div className='flex items-center gap-3 mb-7'>
                <div className='w-9 h-9 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center'>
                  <i className="ri-building-line text-[#a5a8ff]"></i>
                </div>
                <p className='font-bold text-lg text-[#a5a8ff]'>For Clients</p>
              </div>
              <div className='flex flex-col gap-5'>
                {[
                  { step: '01', icon: 'ri-file-add-line', title: 'Post your project', desc: 'Describe what you need — skills, budget, timeline. It takes less than 5 minutes.' },
                  { step: '02', icon: 'ri-user-search-line', title: 'Review proposals', desc: 'Receive tailored proposals from verified freelancers. Compare profiles, ratings, and bids.' },
                  { step: '03', icon: 'ri-handshake-line', title: 'Hire & collaborate', desc: 'Sign a contract, fund a milestone, and kick off your project — all inside HireSync.' },
                  { step: '04', icon: 'ri-secure-payment-line', title: 'Release payment', desc: 'Approve delivered work and release payment. Dispute protection built in at every step.' },
                ].map((s, i) => (
                  <div key={i} className='flex gap-4 group'>
                    <div className='flex flex-col items-center gap-1'>
                      <div className='w-10 h-10 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366F1]/30 transition-colors'>
                        <i className={`${s.icon} text-[#a5a8ff]`}></i>
                      </div>
                      {i < 3 && <div className='w-px flex-1 bg-[#33334d] mt-1'></div>}
                    </div>
                    <div className='pb-5'>
                      <p className='text-xs text-[#6366F1] font-bold uppercase tracking-widest mb-1'>{s.step}</p>
                      <p className='font-bold text-base sm:text-lg mb-1'>{s.title}</p>
                      <p className='text-sm text-gray-400 leading-relaxed'>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Freelancer Steps */}
            <div>
              <div className='flex items-center gap-3 mb-7'>
                <div className='w-9 h-9 rounded-lg bg-[#1d9e75]/20 border border-[#1d9e75]/40 flex items-center justify-center'>
                  <i className="ri-user-star-line text-[#34d399]"></i>
                </div>
                <p className='font-bold text-lg text-[#34d399]'>For Freelancers</p>
              </div>
              <div className='flex flex-col gap-5'>
                {[
                  { step: '01', icon: 'ri-id-card-line', title: 'Build your profile', desc: 'Showcase your skills, portfolio, and experience. Get verified and stand out from the crowd.' },
                  { step: '02', icon: 'ri-search-eye-line', title: 'Find the right jobs', desc: 'Browse thousands of listings filtered by category, budget, and duration. Apply with one click.' },
                  { step: '03', icon: 'ri-message-3-line', title: 'Submit & win proposals', desc: 'Write tailored cover letters, set your rate, and get hired by top clients worldwide.' },
                  { step: '04', icon: 'ri-wallet-3-line', title: 'Get paid securely', desc: 'Work on milestones, deliver results, and receive payment — guaranteed via escrow.' },
                ].map((s, i) => (
                  <div key={i} className='flex gap-4 group'>
                    <div className='flex flex-col items-center gap-1'>
                      <div className='w-10 h-10 rounded-xl bg-[#1d9e75]/15 border border-[#1d9e75]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1d9e75]/30 transition-colors'>
                        <i className={`${s.icon} text-[#34d399]`}></i>
                      </div>
                      {i < 3 && <div className='w-px flex-1 bg-[#33334d] mt-1'></div>}
                    </div>
                    <div className='pb-5'>
                      <p className='text-xs text-[#1d9e75] font-bold uppercase tracking-widest mb-1'>{s.step}</p>
                      <p className='font-bold text-base sm:text-lg mb-1'>{s.title}</p>
                      <p className='text-sm text-gray-400 leading-relaxed'>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CATEGORIES */}
        <div className='w-full mt-16 sm:mt-24'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 sm:mb-12'>
            <div>
              <span className='text-xs sm:text-sm font-semibold text-[#a5a8ff] uppercase tracking-widest'>Browse talent</span>
              <h2 className='text-xl sm:text-3xl font-bold mt-2'>Explore categories</h2>
            </div>
            <Link to='/' className='text-sm font-semibold text-[#a5a8ff] hover:underline flex items-center gap-1'>
              View all <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              { icon: 'ri-palette-line', accent: 'from-[#d4537e]/25 to-transparent', border: 'hover:border-[#d4537e]/50', iconBg: 'bg-[#d4537e]/15', iconColor: 'text-[#f4c0d1]', title: 'Design & Creative', count: '850 Experts' },
              { icon: 'ri-code-s-slash-line', accent: 'from-[#6366F1]/25 to-transparent', border: 'hover:border-[#6366F1]/50', iconBg: 'bg-[#6366F1]/15', iconColor: 'text-[#b5d4f4]', title: 'Development', count: '1,200 Experts' },
              { icon: 'ri-megaphone-line', accent: 'from-[#f59e0b]/25 to-transparent', border: 'hover:border-[#f59e0b]/50', iconBg: 'bg-[#f59e0b]/15', iconColor: 'text-[#fac775]', title: 'Marketing', count: '430 Experts' },
              { icon: 'ri-quill-pen-line', accent: 'from-[#1d9e75]/25 to-transparent', border: 'hover:border-[#1d9e75]/50', iconBg: 'bg-[#1d9e75]/15', iconColor: 'text-[#9fe1cb]', title: 'Writing', count: '380 Experts' },
              { icon: 'ri-bar-chart-line', accent: 'from-[#a855f7]/25 to-transparent', border: 'hover:border-[#a855f7]/50', iconBg: 'bg-[#a855f7]/15', iconColor: 'text-[#d8b4fe]', title: 'Data & Analytics', count: '290 Experts' },
              { icon: 'ri-customer-service-2-line', accent: 'from-[#ec4899]/25 to-transparent', border: 'hover:border-[#ec4899]/50', iconBg: 'bg-[#ec4899]/15', iconColor: 'text-[#fbcfe8]', title: 'Customer Support', count: '210 Experts' },
              { icon: 'ri-video-line', accent: 'from-[#f97316]/25 to-transparent', border: 'hover:border-[#f97316]/50', iconBg: 'bg-[#f97316]/15', iconColor: 'text-[#fed7aa]', title: 'Video & Animation', count: '175 Experts' },
              { icon: 'ri-smartphone-line', accent: 'from-[#0ea5e9]/25 to-transparent', border: 'hover:border-[#0ea5e9]/50', iconBg: 'bg-[#0ea5e9]/15', iconColor: 'text-[#bae6fd]', title: 'Mobile Apps', count: '320 Experts' },
            ].map((cat, i) => (
              <div key={i} className={`group relative bg-gradient-to-b ${cat.accent} border border-[#33334d] ${cat.border} rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                <div className={`w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                  <i className={`${cat.icon} text-xl ${cat.iconColor}`}></i>
                </div>
                <div>
                  <p className='font-bold text-base sm:text-lg leading-tight'>{cat.title}</p>
                  <p className='text-xs sm:text-sm text-gray-400 mt-1 font-medium'>{cat.count}</p>
                </div>
                <i className="ri-arrow-right-up-line absolute bottom-4 right-4 text-gray-600 group-hover:text-gray-300 transition-colors text-lg"></i>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE */}
        <div className='mt-16 sm:mt-24'>
          <div className='text-center mb-10 sm:mb-14'>
            <span className='text-xs sm:text-sm font-semibold text-[#a5a8ff] uppercase tracking-widest'>Why us</span>
            <h2 className='text-2xl sm:text-4xl font-bold mt-2'>Built for serious work</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {[
              { icon: 'ri-shield-star-line', accent: 'from-[#6366F1] to-[#4338ca]', glow: 'bg-[#6366F1]/10', title: 'Vetted Professionals', desc: 'Every freelancer passes a skills assessment and background check before joining HireSync.' },
              { icon: 'ri-global-line', accent: 'from-[#1d9e75] to-[#0f6e56]', glow: 'bg-[#1d9e75]/10', title: 'Global Talent Pool', desc: 'Tap into talent across 150+ countries. The right expert is always available, in any timezone.' },
              { icon: 'ri-secure-payment-line', accent: 'from-[#d4537e] to-[#993556]', glow: 'bg-[#d4537e]/10', title: 'Escrow Protection', desc: 'Payments are held securely in escrow and only released when work is approved — zero risk.' },
            ].map((item, i) => (
              <div key={i} className='relative bg-[#181830] border border-[#33334d] rounded-2xl p-7 hover:border-[#454566] hover:-translate-y-1 transition-all duration-300 overflow-hidden group'>
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${item.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-2xl mb-5 relative z-10`}>
                  <i className={item.icon}></i>
                </div>
                <h2 className='font-bold text-xl mb-3 relative z-10'>{item.title}</h2>
                <p className='text-gray-400 leading-relaxed text-sm sm:text-base relative z-10'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='relative mt-16 sm:mt-24 rounded-3xl overflow-hidden mb-12 sm:mb-20'>
          <div className='absolute inset-0 bg-gradient-to-br from-[#1f1f4a] via-[#18183a] to-[#0f0f2a]'></div>
          <div className='absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#6366F1]/20 blur-3xl'></div>
          <div className='absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-[#a855f7]/15 blur-3xl'></div>

          <div className='relative z-10 px-6 sm:px-12 py-14 sm:py-20 flex flex-col items-center text-center'>
            <span className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[#6366F1]/15 text-[#a5a8ff] border border-[#6366F1]/30 mb-6'>
              <i className="ri-rocket-line"></i>
              Join 62,000+ people already on HireSync
            </span>
            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight max-w-3xl'>
              One platform. Two sides. Infinite possibilities.
            </h1>
            <p className='text-base sm:text-xl text-gray-400 mb-10 max-w-2xl'>
              Whether you're building a product or building a career — HireSync is the place where great work happens.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
              <Link to='/client/register' className='flex items-center justify-center gap-2 h-14 sm:h-16 px-8 sm:px-12 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-bold text-sm sm:text-base hover:opacity-90 transition-opacity'>
                <i className="ri-building-line"></i>
                Hire Talent
              </Link>
              <Link to='/register' className='flex items-center justify-center gap-2 h-14 sm:h-16 px-8 sm:px-12 rounded-2xl bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] font-bold text-sm sm:text-base hover:opacity-90 transition-opacity'>
                <i className="ri-user-star-line"></i>
                Find Work
              </Link>
            </div>

            <div className='flex flex-wrap justify-center gap-6 mt-10'>
              {[
                { icon: 'ri-time-line', text: 'Start in under 5 minutes' },
                { icon: 'ri-lock-line', text: 'No credit card required' },
                { icon: 'ri-customer-service-2-line', text: '24/7 support included' },
              ].map((p, i) => (
                <span key={i} className='flex items-center gap-2 text-xs sm:text-sm text-gray-400'>
                  <i className={`${p.icon} text-[#a5a8ff]`}></i>
                  {p.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className='border-t border-[#23244a] pt-10 pb-8'>
          <div className='flex flex-col sm:flex-row justify-between gap-8 mb-10'>
            <div className='max-w-xs'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-base'>
                  <i className="ri-flashlight-fill"></i>
                </span>
                <h2 className='text-xl font-bold'>HireSync</h2>
              </div>
              <p className='text-sm text-gray-400 leading-relaxed'>The modern freelance marketplace where talent meets opportunity — globally, securely, and on your terms.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-8'>
              {[
                { title: 'For Clients', links: ['Post a Job', 'Find Talent', 'Enterprise', 'Pricing'] },
                { title: 'For Freelancers', links: ['Find Work', 'Build Profile', 'Resources', 'Success Stories'] },
                { title: 'Company', links: ['About', 'Blog', 'Careers', 'Privacy', 'Terms'] },
              ].map((col, i) => (
                <div key={i}>
                  <p className='text-xs font-bold uppercase tracking-widest text-gray-500 mb-3'>{col.title}</p>
                  <ul className='flex flex-col gap-2'>
                    {col.links.map((link, j) => (
                      <li key={j} className='text-sm text-gray-400 hover:text-white transition-colors cursor-pointer'>{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#23244a]'>
            <p className='text-xs text-gray-500'>© 2026 HireSync Inc. All rights reserved.</p>
            <div className='flex items-center gap-4'>
              {['ri-twitter-x-line', 'ri-linkedin-box-line', 'ri-github-line', 'ri-instagram-line'].map((icon, i) => (
                <button key={i} className='w-8 h-8 rounded-lg border border-[#33334d] hover:bg-[#19192f] transition-colors flex items-center justify-center text-gray-400 hover:text-white'>
                  <i className={`${icon} text-sm`}></i>
                </button>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default LandingPage