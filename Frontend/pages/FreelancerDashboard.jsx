import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FLDataContext } from '../src/context/FLContext'
import { formatDistanceToNow } from 'date-fns'

const FreelancerDashboard = () => {
  const [isloading, setisLoading] = useState(true)
  const [activeContracts, setActiveContacts] = useState([])
  const [pendingProposals, setPendingProposals] = useState([])
  const [notifications, setNotifications] = useState([])
  const [jobs, setJobs]= useState([])
  const [activeContractsCount, setActiveContractsCount] = useState(0)
  const [completedContractsCount, setCompletedContractsCount] = useState(0)
  const [pendingProposalsCount, setPendingProposalsCount] = useState(0)
  const [spent, setSpent] = useState(0)
  const { freelancer, setfreelancer } = useContext(FLDataContext)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setActiveContacts(response.data.activeContracts)
        setPendingProposals(response.data.pendingProposals)
        setNotifications(response.data.notifications)
        setJobs(response?.data?.jobs)
        setActiveContractsCount(response.data.activeContractsCount)
        setCompletedContractsCount(response.data.completedContractsCount)
        setPendingProposalsCount(response.data.pendingProposalsCount)
        setSpent(response.data.spent)
        setfreelancer(response.data.user)
      } catch (err) {
        console.log(err?.response?.data)
      } finally {
        setTimeout(() => setisLoading(false), 2000)
      }
    }
    getProfile()
  }, [])

  const _notifications = []
  
    if(notifications && notifications.length > 0) {
      _notifications.push(...notifications.map((notification, index) => ({
        icon: 'ri-file-list-3-line',
        iconBg: notification.iconBg,
        title: notification.title || 'New Notification',
        message: notification.message || 'You have a new notification',
        time: notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : '',
        unread: notification.unread !== undefined ? notification.unread : true
      })))
    }
    
  const active_Contracts = []

  if(activeContracts && activeContracts.length > 0) {
    active_Contracts.push(...activeContracts.map((contract, index) => ({
      id: contract._id,
      client: `${contract.client?.fullname?.firstname || 'John Doe'}`,
      role: `${contract.job?.category || ''}`,
      progress: 0,
      title : `${contract.job?.title}`,
      status: contract.status,
      avatar: `${contract.freelancer?.fullname?.firstname?.charAt(0)}${contract.freelancer?.fullname?.lastname?.charAt(0)}`,
      color: index === 0 ? '#6366F1' : index === 1 ? '#a855f7' : '#1d9e75'
    })))
  }

   const pending_Proposals  = []
     if(pendingProposals && pendingProposals.length > 0) {
    pending_Proposals.push(...pendingProposals.map((proposal, index) => ({
      id: proposal._id,
      title: `${proposal.job?.title}`, 
      client: `${proposal.client?.companyProfile?.companyName}`, 
      submitted: proposal.createdAt ? formatDistanceToNow(new Date(proposal.createdAt),{addSuffix:true}):'', 
      bid: `₹${proposal.askingAmt}`,
    })))
  }


   const recommendedJobs = []

  if(jobs && jobs.length > 0) {
    recommendedJobs.push(...jobs.map((job, index) => ({
      id: job._id,
      title: `${job?.title}`, 
      company: `${job.client?.companyProfile?.companyName}`, 
      budget: `₹${job.budget?.maxbudget}`, 
      duration: `${job.budget?.duration}`, 
      skills: job.skills, 
      color: '#6366F1',
    })))
  }


  const reviews = [
    { name: 'Sarah Jenkins', company: 'ABC Pvt Ltd', rating: 5, comment: 'Exceptional work, delivered ahead of schedule. Highly recommend!', avatar: 'SJ', color: '#6366F1' },
    { name: 'Marcus Thorne', company: 'TechFlow', rating: 5, comment: 'Great communication and top-tier technical skills.', avatar: 'MT', color: '#1d9e75' },
  ]

  if (isloading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
        <div className="w-16 h-16 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div>
        <h3 className='text-white block mt-5 font-bold text-xl'>Loading Dashboard...</h3>
      </div>
    )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* PAGE HEADER */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 pb-8 border-b border-[#1e2230]'>
          <div>
            <p className='text-xs sm:text-lg font-semibold text-[#a5a8ff] uppercase tracking-widest mb-1'>Freelancer Dashboard</p>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold capitalize'>
              Welcome back, {freelancer?.fullname?.firstname}!
            </h1>
            <p className='text-sm sm:text-base text-gray-400 mt-1'>Here's your project overview and latest activity.</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link to='/find-work' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-semibold text-base hover:opacity-90 transition-opacity whitespace-nowrap'>
              <i className="ri-search-line"></i> Find Work
            </Link>
            <Link to='/freelancer/profile' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#111827] border border-[#1e2230] hover:bg-[#19192f] transition-colors font-semibold text-base whitespace-nowrap'>
              <i className="ri-pencil-line"></i> Edit Profile
            </Link>
            <Link to='/fl/logout' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#2a0a0a] border border-red-900/50 hover:bg-[#3a1010] transition-colors font-semibold text-base text-red-400 whitespace-nowrap'>
              <i className="ri-logout-box-line"></i> Logout
            </Link>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {[
            { label: 'Active Contracts', value: `${activeContractsCount}`, sub: '', subColor: 'text-green-400', icon: 'ri-file-text-line', iconBg: 'bg-[#6366F1]/15 text-[#a5a8ff]', accent: 'border-t-[#6366F1]' },
            { label: 'Pending Proposals', value: `${pendingProposalsCount}`, sub: '', subColor: 'text-amber-400', icon: 'ri-send-plane-line', iconBg: 'bg-amber-500/15 text-amber-400', accent: 'border-t-amber-500' },
            { label: 'Completed Projects', value: `${completedContractsCount}`, sub: '', subColor: 'text-green-400', icon: 'ri-checkbox-circle-line', iconBg: 'bg-[#1d9e75]/15 text-[#34d399]', accent: 'border-t-[#1d9e75]' },
            { label: 'Total Earnings', value: `₹${spent}`, sub: '', subColor: 'text-[#a5a8ff]', icon: 'ri-wallet-3-line', iconBg: 'bg-[#a855f7]/15 text-[#d8b4fe]', accent: 'border-t-[#a855f7]' },
          ].map((card, i) => (
            <div key={i} className={`relative bg-[#111827] border border-[#1e2230] border-t-2 ${card.accent} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 overflow-hidden group h-50`}>
              <div className='flex items-start justify-between mb-4'>
                <p className='text-sm font-semibold text-gray-400'>{card.label}</p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} flex-shrink-0`}>
                  <i className={`${card.icon} text-lg`}></i>
                </div>
              </div>
              <p className='text-2xl sm:text-3xl font-bold mb-1'>{card.value}</p>
              <p className={`text-xs font-medium ${card.subColor}`}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>

          {/* LEFT + MIDDLE */}
          <div className='xl:col-span-2 flex flex-col gap-5'>

            {/* ACTIVE CONTRACTS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <h2 className='text-xl font-bold'>Active Contracts</h2>
                <Link to='/freelancer/contracts' className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {activeContracts.length === 0 && (
                  <div className='py-10 flex justify-center items-center font-bold text-base text-gray-500'>
                    No Active Contracts
                  </div>
                )}
                {active_Contracts.map((c, i) => (
                  <Link to={`/freelancer/contracts/${c.id}`} key={i} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors group'>
                    <div className='w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 capitalize' style={{ background: c.color + '33', border: `1px solid ${c.color}55` }}>
                      <span style={{ color: c.color }}>{c.avatar}</span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between gap-2 mb-1'>
                        <p className='text-base font-bold text-white truncate'>{c?.title}</p>
                        <span className='flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 font-semibold capitalize'>{c.status}</span>
                      </div>
                      <p className='text-sm text-gray-400 mb-2'>Client: {c.client}</p>
                      <div className='flex items-center gap-3'>
                        <div className='flex-1 h-1.5 bg-[#0c1324] rounded-full overflow-hidden'>
                          <div
                            className='h-full rounded-full transition-all duration-500'
                            style={{ width: `${c.progress}%`, background: c.color }}
                          ></div>
                        </div>
                        <span className='text-sm font-bold text-white flex-shrink-0'>{c.progress}%</span>
                      </div>
                    </div>
                    <i className="ri-arrow-right-s-line text-gray-600 group-hover:text-gray-300 transition-colors"></i>
                  </Link>
                ))}
              </div>
            </div>

            {/* PENDING PROPOSALS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div className='flex items-center gap-3'>
                  <h2 className='text-xl font-bold'>Pending Proposals</h2>
                  <span className='text-sm px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'>{pendingProposals.length}</span>
                </div>
                <Link to='/fl/proposals' className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {pending_Proposals.length === 0 && (
                  <div className='py-10 flex justify-center items-center font-bold text-base text-gray-500'>
                    No Pending Proposals
                  </div>
                )}
                {pending_Proposals.map((p, i) => (
                  <div key={i} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0'>
                      <i className="ri-send-plane-line text-amber-400 text-xl"></i>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-base capitalize font-bold text-white truncate'>{p.title}</p>
                      <p className='text-sm text-gray-400 mt-0.5'>{p.client} • Submitted {p.submitted}</p>
                    </div>
                    <div className='text-right flex-shrink-0'>
                      <p className='text-base font-bold text-green-400'>{p.bid}</p>
                      <span className='text-sm text-amber-400 font-medium'>Pending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EARNINGS OVERVIEW */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-xl font-bold'>Earnings Overview</h2>
                <span className='text-sm text-[#a5a8ff] bg-[#6366F1]/15 border border-[#6366F1]/30 px-3 py-1 rounded-full font-semibold'>2026</span>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[
                  { label: 'This Month', value: `₹${0}`, sub: '', subColor: 'text-green-400' },
                  { label: 'This Year', value: `₹${0}`, sub: '', subColor: 'text-green-400' },
                  { label: 'Lifetime', value: `₹${spent}`, sub: '', subColor: 'text-[#a5a8ff]' },
                ].map((e, i) => (
                  <div key={i} className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-4'>
                    <p className='text-xs text-gray-500 uppercase tracking-widest mb-2'>{e.label}</p>
                    <p className='text-2xl font-bold text-white'>{e.value}</p>
                    <p className={`text-xs mt-1 font-medium ${e.subColor}`}>{e.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED JOBS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div>
                  <h2 className='text-xl font-bold'>Recommended for You</h2>
                  <p className='text-sm text-gray-500 mt-0.5'>Based on your skills and profile</p>
                </div>
                <Link to='/find-work' className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {recommendedJobs.map((job, i) => (
                  <div key={i} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors group'>
                    <div className='w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0' style={{ background: job.color + '25', border: `1px solid ${job.color}44` }}>
                      <i className="ri-briefcase-line text-xl" style={{ color: job.color }}></i>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-base font-bold capitalize text-white truncate'>{job.title}</p>
                      <p className='text-sm text-gray-400 mt-0.5'>{job.company} • {job.duration}</p>
                      <div className='flex gap-2 mt-2 flex-wrap'>
                        {job.skills.map((s, j) => (
                          <span key={j} className='text-sm px-2 py-2.5 rounded-md bg-[#19192f] border border-[#33336e] text-gray-300'>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className='text-right flex-shrink-0 flex flex-col items-end gap-2'>
                      <p className='text-base font-bold text-green-400'>{job.budget}</p>
                      <Link
                        to={`/jobs/${job.id}`}
                        className='text-sm px-4 h-8 rounded-lg flex items-center justify-center font-semibold transition-colors'
                        style={{ background: job.color + '25', color: job.color, border: `1px solid ${job.color}44` }}
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-5'>

            {/* NOTIFICATIONS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-xl font-bold'>Latest Notifications</h2>
                </div>
                <Link to='/fl/notifications' className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {notifications.length === 0 && (
                  <div className='py-10 flex justify-center items-center font-bold text-base text-gray-500'>
                    No Notifications
                  </div>
                )}
                {_notifications.map((n, i) => (
                  <div key={i} className={`flex gap-3 px-5 py-4 hover:bg-[#161c2a] transition-colors cursor-pointer ${n.unread ? 'bg-[#6366F1]/03' : ''}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                      <i className={`${n.icon} text-xl`}></i>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <p className='text-base font-bold text-white leading-tight'>{n.title}</p>
                      </div>
                      <p className='text-sm text-gray-400 mt-1 leading-relaxed line-clamp-2'>{n.message}</p>
                      <p className='text-sm text-gray-600 mt-1'>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div>
                  <h2 className='text-xl font-bold'>Reviews</h2>
                  <div className='flex items-center gap-1.5 mt-1'>
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className="ri-star-fill text-amber-400 text-lg"></i>
                    ))}
                    <span className='text-xs text-gray-400 ml-1'>4.9 avg • 12 reviews</span>
                  </div>
                </div>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {reviews.length === 0 && (
                  <div className='py-10 flex justify-center items-center font-bold text-base text-gray-500'>
                    No Reviews Yet
                  </div>
                )}
                {reviews.map((r, i) => (
                  <div key={i} className='px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0' style={{ background: r.color + '33' }}>
                        <span style={{ color: r.color }}>{r.avatar}</span>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-base font-bold text-white truncate'>{r.name}</p>
                        <p className='text-sm text-gray-500 truncate'>{r.company}</p>
                      </div>
                      <div className='ml-auto flex-shrink-0 flex gap-0.5'>
                        {[...Array(r.rating)].map((_, j) => (
                          <i key={j} className="ri-star-fill text-amber-400 text-xs"></i>
                        ))}
                      </div>
                    </div>
                    <p className='text-sm text-gray-400 italic leading-relaxed'>"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-xl font-bold mb-4'>Quick Actions</h2>
              <div className='flex flex-col gap-2'>
                {[
                  { icon: 'ri-search-line', label: 'Browse New Jobs', to: '/find-work', style: 'bg-[#6366F1]/15 text-[#a5a8ff] border border-[#6366F1]/30 hover:bg-[#6366F1]/25' },
                  { icon: 'ri-file-list-3-line', label: 'My Proposals', to: '/fl/proposals', style: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25' },
                  { icon: 'ri-user-star-line', label: 'My Profile', to: '/freelancer/profile', style: 'bg-[#d4537e]/15 text-[#f4c0d1] border border-[#d4537e]/30 hover:bg-[#d4537e]/25' },
                ].map((action, i) => (
                  <Link key={i} to={action.to} className={`flex items-center gap-3 px-4 h-15 rounded-xl text-base font-semibold transition-colors ${action.style}`}>
                    <i className={`${action.icon} text-xl`}></i>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default FreelancerDashboard