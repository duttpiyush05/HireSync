import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'

const JobInfo = () => {
  const { jobId } = useParams()
  const token = localStorage.getItem('token')

  const [isloading, setisLoading] = useState(true)
  const [role, setRole] = useState()

  const [job, setJob] = useState()
  const [totalProposals, setTotalProposals] = useState(0)
  const [newProposals, setNewProposals] = useState(12)
  const [interviewedCount, setInterviewedCount] = useState(0)
  const [pendingInterviews, setPendingInterviews] = useState(0)
  const [shortlistedCount, setShortlistedCount] = useState(0)
  const [client, setClient] = useState()

  const [applicants, setApplicants] = useState([
    {
      freelancer: {
        fullname: { firstname: 'Alex', lastname: 'Chen' },
        profile: { title: 'Full Stack Architect', jobSuccess: 98 }
      },
      status: 'shortlisted'
    },
    {
      freelancer: {
        fullname: { firstname: 'Elena', lastname: 'Rodriguez' },
        profile: { title: 'React Specialist', jobSuccess: 100 }
      },
      status: 'interviewed'
    }
  ])
  const [isPublic, setIsPublic] = useState(true)
  const [totalSpend, setTotalSpend] = useState(0)
  const [jobsPosted, setJobsPosted] = useState(0)
  const [hireRate, setHireRate] = useState(0)
  const [avgResponse, setAvgResponse] = useState('0')
  const [activeContracts, setActiveContracts] = useState([
    { title: 'UI/UX Redesign', status: 'active', timeLeft: '2 weeks left' },
    { title: 'AWS Security Audit', status: 'completed', timeLeft: '' }
  ])
  const [recommendedMatches, setRecommendedMatches] = useState([
    { fullname: { firstname: 'Sarah', lastname: 'Connor' }, badge: 'Top Rated Plus', expertise: 'Expert React' },
    { fullname: { firstname: 'James', lastname: 'Kim' }, badge: '4.9/5', expertise: '30+ React Projects' }
  ])

  useEffect(() => {
    const getJobInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/jobInfo/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })      
        setJob(response.data?.jobs?.job)
        setTotalProposals(response.data?.jobs?.proposalsCount || 0)
        setRole(response.data?.jobs?.role)
        setClient(response?.data?.jobs?.job?.client)
        // setNewProposals(response.data.stats?.newProposals || 0)
        // setInterviewedCount(response.data.stats?.interviewed || 0)
        // setPendingInterviews(response.data.stats?.pending || 0)
        // setShortlistedCount(response.data.stats?.shortlisted || 0)
        // setApplicants(response?.data?.applicants || [])
        // setIsPublic(response?.data?.visibility?.isPublic ?? true)
        // setTotalSpend(response?.data?.hiringStats?.totalSpend || 0)
        // setJobsPosted(response?.data?.hiringStats?.jobsPosted || 0)
        // setHireRate(response?.data?.hiringStats?.hireRate || 0)
        // setAvgResponse(response?.data?.hiringStats?.avgResponse || '')
        // setActiveContracts(response?.data?.activeContracts || [])
        // setRecommendedMatches(response?.data?.recommendedMatches || [])
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        setTimeout(() => setisLoading(false), 1000)
      }
    }
    if (jobId) getJobInfo()
  }, [jobId])

  const _applicants = []

  if (applicants && applicants.length > 0) {
    _applicants.push(...applicants.map((a, index) => ({
      id: index + 1,
      name: `${a.freelancer?.fullname?.firstname || 'John'} ${a.freelancer?.fullname?.lastname || 'Doe'}`,
      role: `${a.freelancer?.profile?.title || 'Freelancer'}`,
      successRate: a.freelancer?.profile?.jobSuccess || 0,
      status: a.status,
      avatar: `${a.freelancer?.fullname?.firstname?.charAt(0)}${a.freelancer?.fullname?.lastname?.charAt(0)}`,
      color: index === 0 ? '#6366F1' : index === 1 ? '#a855f7' : '#1d9e75'
    })))
  }

  const _recommendedMatches = []

  if (recommendedMatches && recommendedMatches.length > 0) {
    _recommendedMatches.push(...recommendedMatches.map((m, index) => ({
      id: index + 1,
      name: `${m.fullname?.firstname || 'John'} ${m.fullname?.lastname || 'Doe'}`,
      subtitle: `${m.badge || 'Top Rated'} • ${m.expertise || ''}`,
      avatar: `${m.fullname?.firstname?.charAt(0)}${m.fullname?.lastname?.charAt(0)}`,
      color: index === 0 ? '#6366F1' : index === 1 ? '#a855f7' : '#1d9e75'
    })))
  }

  const _activeContracts = []

  if (activeContracts && activeContracts.length > 0) {
    _activeContracts.push(...activeContracts.map((c, index) => ({
      id: index + 1,
      label: c.title || '',
      timeLeft: c.status === 'completed' ? 'Complete' : c.timeLeft || ''
    })))
  }

  const handleCloseJob = async () => {
    const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/jobs/closeJob/${jobId}`, {},
      {
        headers:{Authorization : `Bearer ${token}`}
      }
    )
          console.log(res)
  }

  if (isloading) {
    return (
      <div className='h-screen flex flex-col justify-center items-center bg-[#0c1324]'>
        <div className='w-16 h-16 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin'></div>
        <h3 className='text-white block mt-5 font-bold text-xl'>Loading Job...</h3>
      </div>
    )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* PAGE HEADER */}
        <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8 pb-8 border-b border-[#1e2230]'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <span 
              className={`
              ${job?.status==='open' || job?.status==='in_progress' ? 'text-sm px-3 py-1 rounded-full bg-[#1d9e75]/15 text-[#34d399] font-semibold uppercase tracking-wide' : 'text-sm px-3 py-1 rounded-full bg-[#f13838]/15 text-[#ab0000] font-semibold uppercase tracking-wide'}
              `}>
                ● {job?.status || 'Active'}
              </span>
            </div>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl capitalize font-bold'>{job?.title}</h1>
            <p className='text-sm sm:text-base text-gray-400 mt-1'>Posted {
              job?.createdAt ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }) : ''} </p>
          </div>
          {
            role==='client' && (
              <div className='flex flex-wrap gap-3'>

            <Link 
            to={`/edit-job/${jobId}`} 
            className={
              `
              ${(job?.status==='open') ? 'flex items-center gap-2 h-15 px-5 rounded-xl bg-[#111827] border border-[#1e2230] hover:bg-[#19192f] transition-colors font-semibold text-md whitespace-nowrap' : 'hidden'}
              `
              }>
              <i className={`
              ${job?.status==='open' ? 'ri-pencil-line' : 'hidden'}
                `}></i> 
                {
                  job?.status==='open' ? 'Edit Job' : ''
                }
                
            </Link>

            <button 
            disabled={job?.status==='closed'}
            onClick={handleCloseJob} 
            className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#2a0a0a] border border-red-900/50 hover:bg-[#3a1010] transition-colors font-semibold text-md text-red-400 whitespace-nowrap'>
              <i className={`
              ${job?.status==='open' || job?.status==='in_progress' ? 'ri-close-line' : 'hidden'}
                
                `}></i>
              {
                job?.status==='open' || job?.status==='in_progress' ? 'Close Job' : 'Closed'
              }
            </button>
          </div>
            )
          }
          {
            role==='freelancer' && (
              <div className='flex flex-col items-start '>
                <label 
                className='mb-4 text-gray-500 font-bold pl-2'
                htmlFor="">About Client</label>
                <div className='flex flex-wrap gap-3'>

            <Link 
            to={`/client/profiles/${client._id}`}
            className={
              'flex items-center gap-2 h-15 px-5 rounded-xl bg-[#111827] border border-[#1e2230] hover:bg-[#19192f] transition-colors font-semibold text-md whitespace-nowrap'
              }>
              <i className=''
                ></i> 
                {client?.fullname?.firstname} {client?.fullname?.lastname}
            </Link>
            <div 
            className={
              'flex items-center gap-2 h-15 px-5 rounded-xl bg-[#111827] border border-[#1e2230] hover:bg-[#19192f] transition-colors font-semibold text-md whitespace-nowrap'
              }>
              <i className=''
                ></i> 
                {client?.email}
            </div>

            <button 
            disabled={job?.status==='closed'}
            onClick={handleCloseJob} 
            className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#2a0a0a] border border-red-900/50 hover:bg-[#3a1010] transition-colors font-semibold text-md text-red-400 whitespace-nowrap'>
              <i className={`
              ${job?.status==='open' ? 'ri-close-line' : 'hidden'}
                
                `}></i>
              {
                job?.status==='open' ? 'Close Job' : 'Closed'
              }
            </button>
          </div>
              </div>
              
            )
          }
        </div>

        {/* STAT CARDS */}
        {
          role==='client' && (
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
          {[
            { label: 'Total Proposals', value: `${totalProposals}`, sub: '', subColor: 'text-green-400', icon: 'ri-file-list-3-line', iconBg: 'bg-[#6366F1]/15 text-[#a5a8ff]', accent: 'border-t-[#6366F1]' },
            { label: 'Interviewed', value: `${interviewedCount}`, sub: pendingInterviews ? `${pendingInterviews} pending` : '', subColor: 'text-gray-400', icon: 'ri-user-voice-line', iconBg: 'bg-[#1d9e75]/15 text-[#34d399]', accent: 'border-t-[#1d9e75]' },
            { label: 'Shortlisted', value: `${shortlistedCount}`, sub: '', subColor: 'text-amber-400', icon: 'ri-star-line', iconBg: 'bg-amber-500/15 text-amber-400', accent: 'border-t-amber-500' },
          ].map((card, i) => (
            <div key={i} className={`relative bg-[#111827] border border-[#1e2230] border-t-2 ${card.accent} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 overflow-hidden group h-50`}>
              <div className='absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/2 blur-xl'></div>
              <div className='flex items-start justify-between mb-4'>
                <p className='text-base font-semibold text-gray-400'>{card.label}</p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} flex-shrink-0`}>
                  <i className={`${card.icon} text-lg`}></i>
                </div>
              </div>
              <p className='text-2xl sm:text-3xl font-bold mb-1'>{card.value}</p>
              <p className={`text-xs font-medium ${card.subColor}`}>{card?.sub}</p>
            </div>
          ))}
        </div>
          )
        }

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>

          {/* LEFT — overview + applicants */}
          <div className='xl:col-span-2 flex flex-col gap-5'>

            {/* JOB OVERVIEW */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <h2 className='text-2xl font-bold'>Job Overview</h2>
                <div className='flex gap-8 text-right'>
                  <div>
                    <p className='text-base text-gray-500 mb-0.5'>BUDGET</p>
                    <p className='text-base font-bold text-[#34d399]'>₹{job?.budget?.maxbudget}</p>
                  </div>
                  <div>
                    <p className='text-base text-gray-500 mb-0.5'>DURATION</p>
                    <p className='text-base font-bold text-white'>{job?.budget?.duration}</p>
                  </div>
                </div>
              </div>
              <div className='px-5 py-4'>
                <p className='text-base font-semibold text-gray-500 tracking-wide mb-2'>DESCRIPTION</p>
                {(job?.description || '').split('\n').filter(Boolean).map((paragraph, idx) => (
                  <p key={idx} className='text-base break-words pr-7 text-gray-300 leading-relaxed mb-3 last:mb-4'>
                    {paragraph}
                  </p>
                ))}
                <p className='text-base font-semibold text-gray-500 tracking-wide mb-2'>REQUIRED SKILLS</p>
                <div className='flex flex-wrap gap-2'>
                  {(job?.skills || []).map((skill) => (
                    <span key={skill} className='rounded-lg bg-[#0c1324] border border-[#1e2230] px-3 py-1 text-base text-gray-300'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* TOP APPLICANTS */}
            {
              role==='client' && (
                <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              {/* <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <h2 className='text-2xl font-bold'>Top Applicants</h2>
                <Link to='/applicants' className='text-base text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div> */}
              {/* <div className='divide-y divide-[#1e2230]'>

                {
                  _applicants.length === 0 && (
                    <div className='mt-5 mb-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                      No Applicants Yet
                    </div>
                  )
                }

                {_applicants.map((a) => (
                  <div key={a.id} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0' style={{ background: a.color + '33', border: `1px solid ${a.color}55` }}>
                      <span style={{ color: a.color }}>{a.avatar}</span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-lg font-bold text-white capitalize truncate'>{a.name}</p>
                      <p className='text-base text-gray-400 truncate'>{a.role} • {a.successRate}% Job Success</p>
                    </div>
                    {a.status === 'shortlisted' ? (
                      <span className='flex-shrink-0 text-base px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 font-semibold'>Shortlisted</span>
                    ) : a.status === 'interviewed' ? (
                      <span className='flex-shrink-0 text-base px-2 py-0.5 rounded-full bg-[#6366F1]/15 text-[#a5a8ff] border border-[#6366F1]/30 font-semibold'>Interviewed</span>
                    ) : (
                      <span className='flex-shrink-0 text-base px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30 font-semibold'>Pending</span>
                    )}
                    <i className="ri-arrow-right-s-line text-gray-500 text-xl flex-shrink-0"></i>
                  </div>
                ))}

              </div> */}
            </div>
              )
            }

          </div>

          {/* RIGHT — visibility, hiring stats, matches */}
          {
            role==='client' && (
              <div className='flex flex-col gap-5'>

            {/* VISIBILITY SETTINGS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <div className='flex items-center justify-between mb-1'>
                <h2 className='text-2xl font-bold'>Visibility Settings</h2>
                <div className={`h-6 w-11 rounded-full relative transition-colors ${isPublic ? 'bg-[#1d9e75]' : 'bg-[#1e2230]'}`}>
                  <div
                  onClick={()=> setIsPublic(!isPublic)} 
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${isPublic ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
              <p className='text-base text-gray-500 mb-3'>Who can see this job posting</p>
              <div className='rounded-xl bg-[#0c1324] border border-[#1e2230] p-3'>
                <p className='text-base font-bold text-white mb-1'>
                  <i className="ri-global-line mr-1"></i> {isPublic ? 'Currently Public' : 'Currently Private'}
                </p>
                <p className='text-base text-gray-500 leading-relaxed'>
                  {isPublic
                    ? 'Public jobs appear in search results and can be shared via link. Switching to private will hide this job from search.'
                    : 'This job is hidden from search results and only visible via direct link.'}
                </p>
              </div>
            </div>

            {/* MY HIRING STATS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-2xl font-bold mb-4'>My Hiring Stats</h2>
              <div className='flex flex-col gap-2.5 text-base'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Total Spend</span>
                  <span className='font-bold text-white text-lg'>₹{totalSpend.toLocaleString()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Jobs Posted</span>
                  <span className='font-bold text-white text-lg'>{jobsPosted}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Hire Rate</span>
                  <span className='font-bold text-[#34d399] text-lg'>{hireRate}%</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Avg. Response</span>
                  <span className='font-bold text-white text-lg'>{avgResponse || '—'}</span>
                </div>
              </div>

            </div>


          </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default JobInfo