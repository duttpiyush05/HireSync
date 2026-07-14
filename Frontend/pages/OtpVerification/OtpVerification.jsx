import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const RESEND_SECONDS = 30
const PAGE_LOAD_DELAY = 3000  
const VERIFY_MIN_DURATION = 4000 

const OtpVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location?.state?.email || ''
  const role = location?.state?.role || ''

  const [pageLoading, setPageLoading] = useState(true)  
  const [isLoading, setIsLoading] = useState(false) 
  const [progress, setProgress] = useState(0)
  const [verifyMessage, setVerifyMessage] = useState('Please wait...')

  const [otp, setOtp] = useState(Array(6).fill(''))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

  const inputsRef = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (pageLoading) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 30) // 30ms * 100 = 3000ms
      
      const t = setTimeout(() => setPageLoading(false), PAGE_LOAD_DELAY)
      return () => {
        clearInterval(interval)
        clearTimeout(t)
      }
    }
  }, [pageLoading])

  useEffect(() => {
    if (isLoading) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 40) // 40ms * 100 = 4000ms
      return () => clearInterval(interval)
    }
  }, [isLoading])

  useEffect(() => {
    if (pageLoading) return
    if (secondsLeft <= 0) return

    timerRef.current = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timerRef.current)
  }, [secondsLeft, pageLoading])

  const focusInput = (index) => {
    const el = inputsRef.current[index]
    if (el) el.focus()
  }

  const handleChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1)

    const next = [...otp]
    next[index] = digit
    setOtp(next)

    if (digit && index < 5) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const next = [...otp]
        next[index] = ''
        setOtp(next)
      } else if (index > 0) {
        focusInput(index - 1)
        const next = [...otp]
        next[index - 1] = ''
        setOtp(next)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusInput(index + 1)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    if (!pasted) return

    const next = Array(6).fill('')
    pasted.split('').forEach((digit, i) => { next[i] = digit })
    setOtp(next)
    focusInput(Math.min(pasted.length, 5))
  }

  const otpValue = otp.join('')
  const isComplete = otpValue.length === 6

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!isComplete) {
      toast.error('Please enter the full 6-digit code')
      return
    }

    setIsVerifying(true)
    setIsLoading(true) 
    setVerifyMessage('Contacting HireSync Auth Server...')

    const msgTimer1 = setTimeout(() => setVerifyMessage('Validating security credentials...'), 1000)
    const msgTimer2 = setTimeout(() => setVerifyMessage('Completing registration handshake...'), 2200)
    const msgTimer3 = setTimeout(() => setVerifyMessage('Authenticating! Preparing redirection...'), 3200)

    const startedAt = Date.now()

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${role}/auth/verify-otp`, {
        email,
        otp: otpValue
      })

      const elapsed = Date.now() - startedAt
      const remaining = VERIFY_MIN_DURATION - elapsed
      if (remaining > 0) {
        await new Promise((res) => setTimeout(res, remaining))
      }

      clearTimeout(msgTimer1)
      clearTimeout(msgTimer2)
      clearTimeout(msgTimer3)

      if (response.status === 201) {
        toast.success('Account Created Successfully!')
        if (role === 'freelancer' || role === 'freelancers') {
          navigate('/fl/login')
        } else {
          navigate('/client/login')
        }
      }
    } catch (err) {
      clearTimeout(msgTimer1)
      clearTimeout(msgTimer2)
      clearTimeout(msgTimer3)
      const elapsed = Date.now() - startedAt
      const remaining = VERIFY_MIN_DURATION - elapsed
      if (remaining > 0) {
        await new Promise((res) => setTimeout(res, remaining))
      }
      toast.error(err?.response?.data?.message || 'Invalid or expired code')
      setOtp(Array(6).fill(''))
      focusInput(0)
    } finally {
      setIsVerifying(false)
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (secondsLeft > 0 || isResending) return

    setIsResending(true)
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/${role}/auth/resend-otp`, { email })
      toast.success('A new code has been sent')
      setOtp(Array(6).fill(''))
      setSecondsLeft(RESEND_SECONDS)
      focusInput(0)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not resend code')
    } finally {
      setIsResending(false)
    }
  }

  const maskedEmail = email
    ? email.replace(/^(.{2}).*(@.*)$/, (_, start, domain) => `${start}${'*'.repeat(4)}${domain}`)
    : ''

  const FullScreenLoader = ({ message, progress }) => (
    <div className='fixed inset-0 bg-[#0c1324] flex flex-col items-center justify-center z-[9999]'>
      <style>{`
        @keyframes logo-pop {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        .logo-anim { animation: logo-pop 0.6s ease-out forwards; }
        .dot1 { animation: dot-bounce 1.2s ease-in-out infinite 0s; }
        .dot2 { animation: dot-bounce 1.2s ease-in-out infinite 0.2s; }
        .dot3 { animation: dot-bounce 1.2s ease-in-out infinite 0.4s; }
      `}</style>

      <div className='absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#6366F1]/15 blur-3xl'></div>
      <div className='absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#a855f7]/10 blur-3xl'></div>

      <div className='relative z-10 flex flex-col items-center gap-8'>
        <div className='logo-anim flex items-center gap-3'>
          <span className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(99,102,241,0.5)]'>
            <i className="ri-flashlight-fill text-white"></i>
          </span>
          <span className='text-4xl font-bold text-white tracking-wider'>HireSync</span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='w-2.5 h-2.5 rounded-full bg-[#6366F1] dot1'></span>
          <span className='w-2.5 h-2.5 rounded-full bg-[#a855f7] dot2'></span>
          <span className='w-2.5 h-2.5 rounded-full bg-[#6366F1] dot3'></span>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <div className='w-56 h-1.5 bg-[#1e2230] rounded-full overflow-hidden shadow-inner'>
            <div 
              className='h-full bg-gradient-to-r from-[#6366F1] via-[#818cf8] to-[#a855f7] rounded-full transition-all duration-300 ease-out'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className='text-xs text-indigo-400 font-semibold tracking-wider'>{progress}%</span>
        </div>

        <p className='text-sm text-gray-300 font-semibold tracking-wide bg-[#111827]/60 px-4 py-2 rounded-full border border-[#1e2230] animate-pulse'>{message}</p>
      </div>
    </div>
  )

  if (pageLoading) {
    return <FullScreenLoader message="Initializing workspace..." progress={progress} />
  }

  if (isLoading) {
    return <FullScreenLoader message={verifyMessage} progress={progress} />
  }

  return (
    <div className='bg-[#0c1324] min-h-screen w-full text-white flex items-center justify-center px-4 py-8 sm:py-10'>

      <div className='w-full max-w-md'>

        <Link to='/' className='block text-center text-2xl font-extrabold mb-8 bg-gradient-to-r from-[#a5a8ff] via-[#c7c9ff] to-[#a855f7] bg-clip-text text-transparent'>
          HireSync
        </Link>

        <div className='rounded-2xl border border-[#1e2230] bg-[#111827] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>

          <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center mb-5 mx-auto'>
            <i className="ri-shield-keyhole-line text-2xl"></i>
          </div>

          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-2'>Verify your email</h1>
          <p className='text-sm sm:text-base text-gray-400 text-center leading-relaxed'>
            We sent a 6-digit code to{' '}
            <span className='text-white font-semibold'>{maskedEmail || 'your email'}</span>.
            Enter it below to continue.
          </p>

          <form onSubmit={handleVerify} className='mt-8'>

            <div className='flex justify-center gap-2 sm:gap-3' onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  autoFocus={index === 0}
                  className='w-11 h-13 sm:w-12 sm:h-14 rounded-xl bg-[#0c1324] border border-[#1e2230] text-center text-xl sm:text-2xl font-bold text-white focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30 transition-colors'
                />
              ))}
            </div>

            <button
              type='submit'
              disabled={!isComplete || isVerifying}
              className='mt-8 h-12 sm:h-14 w-full rounded-xl font-semibold text-base text-white bg-gradient-to-r from-[#6366F1] to-[#a855f7] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isVerifying ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></span>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

          </form>

          <div className='mt-6 text-center'>
            {secondsLeft > 0 ? (
              <p className='text-sm text-gray-500'>
                Resend code in{' '}
                <span className='text-white font-semibold'>0:{secondsLeft.toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className='text-sm text-[#a5a8ff] hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isResending ? 'Sending...' : "Didn't get a code? Resend"}
              </button>
            )}
          </div>

        </div>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Wrong email?{' '}
          <Link to="/register" className='text-[#a5a8ff] hover:underline font-semibold'>Go back</Link>
        </p>

      </div>
    </div>
  )
}

export default OtpVerification