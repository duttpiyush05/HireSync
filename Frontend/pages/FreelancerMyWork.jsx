import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'

const FreelancerMyWork = () => {
  const [activeTab, setActiveTab] = useState('Applied')

  const [jobs, setJobs] = useState([])

  useEffect(()=>
  {
    const fetchJobs = async()=>
    {
      try
      {
        const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/proposals/getFreelancerProposal`,{
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })     
        const data= response?.data
        console.log(data);
        
        setJobs(data?.jobs)
      }
      catch(err)
      {
        toast.error(err?.response?.data?.message)
      }
    }
    fetchJobs()
  },[])

  const statusStyles = {
    Interviewing: 'bg-green-500/20 text-green-400',
    Pending: 'bg-gray-500/20 text-gray-300',
    Declined: 'bg-red-500/20 text-red-400',
  }
  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* HEADER */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold'>My Jobs</h1>
            <p className='text-md md:text-md text-gray-400 mt-1'>Track your professional journey and manage ongoing opportunities.</p>
          </div>

          <div className='flex bg-[#111827] border border-[#1e2230] rounded-lg p-1 flex-shrink-0 w-fit'>
            <button
              onClick={() => setActiveTab('Applied')}
              className={`px-12 h-12 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'Applied' ? 'bg-[#6366F1] text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Applied
            </button>
            <button
              onClick={() => setActiveTab('Saved')}
              className={`px-12 h-12 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'Saved' ? 'bg-[#6366F1] text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className='flex flex-col md:flex-row gap-3 mb-6'>
          <div className='relative flex-1'>
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input
              type='text'
              placeholder='Filter by job title or client...'
              className='w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 pl-11 pr-4 text-md text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
            />
          </div>

          <div className='flex gap-3'>
            <select className='bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer flex-1 md:flex-none md:w-40'>
              <option>All Status</option>
              <option>Interviewing</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>

            <select className='bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer flex-1 md:flex-none md:w-44'>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>

            <button className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-sm font-medium text-gray-300 hover:bg-[#19192f] transition-colors flex-shrink-0'>
              <i className="ri-equalizer-line"></i>
              <span className='hidden sm:inline'>Advanced</span>
            </button>
          </div>
        </div>

        {/* JOB LIST */}
        {
          jobs?.length===0 && (
            <div className='h-screen flex flex-col justify-center items-center gap-2'>
              <div className=' text-3xl font-bold'>
                No Jobs Found
            </div>

            <p className='text-lg text-gray-400 font-medium'>
              Create your first proposal....
            </p>
            </div>
          )
        }

        <div className='flex flex-col gap-4'>
          {jobs.map((job, i) => (
            <div
              key={i}
              className='flex flex-col md:flex-row md:items-center gap-4 bg-[#111827] border border-[#1e2230] rounded-xl p-5'
            >

              {/* Icon + Title */}
              <div className='flex items-center gap-4 flex-1 min-w-0'>
                <div className='min-w-0'>
                  <h3 className='text-lg font-bold text-white truncate capitalize'>{job?.job?.title}</h3>
                  <div className='flex items-center gap-3 text-sm text-gray-400 mt-1'>
                    <span className='flex items-center gap-1'>
                      <i className="ri-briefcase-line"></i>
                      {job?.client?.fullname?.firstname} {job?.client?.fullname?.lastname}
                    </span>
                    <span className='flex items-center gap-1'>
                      <i className="ri-calendar-line"></i>
                      {new Date(job?.createdAt).toLocaleDateString("en-US",{
                        month : "short",
                        day:"numeric",
                        year : "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status + Action */}
              <div className='flex items-center justify-between md:justify-end gap-6 md:gap-8 flex-shrink-0'>
                <div className='text-left md:text-center'>
                  <p className='text-base text-gray-500 uppercase tracking-widest mb-1.5'>Status</p>
                  <span className=
                  {`inline-flex items-center gap-1.5 text-base mt-1 px-4 py-2 rounded-full font-medium capitalize
                    
                    {
                    ${(job?.status==='accepted')?'bg-green-700 border-green-800':''
                    }
                    {
                    ${(job?.status==='pending')?'bg-yellow-500 border-yellow-800':''
                    }
                    {
                    ${(job?.status==='in_progrees')?'bg-blue-500 border-blue-800':''
                    }
                    {
                    ${(job?.status==='rejected')?'bg-red-500 border-red-800':''
                    }
                                        
                    `}>
                    <span className='w-1.5 h-1.5 rounded-full bg-current'></span>
                    {job.status}
                  </span>
                </div>

                <Link 
                to={`/freelancer/jobInfo/${job?.job?._id}`}
                className='flex justify-center items-center px-5 h-15 rounded-lg border border-[#011b7c] bg-transparent hover:bg-[#19192f] transition-colors text-base font-medium text-gray-300 whitespace-nowrap '>
                  View Deatils
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FreelancerMyWork
