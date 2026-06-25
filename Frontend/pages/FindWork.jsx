import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const FindWork = () => {
  const [jobs, setJobs] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [isloading, setisLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [totalJobs, settotalJobs] = useState(1)

  const [searchTitle, setSearchTitle] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [budgetFilter, setBudgetFilter] = useState('Any Budget')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/all-jobs?page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response?.data
        setJobs(data.jobs.jobs)
        settotalPages(data.jobs.totalPages)
        settotalJobs(data.jobs.totalJobs)
      } catch (error) {
        toast.error(error?.response?.data)
      }
      finally {
        setTimeout(() => {
          setisLoading(false)
        }, 3000)
      }
    }
    fetchJobs()
  }, [page])

  const filteredJobs = jobs?.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchesCategory = category === 'All Categories' || job.category === category
    const matchesBudget = (() => {
      if (budgetFilter === 'Any Budget') return true
      if (budgetFilter === 'Under ₹500') return job.budget.maxbudget < 500
      if (budgetFilter === '₹500 - ₹2,000') return job.budget.minbudget >= 500 && job.budget.maxbudget <= 2000
      if (budgetFilter === '₹2,000 - ₹5,000') return job.budget.minbudget >= 2000 && job.budget.maxbudget <= 5000
      if (budgetFilter === 'Above ₹5,000') return job.budget.minbudget > 5000
      return true
    })()
    return matchesTitle && matchesCategory && matchesBudget
  })

  const accentThemes = [
    { ring: 'hover:border-[#5b94ff]', glow: 'hover:shadow-blue-500/20', badge: 'bg-blue-500/15 text-blue-300', tag: 'border-[#3a5fc4] bg-[#1a2547]' },
    { ring: 'hover:border-[#1d9e75]', glow: 'hover:shadow-emerald-500/20', badge: 'bg-emerald-500/15 text-emerald-300', tag: 'border-[#1d6a52] bg-[#142a25]' },
    { ring: 'hover:border-[#d4537e]', glow: 'hover:shadow-pink-500/20', badge: 'bg-pink-500/15 text-pink-300', tag: 'border-[#8a3a57] bg-[#2a1722]' },
    { ring: 'hover:border-[#ba7517]', glow: 'hover:shadow-amber-500/20', badge: 'bg-amber-500/15 text-amber-300', tag: 'border-[#8a5d1f] bg-[#2a2014]' },
  ]

  if (isloading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
        <h3 className='text-white block mt-5 font-bold text-xl text-center px-4'>Fetching Available Jobs Please Wait...</h3>
      </div>
    )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>

        <h1 className='text-2xl sm:text-3xl font-bold p-1 mt-8 sm:mt-10'>Available Jobs</h1>

        {/* FILTER BAR */}
        <div className='flex flex-col lg:flex-row gap-3 mt-5 mb-6'>

          <div className='relative flex-1'>
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
            <input
              type='text'
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder='Search by job title...'
              className='w-full bg-[#161c33] border border-[#1e2230] rounded-lg h-12 pl-11 pr-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#5b94ff] transition-colors'
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='bg-[#161c33] border border-[#1e2230] rounded-lg h-12 px-4 text-sm sm:text-base text-white focus:outline-none focus:border-[#5b94ff] transition-colors cursor-pointer w-full sm:w-48'
            >
              <option>All Categories</option>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Design</option>
              <option>Writing</option>
              <option>Marketing</option>
              <option>Data Science</option>
            </select>

            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className='bg-[#161c33] border border-[#1e2230] rounded-lg h-12 px-4 text-sm sm:text-base text-white focus:outline-none focus:border-[#5b94ff] transition-colors cursor-pointer w-full sm:w-48'
            >
              <option>Any Budget</option>
              <option>Under ₹500</option>
              <option>₹500 - ₹2,000</option>
              <option>₹2,000 - ₹5,000</option>
              <option>Above ₹5,000</option>
            </select>
          </div>

        </div>

        <div>
          {
            filteredJobs?.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-center px-4'>
                <h1 className='text-2xl sm:text-4xl font-bold mb-4'>No Jobs Found</h1>
                <p className='text-sm sm:text-lg text-gray-400'>There are currently no jobs available. Please check back later.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5'>
                {
                  filteredJobs?.map((job, idx) => {
                    const theme = accentThemes[idx % accentThemes.length]
                    return (
                      <div
                        key={job._id}
                        className={`group bg-gradient-to-b from-[#161c33] to-[#11152a] border border-[#23284a] rounded-xl shadow-lg flex flex-col w-full min-w-0 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl ${theme.glow} ${theme.ring}`}
                      >

                        <div className='flex flex-col gap-2 w-full min-w-0 p-4 sm:p-5 h-full'>

                          <div className='flex items-start justify-between gap-2'>
                            <h2 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight capitalize break-words'>{job.title}</h2>
                            <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${theme.badge}`}>ACTIVE</span>
                          </div>

                          <div className='flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-400'>
                            <span>Posted {new Date(job.createdAt).toLocaleDateString()} by</span>
                            <Link
                              to={`/client/profiles/${job?.client?._id}`}
                              className='text-blue-400 font-semibold hover:underline cursor-pointer'
                            >
                              {job.client.fullname.firstname} {job.client.fullname.lastname}
                            </Link>
                          </div>

                          <p className='text-sm sm:text-base font-medium mt-3 mb-4 break-words text-gray-200'>
                            {job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
                          </p>

                          <h3 className='font-medium text-base sm:text-lg text-gray-300'>
                            Required Expertise
                          </h3>

                          <div className='mt-3 gap-2 flex flex-wrap min-w-0'>
                            {job.skills.map((skill, index) => (
                              <span key={index} className={`text-xs sm:text-sm px-3 py-1.5 rounded-md border font-medium text-gray-200 break-words ${theme.tag}`}>{skill}</span>
                            ))}
                          </div>

                          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-400 text-sm mt-5 min-w-0'>
                            <div className='text-sm sm:text-base flex flex-col gap-1 bg-[#0e1226] p-3 border border-[#23284a] rounded-lg min-w-0'>
                              <span>Budget</span>
                              <span className='font-semibold text-white truncate'>${job.budget.minbudget}-${job.budget.maxbudget}</span>
                            </div>
                            <div className='text-sm sm:text-base flex flex-col gap-1 bg-[#0e1226] p-3 border border-[#23284a] rounded-lg min-w-0'>
                              <span>Duration</span>
                              <span className='font-semibold text-white truncate'>{job.budget.duration}</span>
                            </div>
                            <div className='text-sm sm:text-base flex flex-col gap-1 bg-[#0e1226] p-3 border border-[#23284a] rounded-lg min-w-0'>
                              <span>Experience</span>
                              <span className='font-semibold text-white truncate'>{job.budget.xplevel}</span>
                            </div>
                          </div>

                          <div className='flex-1'></div>

                          <Link
                            to={`/jobs/${job._id}`}
                            className='bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm sm:text-base font-semibold rounded-lg h-12 sm:h-14 cursor-pointer flex items-center justify-center w-full mt-6'
                          >
                            View Details
                          </Link>

                        </div>

                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>

        <div className={filteredJobs?.length !== 0 ? `flex justify-between gap-4 p-6 sm:p-10` : 'hidden'}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className='px-6 sm:px-10 py-3 text-sm sm:text-lg bg-[#262634] rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#33334a] disabled:hover:bg-[#262634]'
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className='px-6 sm:px-10 py-3 text-sm sm:text-lg bg-blue-500 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-blue-600 disabled:hover:bg-blue-500'
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default FindWork