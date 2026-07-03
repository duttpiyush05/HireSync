import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'
import { toast } from 'react-toastify'

const Applicants = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [jobs, setJobs] = useState([])
  const [isloading, setisLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalProposals, setTotalProposals] = useState()
  const [totalPages, setTotalPages] = useState()
  const { client, setclient } = useContext(ClientDataContext)
  const token = localStorage.getItem('token')
  const [clientId, setClientId] = useState('')
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setclient(response.data.user)
        setClientId(response.data.user._id)
      } catch (err) {
      } finally {
        setTimeout(() => setisLoading(false), 500)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    const getProposals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/proposals/clients/${clientId}?page=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = response.data
        setProposals(data.proposals)
        setTotalPages(data?.totalPages)
        setTotalProposals(data?.countProposals)
      } catch (err) {
        toast.error(err.response.data.message)
      }
    }
    if (clientId) getProposals()
  }, [clientId, page])

  const updateProposalStatus = async (proposalId, status) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/proposals/proposals/${proposalId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(response?.data?.message)
      setProposals(prev =>
        prev.map(p => p._id === proposalId ? { ...p, status } : p)
      )
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const pendingProposals = proposals.filter(p => p.status !== 'rejected' && p.status !== 'accepted')

  if (isloading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
        <div className="w-16 h-16 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div>
        <h3 className='text-white block mt-5 font-bold text-xl'>Please Wait...</h3>
      </div>
    )
  }

  
  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>

      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {pendingProposals.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
            <div className='w-20 h-20 rounded-2xl bg-[#19192f] border border-[#1e2230] flex items-center justify-center mb-6'>
              <i className="ri-file-list-3-line text-4xl text-gray-500"></i>
            </div>
            <h1 className='text-2xl sm:text-4xl font-bold mb-3'>No Pending Applications</h1>
            <p className='text-sm sm:text-lg text-gray-400'>There are currently no applications waiting for your review.</p>
          </div>
        ) : (
          <>
            {/* PAGE HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10'>
              <div>
                <p className='text-xs sm:text-xl font-semibold text-[#a5a8ff] uppercase tracking-widest mb-5'>Review & Hire</p>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Pending Proposals</h1>
                <p className='text-lg text-gray-400 mt-2'>
                  <span className='text-white font-semibold'>{pendingProposals.length}</span> applicants waiting for your review
                </p>
              </div>
              <div className='flex items-center gap-3 bg-[#111827] border border-[#1e2230] rounded-xl px-4 py-3 self-start'>
                <i className="ri-user-search-line text-[#6366F1] text-xl"></i>
                <div>
                  <p className='text-lg text-gray-500'>Total Received</p>
                  <p className='text-lg font-bold'>{totalProposals || pendingProposals.length}</p>
                </div>
              </div>
            </div>

            {/* PROPOSAL CARDS */}
            <div className='grid grid-cols-1 xl:grid-cols-1 gap-5 sm:gap-6'>
              {proposals.map((job) => (
                job.status === 'rejected' || job.status === 'accepted' ? null : (

                  <div
                    key={job._id}
                    className='group relative bg-gradient-to-b from-[#161c33] to-[#11152a] border border-[#23284a] rounded-2xl p-5 sm:p-6 hover:border-[#6366F1]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366F1]/10 overflow-hidden'
                  >

                    {/* Subtle glow on hover */}
                    <div className='absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#6366F1]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                    {/* Header: Avatar + Name + Job */}
                    <div className='flex items-start gap-4 mb-5 relative z-10'>
                      <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#33336e]'>
                      {job.freelancer.profile?.profilePicture ? (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${job.freelancer.profile.profilePicture}`}
                          alt={`${job.freelancer.fullname.firstname} ${job.freelancer.fullname.lastname}`}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] flex items-center justify-center text-xl font-bold'>
                          {job.freelancer.fullname.firstname[0]}{job.freelancer.fullname.lastname[0]}
                        </div>
                      )}
                    </div>
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-lg sm:text-2xl font-bold text-white capitalize truncate'>
                          {job.freelancer.fullname.firstname} {job.freelancer.fullname.lastname}
                        </h2>
                        <p className='text-xs sm:text-base text-gray-400 mt-0.5'>
                          Applied for{' '}
                          <span className='text-[#a5a8ff] font-semibold'>{job.job.title}</span>
                          {' '}• {new Date(job.job.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className='flex-shrink-0 text-base font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30'>
                        Pending
                      </span>
                    </div>

                    {/* Cover Letter */}
                    <div className='mb-5 relative z-10'>
                      <p className='text-base text-gray-500 uppercase tracking-widest mb-2 font-semibold'>Cover Letter</p>
                      <p className='text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3'>
                        {job.coverLetter.length > 150
                          ? job.coverLetter.substring(0, 150) + '...'
                          : job.coverLetter}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className='grid grid-cols-3 gap-3 mb-5 relative z-10'>
                      <div className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-3'>
                        <p className='text-base text-gray-500 mb-1'>Asking</p>
                        <p className='text-sm sm:text-base font-bold text-green-400'>₹{job?.receivingAmt}</p>
                      </div>
                      <div className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-3'>
                        <p className='text-base text-gray-500 mb-1'>Duration</p>
                        <p className='text-sm sm:text-base font-bold text-white truncate'>{job.estCompletion}</p>
                      </div>
                      <div className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-3 cursor-pointer'>
                        <p className='text-base text-gray-500 mb-1'>Portfolio</p>
                        {/* <p className='text-sm sm:text-base font-bold text-[#a5a8ff] truncate uppercase'>
                          {console.log(`${import.meta.env.VITE_BASE_URL}/uploads/proposals/${job?.portfolio?.filename}`)
                          }
                          {`${import.meta.env.VITE_BASE_URL}/uploads/proposals/${job?.portfolio?.filename}` || 'N/A'}</p> */}
                          <button
                          className='font-bold cursor-pointer'
                            onClick={() =>
                              window.open(
                                `${import.meta.env.VITE_BASE_URL}/uploads/proposals/${job.portfolio.filename}`,
                                "_blank"
                              )
                            }
                          >
                          View Proposal
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 relative z-10'>
                      <Link
                        to={`/freelancer/profiles/${job?.freelancer?._id}`}
                        className='flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 rounded-xl bg-[#19192f] border border-[#33336e] hover:bg-[#23234f] transition-colors text-xs sm:text-base font-semibold text-[#a5a8ff]'
                      >
                        <i className="ri-user-line"></i>
                        <span className='hidden sm:inline'>Profile</span>
                        <span className='sm:hidden'>Profile</span>
                      </Link>

                      <button
                        onClick={() => updateProposalStatus(job?._id, "accepted")}
                        className='flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 rounded-xl bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-xs sm:text-base font-semibold text-white'
                      >
                        <i className="ri-checkbox-circle-line"></i>
                        Accept
                      </button>

                      <button
                        onClick={() => updateProposalStatus(job?._id, "rejected")}
                        className='flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 rounded-xl bg-[#2a0a0a] border border-red-800/50 hover:bg-[#3a1010] transition-colors text-xs sm:text-base font-semibold text-red-400'
                      >
                        <i className="ri-close-circle-line"></i>
                        Reject
                      </button>
                    </div>

                  </div>
                )
              ))}
            </div>

            {/* PAGINATION */}
            <div className={`flex justify-between gap-4 mt-8 sm:mt-10 ${proposals?.length !== 0 ? '' : 'hidden'}`}>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className='flex items-center gap-2 px-6 sm:px-10 py-3 text-sm sm:text-lg bg-[#161c33] border border-[#23284a] rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1e2640] transition-colors'
              >
                <i className="ri-arrow-left-s-line"></i>
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className='flex items-center gap-2 px-6 sm:px-10 py-3 text-sm sm:text-lg bg-[#6366F1] hover:bg-[#4f52d9] rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
              >
                Next
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>

          </>
        )}

      </div>
    </div>
  )
}

export default Applicants