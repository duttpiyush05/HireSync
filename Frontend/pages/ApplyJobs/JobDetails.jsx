import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import  ClipLoader from 'react-spinners/ClipLoader'

const JobDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { jobId } = useParams()
  const [jobDetails, setJobDetails] = useState(null)
  const [isloading, setisLoading] = useState(true)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/${jobId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = response.data
        setJobDetails(data.job)
      }
      catch(err)
      {
        
      }
      finally
      {
        setTimeout(() => {
          setisLoading(false)
        }, 500);
      }
    }
    fetchJobDetails()
  }, [jobId])

  if(isloading)
  {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "3s" }}
      ></div>
      <h3 className='text-white block mt-5 font-bold text-xl'>Fetching Jobs Details...</h3>
      </div>
  )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>

        
        {/* <h3>Job Details</h3> */}


        <div className='min-h-screen bg-[#0c1324] text-white px-4 sm:px-8 md:px-5 py-8 w-full'>

      <div className='flex flex-col lg:flex-row gap-6 w-full'>

        {/* LEFT COLUMN */}
        <div className='flex flex-col gap-5 w-full lg:w-[65%]'>

          {/* Header Card */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-lg px-3 py-1 rounded-full bg-[#19192f] border border-[#33336e] text-gray-300'>{jobDetails?.category}</span>
              <span className='text-lg px-3 py-1 rounded-full bg-[#19192f] border border-[#33336e] text-gray-300'>Posted {jobDetails?.createdAt ? new Date(jobDetails?.createdAt).toLocaleDateString() : 'Unknown'}</span>
              <span className='text-lg px-3 py-1 rounded-full bg-[#19192f] border border-[#33336e] text-gray-300'>By {jobDetails?.client?.fullname?.firstname}</span>
            </div>
            <h1 className='text-2xl sm:text-5xl font-bold leading-tight mb-4 capitalize'>
              {jobDetails?.title}
            </h1>
            <div className='flex flex-wrap items-center gap-4 text-lg text-gray-400'>
              <span className='flex items-center gap-1'>
                <i className="ri-money-dollar-circle-line text-green-400"></i>
                {jobDetails?.budget ? `₹${jobDetails?.budget.minbudget} - ₹${jobDetails?.budget.maxbudget}` : 'Negotiable'} <span className='text-xl text-blue-300 pl-2 pr-10'>
                  {jobDetails?.budget.type}
                </span>
              </span>
              <span className='flex items-center gap-1'>
                <i className="ri-time-line text-green-400"></i>
                Est. 3-6 Months
              </span>
            </div>
          </div>

          {/* Job Description Card */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <i className="ri-file-text-line text-[#6366F1]"></i>
              Job Description
            </h2>
            <p className='text-gray-400 text-xl leading-relaxed mb-4'>
              {jobDetails?.description || 'No description provided.'}
            </p>

          </div>

          {/* Required Skills Card */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <i className="ri-settings-3-line text-[#6366F1]"></i>
              Required Skills
            </h2>
            <div className='flex flex-wrap gap-3'>
              {jobDetails?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className='text-xl px-3 py-1.5 rounded-md bg-[#19192f] border border-[#33336e] text-gray-300'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className='flex flex-col gap-5 w-full lg:w-[35%]'>

          {/* Apply Card */}
          <div className='bg-[#19192f] border border-[#33336e] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-1'>Ready to Apply?</h2>
            <p className='text-md text-gray-400 mb-5'>X freelancers have already applied for this position.</p>
            <Link 
            to={`/jobs/${jobId}/apply`}
            className='w-full h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors font-semibold text-lg cursor-pointer mb-3 flex items-center justify-center gap-2'>
              Apply Now
              <i className="ri-send-plane-fill"></i>
            </Link>
            <button className='w-full h-15 rounded-lg border border-[#33336e] bg-transparent hover:bg-[#111827] transition-colors text-lg text-gray-300 flex items-center justify-center gap-2 cursor-pointer'>
              <i className="ri-bookmark-line"></i>
              Save for Later
            </button>
          </div>

          {/* About Client Card */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-5 '>About the Client 

              <Link 
              to={`/client/profiles/${jobDetails?.client?._id}`}
              className='text-blue-500 hover:underline ml-2'>{jobDetails?.client?.fullname?.firstname}</Link></h2>
            <div className='flex flex-col gap-4 text-sm'>

              <div className='flex items-center justify-between text-lg'>
                <span className='text-gray-400 '>Client Rating</span>
                <div className='flex items-center gap-1 '>
                  {[1,2,3,4].map(i => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                  ))}
                  <i className="ri-star-half-fill text-yellow-400 text"></i>
                  <span className='text-xs text-gray-400 ml-1'>4.8 of 22 reviews</span>
                </div>
              </div>

              <div className='flex items-center justify-between text-lg'>
                <span className='text-gray-400'>Location</span>
                <span className='flex items-center gap-1 text-white'>
                  <i className="ri-map-pin-line text-gray-400"></i>
                  {jobDetails?.client?.location}
                </span>
              </div>

              <div className='flex items-center justify-between text-lg'>
                <span className='text-gray-400'>Total Spend</span>
                <span className='text-green-400 font-semibold'>$200k+</span>
              </div>

              <div className='flex items-center justify-between text-lg'>
                <span className='text-gray-400'>Hiring Rate</span>
                <span className='text-white'>86% Hire rate</span>
              </div>

            </div>

            {/* Client Image Placeholder */}
            {/* <div className='mt-5 w-full h-24 rounded-lg bg-[#19192f] border border-[#1e2230]'></div> */}
          </div>

          {/* Similar Opportunities Card */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-lg font-bold uppercase tracking-widest text-gray-400 mb-4'>Similar Opportunities</h2>
            <div className='flex flex-col gap-4'>

              <div className='flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity '>
                <div>
                  <p className='text-xl font-semibold text-white text-lg'>UI Designer (E-commerce)</p>
                  <p className='text-lg text-gray-400 mt-0.5'>$80/hr</p>
                </div>
                <span className='text-lg px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30'>New</span>
              </div>

              <div className='h-px bg-[#1e2230]'></div>

              <div className='flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity'>
                <div>
                  <p className='text-sm font-semibold text-white text-xl'>Lead UX Researcher</p>
                  <p className='text-lg text-gray-400 mt-0.5'>$95/hr</p>
                </div>
                <span className='text-lg text-gray-400'>2 days ago</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>





      </div>

    </div>
  )
}

export default JobDetails
