import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const [activeRole, setActiveRole] = useState('client')
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const clientPhrases = [
    'top talent on demand.',
    'vetted professionals.',
    'elite developers.',
    'world-class designers.',
    'expert consultants.',
  ]

  const freelancerPhrases = [
    'real income.',
    'financial freedom.',
    'your own terms.',
    'a thriving career.',
    'global opportunities.',
  ]

  const phrases = activeRole === 'client' ? clientPhrases : freelancerPhrases


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    setDisplayText('')
    setIsDeleting(false)
    setPhraseIndex(0)
  }, [activeRole])

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    let timeout

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentPhrase.slice(0, prev.length + 1)
        )
      }, isDeleting ? 40 : 70)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex, phrases])

  // LOADER SCREEN
  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-[#0c1324] flex flex-col items-center justify-center z-[9999]'>
        <style>{`
          @keyframes logo-pop {
            0% { opacity: 0; transform: scale(0.8) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes bar-fill {
            0% { width: 0%; }
            30% { width: 35%; }
            60% { width: 65%; }
            85% { width: 88%; }
            100% { width: 100%; }
          }
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-8px); opacity: 1; }
          }
          .logo-anim { animation: logo-pop 0.6s ease-out forwards; }
          .bar-anim { animation: bar-fill 2s ease-in-out forwards; }
          .dot1 { animation: dot-bounce 1.2s ease-in-out infinite 0s; }
          .dot2 { animation: dot-bounce 1.2s ease-in-out infinite 0.2s; }
          .dot3 { animation: dot-bounce 1.2s ease-in-out infinite 0.4s; }
        `}</style>

        <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6366F1]/15 blur-3xl'></div>
        <div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/10 blur-3xl'></div>

        <div className='relative z-10 flex flex-col items-center gap-8'>
          <div className='logo-anim flex items-center gap-3'>
            <span className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-2xl'>
              <i className="ri-flashlight-fill text-white"></i>
            </span>
            <span className='text-4xl font-bold text-white'>HireSync</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-[#6366F1] dot1'></span>
            <span className='w-2 h-2 rounded-full bg-[#a855f7] dot2'></span>
            <span className='w-2 h-2 rounded-full bg-[#6366F1] dot3'></span>
          </div>

          <div className='w-48 h-1 bg-[#1e2230] rounded-full overflow-hidden'>
            <div className='h-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full bar-anim'></div>
          </div>

          <p className='text-sm text-gray-500 font-medium'>Loading your workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer-client {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shimmer-freelancer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-orb {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        .cursor-blink {
          display: inline-block;
          width: 3px;
          margin-left: 2px;
          border-radius: 2px;
          animation: cursor-blink 0.85s step-end infinite;
        }
        .typed-client {
          background: linear-gradient(120deg, #8c8fff 0%, #c084fc 30%, #f472b6 60%, #c084fc 80%, #8c8fff 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-client 3.5s linear infinite;
        }
        .typed-freelancer {
          background: linear-gradient(120deg, #34d399 0%, #6ee7b7 30%, #10b981 60%, #6ee7b7 80%, #34d399 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-freelancer 3.5s linear infinite;
        }
        .pulse-orb { animation: pulse-orb 5s ease-in-out infinite; }
      `}</style>

      <div className='max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* NAVBAR */}
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
      <Link to="/find-work" className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'>Find Work</Link>
      <Link to="/my-work" className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'>My Jobs</Link>
      <Link to="/freelancer/contracts" className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'>Contracts</Link>
      <Link to="/" className='px-3 lg:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors'>Post Job</Link>
    </ol>
  </div>

  {/* Right: Auth actions */}
  <div className='flex items-center gap-2 sm:gap-3'>
    <Link
      to='/fl/login'
      className='hidden sm:block px-4 py-2 rounded-xl font-semibold text-sm lg:text-base text-gray-300 hover:text-white hover:bg-[#1e2230] transition-colors whitespace-nowrap'
    >
      Sign in
    </Link>
    <Link
      to='/register'
      className='px-4 py-2 rounded-xl font-semibold text-sm lg:text-base bg-gradient-to-r from-[#6366F1] to-[#a855f7] hover:opacity-90 transition-opacity whitespace-nowrap'
    >
      Get Started
    </Link>

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
      <Link to="/find-work" className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors' onClick={() => setMenuOpen(false)}>Find Work</Link>
      <Link to="/my-work" className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors' onClick={() => setMenuOpen(false)}>My Jobs</Link>
      <Link to="/freelancer/contracts" className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors' onClick={() => setMenuOpen(false)}>Contracts</Link>
      <Link to="/" className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors' onClick={() => setMenuOpen(false)}>Post Job</Link>
      <div className='h-px bg-[#1e2230] my-1'></div>
      <Link to='/fl/login' className='font-semibold text-gray-300 hover:text-white hover:bg-[#1e2230] text-base rounded-xl px-4 py-3 transition-colors' onClick={() => setMenuOpen(false)}>Sign in</Link>
    </div>
  )}
</nav>

        {/* HERO */}
        <div className='relative mt-6 sm:mt-10 rounded-3xl overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#12122a] to-[#0c1324]'></div>
          <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6366F1]/20 blur-3xl pulse-orb'></div>
          <div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/15 blur-3xl pulse-orb' style={{ animationDelay: '2.5s' }}></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/5 blur-3xl'></div>

          <div className='relative z-10 px-4 sm:px-12 py-14 sm:py-20 lg:py-28 flex flex-col items-center text-center'>

            {/* Role Toggle */}
            <div className='flex items-center bg-[#ffffff10] border border-[#ffffff15] rounded-full p-1 mb-10 backdrop-blur-sm'>
              <button
                onClick={() => setActiveRole('client')}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-md font-semibold transition-all duration-300 ${
                  activeRole === 'client'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="ri-building-line mr-2 text-xl"></i>I'm a Client
              </button>
              <button
                onClick={() => setActiveRole('freelancer')}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-md font-semibold transition-all duration-300 ${
                  activeRole === 'freelancer'
                    ? 'bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="ri-user-star-line mr-2 text-xl"></i>I'm a Freelancer
              </button>
            </div>

            {/* TYPEWRITER HEADING */}
            <h1 className='text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight max-w-4xl'>
              {activeRole === 'client' ? (
                <>Hire the world's <br className='hidden sm:block' /></>
              ) : (
                <>Turn your skills into <br className='hidden sm:block' /></>
              )}
              <span className={activeRole === 'client' ? 'typed-client' : 'typed-freelancer'}>
                {displayText}
              </span>
              <span
                className='cursor-blink'
                style={{
                  background: activeRole === 'client'
                    ? 'linear-gradient(to bottom, #8c8fff, #f472b6)'
                    : 'linear-gradient(to bottom, #34d399, #10b981)',
                  height: '0.85em',
                  verticalAlign: 'middle',
                }}
              ></span>
            </h1>

            {activeRole === 'client' ? (
              <p className='text-base sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed'>
                Post a project and connect with vetted freelancers within hours. From startups to enterprise — HireSync delivers talent that ships.
              </p>
            ) : (
              <p className='text-base sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed'>
                Join 50,000+ freelancers earning on their own terms. Find high-value contracts, build your portfolio, and grow your career — on HireSync.
              </p>
            )}

            {/* Trust Pills */}
            <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-5'>
              {[
                { icon: 'ri-checkbox-circle-fill', text: 'No subscription fees' },
                { icon: 'ri-shield-check-fill', text: 'Escrow protected' },
                { icon: 'ri-star-fill', text: '4.9/5 satisfaction' },
              ].map((pill, i) => (
                <span key={i} className='flex items-center gap-1.5 text-xs sm:text-lg text-gray-300 bg-[#ffffff08] border border-[#ffffff12] px-4 py-2 rounded-full backdrop-blur-sm'>
                  <i className={`${pill.icon} text-[#a5a8ff]`}></i>
                  {pill.text}
                </span>
              ))}
            </div>

            {/* Avatar row */}
            <div className='flex items-center gap-4 mt-8'>
              <div className='flex -space-x-3'>
                {['#6366F1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'].map((c, i) => (
                  <div key={i} className='w-12 h-12 rounded-full border-2 border-[#12122a] flex-shrink-0' style={{ background: c }}></div>
                ))}
              </div>
              <p className='text-sm text-gray-400'>
                <span className='text-white font-bold'>50k+</span>{' '}
                {activeRole === 'client' ? 'freelancers ready to hire' : 'projects posted this month'}
              </p>
            </div>

          </div>
        </div>

        {/* DUAL VALUE SECTION */}
        <div className='mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='relative bg-gradient-to-br from-[#1a1a3a] to-[#12122a] border border-[#6366F1]/30 rounded-2xl p-7 sm:p-10 overflow-hidden group hover:border-[#6366F1]/60 transition-all duration-300'>
            <div className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#6366F1]/10 blur-3xl group-hover:bg-[#6366F1]/20 transition-all duration-500'></div>
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-xl mb-5'>
                <i className="ri-building-4-line"></i>
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-3'>For Clients</h2>
              <p className='text-gray-400 leading-relaxed mb-6'>Post jobs, review proposals, hire vetted talent, and manage contracts — all in one place.</p>
              <ul className='flex flex-col gap-3 mb-8'>
                {['Post unlimited job listings for free', 'Review proposals within 24 hours', 'Milestone-based escrow payments', 'Dedicated account management'].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 text-base text-gray-300'>
                    <span className='w-8 h-8 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center flex-shrink-0'>
                      <i className="ri-check-line text-[#a5a8ff] text-lg"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to='/client/register' className='inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-semibold text-base hover:opacity-90 transition-opacity'>
                Start Hiring <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          <div className='relative bg-gradient-to-br from-[#0d2a1e] to-[#0a1f16] border border-[#1d9e75]/30 rounded-2xl p-7 sm:p-10 overflow-hidden group hover:border-[#1d9e75]/60 transition-all duration-300'>
            <div className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#1d9e75]/10 blur-3xl group-hover:bg-[#1d9e75]/20 transition-all duration-500'></div>
            <div className='relative z-10'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#1d9e75] to-[#0f6e56] flex items-center justify-center text-xl mb-5'>
                <i className="ri-user-star-line"></i>
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold mb-3'>For Freelancers</h2>
              <p className='text-gray-400 leading-relaxed mb-6'>Browse high-value contracts, submit proposals, build your profile, and get paid securely.</p>
              <ul className='flex flex-col gap-3 mb-8'>
                {['Browse 10,000+ active job listings', 'Keep up to 90% of every payment', 'Build a verified portfolio profile', 'Get paid safely via escrow'].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 text-base text-gray-300'>
                    <span className='w-8 h-8 rounded-full bg-[#1d9e75]/20 border border-[#1d9e75]/40 flex items-center justify-center flex-shrink-0'>
                      <i className="ri-check-line text-[#34d399] text-lg"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to='/register' className='inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] font-semibold text-base hover:opacity-90 transition-opacity'>
                Start Earning <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
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
            <div>
              <div className='flex items-center gap-3 mb-7'>
                <div className='w-9 h-9 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center'>
                  <i className="ri-building-line text-[#a5a8ff] text-xl"></i>
                </div>
                <p className='font-bold text-xl text-[#a5a8ff]'>For Clients</p>
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
                        <i className={`${s.icon} text-[#a5a8ff] text-base`}></i>
                      </div>
                      {i < 3 && <div className='w-px flex-1 bg-[#33334d] mt-1'></div>}
                    </div>
                    <div className='pb-5'>
                      <p className='text-base text-[#6366F1] font-bold uppercase tracking-widest mb-1'>{s.step}</p>
                      <p className='font-bold text-base sm:text-xl mb-1'>{s.title}</p>
                      <p className='text-sm text-gray-400 leading-relaxed'>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className='flex items-center gap-3 mb-7'>
                <div className='w-9 h-9 rounded-lg bg-[#1d9e75]/20 border border-[#1d9e75]/40 flex items-center justify-center'>
                  <i className="ri-user-star-line text-[#34d399] text-xl"></i>
                </div>
                <p className='font-bold text-xl text-[#34d399]'>For Freelancers</p>
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
                      <p className='text-base text-[#1d9e75] font-bold uppercase tracking-widest mb-1'>{s.step}</p>
                      <p className='font-bold text-base sm:text-xl mb-1'>{s.title}</p>
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
              <span className='text-xs sm:text-lg font-semibold text-[#a5a8ff] uppercase tracking-widest'>Browse talent</span>
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
            <span className='text-xs sm:text-lg font-semibold text-[#a5a8ff] uppercase tracking-widest'>Why us</span>
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
          <div className='absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#6366F1]/20 blur-3xl pulse-orb'></div>
          <div className='absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-[#a855f7]/15 blur-3xl pulse-orb' style={{ animationDelay: '1.5s' }}></div>
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
              <Link to='/client/register' className='flex items-center justify-center gap-2 h-14 sm:h-16 px-8 sm:px-12 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-bold text-sm sm:text-lg hover:opacity-90 transition-opacity'>
                <i className="ri-building-line text-xl"></i> Hire Talent
              </Link>
              <Link to='/register' className='flex items-center justify-center gap-2 h-14 sm:h-16 px-8 sm:px-12 rounded-2xl bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] font-bold text-sm sm:text-lg hover:opacity-90 transition-opacity'>
                <i className="ri-user-star-line text-xl"></i> Find Work
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
        <footer className='min-h-[10rem] sm:h-[14rem] flex flex-col sm:flex-row bg-[#15152a] shadow-2xl px-4 sm:px-0'>
          <div className='w-full sm:w-1/2 h-full flex flex-col justify-center items-center py-6 sm:py-0'>
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

      </div>
    </div>
  )
}

export default LandingPage