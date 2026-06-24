import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FindWork = () => {
  const [jobs, setJobs] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [isloading, setisLoading] = useState(true)

  useEffect(() => { 
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/all-jobs`, {  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response);
        
        const data = await response?.data
        setJobs(data.jobs);
      } catch (error) {
        console.log(error?.response?.data);
      }
      finally
      {
        setTimeout(() => {
          setisLoading(false)
        }, 3000);
      }
    }
    fetchJobs()
  }, []);

   if(isloading)
  {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">

      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "2s" }}
      ></div>

      <h3 className='text-white block mt-5 font-bold text-xl'>Fetching Available Jobs Please Wait...</h3>
      </div>
  )
  }

  
  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>

        
        <div>
          {
            jobs.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-[calc(100vh-5rem)]'>
                <h1 className='text-4xl font-bold mb-4'>No Jobs Found</h1>
                <p className='text-lg text-gray-400'>There are currently no jobs available. Please check back later.</p>
              </div>
            ) : (
              
              <div>
                  <h1 className='text-4xl font-bold p-1 mt-10'>Job Feeds</h1>
                  <div className='grid grid-cols-2 gap-5 py-5 bo h-full'>        
                { 
                  jobs.map((job) => (
                  <div key={job._id} className='group h-full bg-[#161c33] p-4 rounded-lg shadow-5xl flex flex-col items-center px-5'>

                    {/* Left - Status + Title + Meta */}
                    <div className='flex flex-col gap-2 w-full p-3 h-full'>

                      <h2 className='text-white font-bold text-4xl leading-tight capitalize'>{job.title}</h2>

                      <span className='text-lg font-semibold px-2 py-0.5 rounded text-green-400'>
                        ACTIVE <span className='text-xl text-gray-300'>• Posted on {new Date(job.createdAt).toLocaleDateString()} by
                          <Link
                           to={`/client/profiles/${job?.client?._id}`}
                          className='text-blue-400 font-semibold ml-1 hover:underline cursor-pointer'>
                            {job.client.fullname.firstname} {job.client.fullname.lastname}
                          </Link>
                        </span>
                      </span>

                      <span className='text-xl mt-5 mb-4 h-20'>
                        {job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
                      </span>

                      <h3 className='font-medium text-2xl'>
                        Required Expertise
                      </h3>

                      <span className='mt-4 gap-2 flex flex-wrap'>
                        {job.skills.map((skill, index) => (
                          <span key={index} className='text-xl bg-[#37374b] border-[#5b94ff] px-8 py-2 rounded-md border mr-2'>{skill}</span>
                        ))}
                      </span>

                      <div className='flex items-center gap-5 text-gray-400 text-sm mt-5'>
                        <div className='text-xl flex flex-col gap-1 border p-3 border-[#237988] w-1/3 rounded-lg'>
                          Budget<span className='font-semibold text-white'>${job.budget.minbudget} - ${job.budget.maxbudget}</span>
                        </div>
                        <div className='text-xl flex flex-col gap-1 p-3 border border-[#237988] rounded-lg w-1/3'>
                          Duration<span className='font-semibold text-white'>{job.budget.duration}</span>
                        </div>
                        <div className='text-xl flex flex-col gap-1 p-3 border-[#237988] border rounded-lg w-1/3'>
                          Experience<span className='font-semibold text-white'>{job.budget.xplevel}</span>
                        </div>
                      </div>

                      {/* Spacer pushes the button down regardless of content height */}
                      <div className='flex-1'></div>

                      <Link
                        to={`/jobs/${job._id}`}
                        className='bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-semibold rounded-lg h-[4rem] cursor-pointer text-xl flex items-center justify-center w-full mt-6'
                      >
                        View Details
                      </Link>

                    </div>

                  </div>
                ))
                }
              </div>
                </div>
             
            )
          }
        </div>
    </div>
    </div>
  )
}

export default FindWork