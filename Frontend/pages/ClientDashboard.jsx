import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'

const ClientDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { client, setclient } = useContext(ClientDataContext)
  const token = localStorage.getItem('token')
  const [clientId, setClientId] = useState('')
  const [proposals, setProposals] = useState([])
  const [isloading, setisLoading] = useState(true)

  const [activeJobs, setActiveJobs] = useState(0)
  const [activeContractsCount, setActiveContractsCount] = useState(0)
  const [activeContracts, setActiveContracts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [reviews, setReviews] = useState([])
  const [completedContracts, setCompletedContracts] = useState(0)
  const [pendingProposals, setPendingProposals] = useState([])
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })                
        setclient(response.data.user)
        setClientId(response.data.user._id)
        setActiveContracts(response.data.activeContracts)
        setActiveContractsCount(response.data.activeContractsCount)
        setActiveJobs(response.data.activeJobs)
        setPendingProposals(response.data.pendingProposals)
        setCompletedContracts(response.data.completedContracts)
        setNotifications(response?.data?.notifications || [])
        setReviews(response?.data?.reviews || [])
        setSpent(response.data.spent)
      } catch (err) {
      } finally {
        setTimeout(() => setisLoading(false), 1000)
      }
    }
    getProfile()
  }, [])
  
  useEffect(() => {
    const getProposals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/proposals/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProposals(response.data.proposals)
      } catch (err) {
        toast.error(err?.response?.data?.message)
      }
    }
    if (clientId) getProposals()
  }, [clientId])

  const active_Contracts = []

  if(activeContracts && activeContracts.length > 0) {
    active_Contracts.push(...activeContracts.map((contract, index) => ({
      id: index + 1,
      freelancer: `${contract.freelancer?.fullname?.firstname || 'John Doe'}`,
      role: `${contract.job?.category || ''}`,
      progress: 0,
      status: contract.status,
      avatar: `${contract.freelancer?.fullname?.firstname?.charAt(0)}${contract.freelancer?.fullname?.lastname?.charAt(0)}`,
      color: index === 0 ? '#6366F1' : index === 1 ? '#a855f7' : '#1d9e75'
    })))
  }
  
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

  const review = []  
  if(reviews && reviews.length > 0) {
    review.push(...reviews.map((review, index) => ({  
      name: review.reviewerName || 'Anonymous',
      role: review.reviewerRole || 'Client',
      rating: review.rating || 5,
      comment: review.comment || 'Great work!',
      avatar: review.reviewerName ? `${review.reviewerName.charAt(0)}${review.reviewerName.charAt(1)}` : 'AN',
      color: index === 0 ? '#6366F1' : index === 1 ? '#a855f7' : '#1d9e75'
    })))}

  const handleApproveCompletion = async (contractId) => {
    toast.success('Completion approved!')
  }

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
            <p className='text-xs sm:text-lg font-semibold text-[#a5a8ff] uppercase tracking-widest mb-1'>Client Dashboard</p>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
              Welcome back, {client?.fullname?.firstname}!
            </h1>
            <p className='text-sm sm:text-base text-gray-400 mt-1'>Here's an overview of your hiring pipeline and active engagements.</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link to='/post-job' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#a855f7] font-semibold text-md hover:opacity-90 transition-opacity whitespace-nowrap'>
              <i className="ri-add-line"></i> Post a Job
            </Link>
            <Link to='/client/profile' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#111827] border border-[#1e2230] hover:bg-[#19192f] transition-colors font-semibold text-md whitespace-nowrap'>
              <i className="ri-pencil-line"></i> Edit Profile
            </Link>
            <Link to='/client/logout' className='flex items-center gap-2 h-15 px-5 rounded-xl bg-[#2a0a0a] border border-red-900/50 hover:bg-[#3a1010] transition-colors font-semibold text-md text-red-400 whitespace-nowrap'>
              <i className="ri-logout-box-line"></i> Logout
            </Link>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {[
            { label: 'Active Jobs', value: `${activeJobs}`, subColor: 'text-green-400', icon: 'ri-briefcase-4-line', iconBg: 'bg-[#6366F1]/15 text-[#a5a8ff]', accent: 'border-t-[#6366F1]' },
            { label: 'Active Contracts',value: activeContractsCount, sub: 'Across 8 Projects', subColor: 'text-gray-400', icon: 'ri-file-text-line', iconBg: 'bg-[#1d9e75]/15 text-[#34d399]', accent: 'border-t-[#1d9e75]' },
            { label: 'Completed Projects', value: `${completedContracts}`, sub: 'On track with budget', subColor: 'text-amber-400', icon: 'ri-checkbox-circle-line', iconBg: 'bg-amber-500/15 text-amber-400', accent: 'border-t-amber-500' },
            { label: 'Total Spending', value: `₹${spent.toLocaleString()}`, subColor: 'text-red-400', icon: 'ri-wallet-3-line', iconBg: 'bg-[#d4537e]/15 text-[#f4a0c0]', accent: 'border-t-[#d4537e]' },
          ].map((card, i) => (
            <div key={i} className={`relative bg-[#111827] border border-[#1e2230] border-t-2 ${card.accent} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 overflow-hidden group h-50`}>
              <div className='absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/2 blur-xl'></div>
              <div className='flex items-start justify-between mb-4'>
                <p className='text-sm font-semibold text-gray-400'>{card.label}</p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} flex-shrink-0`}>
                  <i className={`${card.icon} text-lg`}></i>
                </div>
              </div>
              <p className='text-2xl sm:text-3xl font-bold mb-1'>{card.value}</p>
              <p className={`text-xs font-medium ${card.subColor}`}>{card?.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>

          {/* LEFT — proposals + contracts */}
          <div className='xl:col-span-2 flex flex-col gap-5'>

            {/* RECENT PROPOSALS */}
            {pendingProposals.length > 0 && (
              <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                  <div className='flex items-center gap-3'>
                    <h2 className='text-xl font-bold'>Recent Proposals</h2>
                    <span className='text-sm px-3 py-1.5 rounded-full bg-[#6366F1]/20 text-[#a5a8ff] font-semibold'>{pendingProposals.length} pending</span>
                  </div>
                  <Link to='/applicants' className='text-base text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
                </div>
                <div className='divide-y divide-[#1e2230]'>
                  {pendingProposals.slice(0, 3).map((p, i) => (
                    <div key={i} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                      <div className='w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#1e2230]'>
                        {p?.freelancer?.profile?.profilePicture ? (
                          <img src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${p.freelancer.profile.profilePicture}`} alt='' className='w-full h-full object-cover' />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-xs font-bold'>
                            {p?.freelancer?.fullname?.firstname?.[0]}{p?.freelancer?.fullname?.lastname?.[0]}
                          </div>
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-lg font-bold text-white capitalize truncate'>
                          {p?.freelancer?.fullname?.firstname} {p?.freelancer?.fullname?.lastname}
                        </p>
                        <p className='text-base text-[#a5a8ff] truncate'>{p?.job?.title}</p>
                      </div>
                      <div className='text-right flex-shrink-0'>
                        <p className='text-xs text-gray-500'>{new Date(p?.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Link
                        to='/applicants'
                        className='flex-shrink-0 px-4 h-12 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#a5a8ff] text-base font-semibold hover:bg-[#6366F1]/25 transition-colors flex justify-center items-center gap-1 whitespace-nowrap'
                      >
                        Review
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVE CONTRACTS */}           
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <h2 className='text-xl font-bold'>Active Contracts</h2>
                <Link to='/client/contracts' className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>

                {
                    activeContracts.length === 0 && (
                      <div className='mt-5 mb-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                        No Active Contracts
                      </div>
                    )
                }

                {active_Contracts.map((c, i) => (
                  <div key={i} className='px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='flex items-start gap-3 mb-3'>
                      <div className='w-15 h-15 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 capitalize' style={{ background: c.color + '33', border: `1px solid ${c.color}55` }}>
                        <span 
                        className='capitalize'
                        style={{ color: c?.color }}>{c?.avatar}</span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between gap-2'>
                          <p className='text-lg font-bold text-white truncate'>{c.freelancer}</p>
                          {c.status === 'completion_requested' ? (
                            <span className='flex-shrink-0 text-base px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold'>Completion Requested</span>
                          ) : (
                            <span className='flex-shrink-0 text-base px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 font-semibold'>Active</span>
                          )}
                        </div>
                        <p className='text-base text-gray-400 mt-0.5'>{c.role}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='flex-1 h-2 bg-[#0c1324] rounded-full overflow-hidden'>
                        <div
                          className='h-full rounded-full transition-all duration-500'
                          style={{ width: `${c.progress}%`, background: c.progress >= 80 ? '#1d9e75' : c.progress >= 50 ? '#6366F1' : '#d4537e' }}
                        ></div>
                      </div>
                      <span className='text-base font-bold text-white flex-shrink-0'>{c.progress}%</span>
                    </div>
                    {c.status === 'completion_requested' && (
                      <button
                        onClick={() => handleApproveCompletion(c.id)}
                        className='mt-2 w-full h-12 rounded-xl bg-gradient-to-r from-[#1d9e75] to-[#0f6e56] text-base font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2'
                      >
                        <i className="ri-checkbox-circle-line"></i>
                        Approve Completion
                      </button>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* RECENT PAYMENTS */}
            {/* <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <h2 className='text-xl font-bold'>Recent Payments</h2>
                <Link to='/client/payments' className='text-xs text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {payments.map((pay, i) => (
                  <div key={i} className='flex items-center gap-4 px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='w-9 h-9 rounded-xl bg-[#0c1324] border border-[#1e2230] flex items-center justify-center flex-shrink-0'>
                      <i className="ri-money-dollar-circle-line text-amber-400"></i>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-bold text-white'>{pay.name}</p>
                      <p className='text-xs text-gray-500'>{pay.date}</p>
                    </div>
                    <div className='text-right flex-shrink-0'>
                      <p className='text-sm font-bold text-white'>{pay.amount}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${pay.statusStyle}`}>{pay.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

          </div>
          <div className='flex flex-col gap-5'>

            {/* NOTIFICATIONS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-xl font-bold'>Latest Notifications</h2>
                </div>
                <Link 
                to={'/client/notifications'}
                className='text-lg text-[#a5a8ff] hover:underline font-medium'>View all →</Link>
              </div>
              <div className='divide-y divide-[#1e2230]'>

                {
                    _notifications.length === 0 && (
                      <div className='mt-5 mb-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                        No Notifications
                      </div>
                    ) 
                }

                {_notifications.map((n, i) => (
                  <div 
                  key={i} 
                  className={`flex gap-3 px-5 py-4 hover:bg-[#161c2a] transition-colors cursor-pointer ${n.unread ? 'bg-[#6366F1]/03' : ''}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                      <i className={`${n.icon} text-xl`}></i>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <p className='text-lg font-bold text-white leading-tight'>{n.title}</p>
                        {/* {n.unread && <span className='w-2 h-2 rounded-full bg-[#6366F1] flex-shrink-0 mt-1'></span>} */}
                      </div>
                      <p className='text-base text-gray-400 mt-1 leading-relaxed'>{n.message}</p>
                      <p className='text-base text-gray-600 mt-1'>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS RECEIVED */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl overflow-hidden'>
              <div className='flex items-center justify-between px-5 py-4 border-b border-[#1e2230]'>
                <div>
                  <h2 className='text-xl font-bold'>Reviews Received</h2>
                  {/* <div className='flex items-center gap-1.5 mt-1'>
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className="ri-star-fill text-amber-400 text-lg"></i>
                    ))}
                    <span className='text-xs text-gray-400 ml-1'>4.7 avg rating</span>
                  </div> */}
                </div>
              </div>
              <div className='divide-y divide-[#1e2230]'>
                {
                  reviews.length === 0 && (
                    <div className='mt-5 mb-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                      No Reviews Yet
                    </div>
                  )
                }
                {reviews.map((r, i) => (
                  <div key={i} className='px-5 py-4 hover:bg-[#161c2a] transition-colors'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0' style={{ background: r.color + '33' }}>
                        <span style={{ color: r.color }}>{r.avatar}</span>
                      </div>
                      <div className='min-w-0'>
                        <p className='text-lg font-bold text-white truncate'>{r.name}</p>
                        <p className='text-base text-gray-500 truncate'>{r.role}</p>
                      </div>
                      <div className='ml-auto flex-shrink-0 flex gap-0.5'>
                        {[...Array(r.rating)].map((_, j) => (
                          <i key={j} className="ri-star-fill text-amber-400 text-xs"></i>
                        ))}
                      </div>
                    </div>
                    <p className='text-base text-gray-400 italic leading-relaxed'>"{r.comment}"</p>
                  </div>
                ))}

              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-xl font-bold mb-4'>Quick Actions</h2>
              <div className='flex flex-col gap-2'>
                {[
                  { icon: 'ri-add-line', label: 'Post a New Job', to: '/post-job', style: 'bg-[#6366F1]/15 text-[#a5a8ff] border border-[#6366F1]/30 hover:bg-[#6366F1]/25' },
                  { icon: 'ri-user-search-line', label: 'Browse Freelancers', to: '/', style: 'bg-[#1d9e75]/15 text-[#34d399] border border-[#1d9e75]/30 hover:bg-[#1d9e75]/25' },
                  { icon: 'ri-file-list-3-line', label: 'View All Contracts', to: '/client/contracts', style: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25' }
                ].map((action, i) => (
                  <Link
                    key={i}
                    to={action.to}
                    className={`flex items-center gap-3 px-4 h-15 rounded-xl text-base font-semibold transition-colors ${action.style}`}
                  >
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

export default ClientDashboard