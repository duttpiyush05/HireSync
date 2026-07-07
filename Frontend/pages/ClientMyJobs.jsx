import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ClientMyJobs = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [totalJobs, setTotalJobs] = useState()
  const [totalPages, setTotalPages] = useState(1)

  const [searchTitle, setSearchTitle] = useState('')
  const [openFilter, setOpenFilter] = useState('All')
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => { 
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/my-jobs`, {  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.data;        
        setJobs(data.jobs.jobs);
        setTotalJobs(data?.jobs?.totalJobs)
        setTotalPages(data?.jobs?.totalPages)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      finally {
        setTimeout(()=>
        {
          setIsLoading(false)
        },2000)
      }
    }
    fetchJobs();
  }, [currentPage])

  const filteredJobs = jobs?.filter((job)=>
  {
    const titleMatched = job?.title?.toLowerCase().includes(searchTitle.toLowerCase())
    const openMatched = job?.status?.toLowerCase() === openFilter.toLowerCase() || openFilter==='All'
  
    return (titleMatched && openMatched)
  })
    const [isloading, setisLoading] = useState(true)
    
       useEffect(()=>
       {
          const settingisLoading = ()=>
          {
             setTimeout(()=>
             {
                setisLoading(false)
             }, 0)
          }
          settingisLoading()
       },[])
    
       if(isLoading)
        {
          return (
            <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
      
            <div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "2s" }}
            ></div>
      
            <h3 className='text-white block mt-5 font-bold text-xl'>Fetching your Jobs, Please Wait...</h3>
            </div>
          )
        }

  const filters = ['All', 'Open','Closed']

  const statusStyles = {
    Active: 'bg-green-500/20 text-green-400',
    Draft: 'bg-gray-500/20 text-gray-300',
    Closed: 'bg-red-500/20 text-red-400',
  }
  
  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* HEADER */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6'>
          <div>
            <h1 className='text-2xl sm:text-4xl font-bold'>Manage Jobs</h1>
            <p className='text-sm text-[#6366F1] mt-1'>Review your active postings and handle incoming proposals.</p>
          </div>
          <Link 
          to={'/post-job'}
          className='flex items-center gap-2 px-5 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white flex-shrink-0 whitespace-nowrap'>
            <i className="ri-add-line"></i>
            Post a Job
          </Link>
        </div>

        {/* FILTERS + SEARCH */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6'>

          <div className='flex bg-[#111827] border border-[#1e2230] rounded-lg p-1 w-fit overflow-x-auto'>
            {filters.map((f) => (
              <button
                key={f}
                value={openFilter}
                onClick={() => setOpenFilter(f)}
                className={`px-4 sm:px-10 h-12 rounded-md text-md font-semibold transition-colors whitespace-nowrap ${
                  openFilter.toLowerCase() === f.toLowerCase() 
                  ? 'bg-[#6366F1] text-white' 
                  : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className='relative w-full lg:w-72'>
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"></i>
            <input
              value={searchTitle}
              type='text'
              onChange={(e)=>setSearchTitle(e.target.value)}
              placeholder='Search by job title or keyword...'
              className='w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 pl-11 pr-4 text-md text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
            />
          </div>
        </div>

        <div className='bg-[#111827] border border-[#1e2230] rounded-xl overflow-hidde mb-6 py-10'>

          <div className='hidden md:grid grid-cols-[2.5fr_2fr_1fr_1.2fr_1.2fr] gap-4 px-5 py-3 border-b border-[#1e2230] text-md text-gray-500 uppercase tracking-widest font-semibold'>
            <span>Job title</span>
            <span>Date posted</span>
            <span>Status</span>
            <span>Proposals</span>
            <span className='text-right'>Actions</span>
          </div>

          {/* Rows */}
          <div className='flex flex-col'>
            {
              filteredJobs.length === 0 && (
                <div className='mt-5 mb-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                  No Jobs Found
                </div>
              )
            }
            {filteredJobs.map((job, i) => (
              <div
                key={i}
                className='flex flex-col md:grid md:grid-cols-[2.5fr_2fr_1.25fr_1fr_1.2fr] md:items-center gap-3 md:gap-4 px-5 py-8 border-b border-[#1e2230] last:border-b-0'
              >

                {/* Title */}
                <div className='min-w-0'>
                  <p className='text-2xl font-bold text-white capitalize'>{job.title}</p>
                  <p className='text-sm text-gray-500 mt-0.5'>{job.category}</p>
                </div>

                {/* Date Posted */}
                <div className='flex items-center justify-between md:block'>
                  <span className='text-xs text-gray-500 md:hidden'>Date Posted</span>
                  <span className='text-lg font-medium text-gray-300'>{new Date(job?.createdAt).toDateString()}</span>
                </div>

                {/* Status */}
                <div className='flex items-center justify-between md:block'>
                  <span className='text-xs text-gray-500 md:hidden'>Status</span>
                  <span 
                  className={
                    job?.status==='open' ? 'border p-2 px-3 rounded-3xl border-[#0b7200] bg-[#0b7200]':'border p-2 px-3 rounded-3xl border-[#c10000] bg-[#c10000]'
                  }>
                    <span className='w-1.5 h-1.5 rounded-full bg-current'>
                    </span>
                    {job.status}
                  </span>
                </div>

                {/* Proposals */}
                <div className='flex items-center justify-between md:block'>
                  <span className='text-xs text-gray-500 md:hidden'>Proposals</span>
                  <span className='text-base text-gray-300 font-medium'>{job.proposalsCount}</span>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-end gap-2'>
                    <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === job._id ? null : job._id)
                    }
                    className="w-12 h-12 rounded-lg border border-[#1e2230] hover:bg-[#19192f]"
                  >
                    <i className="ri-more-2-fill text-lg"></i>
                  </button>

                  {openMenu === job._id && (
                    <div className="absolute top-14 right-0 w-40 bg-[#19192f] border border-[#1e2223] flex items-center justify-center rounded-lg shadow-lg z-10 py-" >
                      <Link
                      to={`/client/jobInfo/${job._id}`}
                        className="w-full text-left px-4 py-3 hover:bg-[#262634] w-full flex items-center justify-center"
                      >
                        Edit Job
                      </Link>

                      {/* <button
                        className="w-full text-left px-4 py-3 hover:bg-[#262634] text-red-400"
                      >
                        Delete Job
                      </button> */}
                    </div>
                  )}
                </div>

                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          {
            filteredJobs.length>=0 && (
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-[#1e2230]'>
            <p className='text-sm text-gray-500'>Showing {Math.max(0, Math.min(5 * currentPage - 4, totalJobs))} to {Math.min(totalJobs, currentPage * 5)} of {totalJobs} active postings</p>

            <div className='flex items-center gap-2'>
              <button
              disabled={currentPage===1 || currentPage===0}
                onClick={() => setCurrentPage(currentPage-1)}
                className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors text-gray-400'
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={`() => setCurrentPage(p)`}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === p
                      ? 'bg-[#6366F1] text-white'
                      : 'border border-[#1e2230] text-gray-400 hover:bg-[#19192f]'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={currentPage===totalPages || totalPages===0}
                onClick={() => setCurrentPage(currentPage+1)}
                className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors text-gray-400'
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
            )
          }

        </div>

      </div>
    </div>
  )
}

export default ClientMyJobs