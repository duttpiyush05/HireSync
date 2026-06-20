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
        const data = await response.data;
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      finally
      {
        setTimeout(() => {
          setisLoading(false)
        }, 1000);
      }
    }
    fetchJobs();
  }, []);

   if(isloading)
  {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">

      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "2s" }}
      ></div>

      <h3 className='text-white block mt-5 font-bold text-xl'>Fetching Jobs Please Wait...</h3>
      </div>
  )
  }

  
  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        
        <div>
          {
            jobs.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-[calc(100vh-5rem)]'>
                <h1 className='text-4xl font-bold mb-4'>No Jobs Found</h1>
                <p className='text-lg text-gray-400'>There are currently no jobs available. Please check back later.</p>
              </div>
            ) : (
              // <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
              //   {jobs.map(job => (
              //     <div key={job._id} className='h-full bg-[#1c1f2a] p-4 rounded-lg shadow-md border flex flex-col justify-between'>
              //       <div>
              //         <h2 className='text-white font-bold text-2xl mb-2'>{job.title}</h2>
              //         <p className='text-gray-400 mb-4'>{job.description}</p>
              //         <div className='flex items-center gap-4 text-gray-400 text-sm mb-4'>
              //           <span><i className="ri-money-dollar-circle-line mr-1"></i>${job.budget.minbudget} - ${job.budget.maxbudget} {job.budget.type}</span>
              //           <span><i className="ri-time-line mr-1"></i>{job.budget.duration}</span>
              //           <span><i className="ri-group-line mr-1"></i>{job.budget.xplevel}</span>
              //         </div>
              //         <div className='flex flex-wrap gap-2'>
              //           {job.skills.map((skill, index) => (
              //             <span key={index} className='text-xs bg-[#37374b] text-gray-400 px-2 py-1 rounded-full'>{skill}</span>
              //           ))}
              //         </div>
              //       </div>
              //       <Link to={`/jobs/${job._id}`} className='mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>View Details</Link>
              //     </div>
              //   ))}
              // </div>
              <div className='grid grid-cols-1 gap-6 py-10 bo h-full'>
                <div>
                  <h1 className='text-3xl font-bold p-1'>Job Feeds</h1>
                </div>
                { 
                  jobs.map((job) => (
                    <div key={job._id} className='group h-full bg-[#161c33] p-4 rounded-lg shadow-2xl flex items-center justify-between px-5 '>
                      
                      {/* Left - Status + Title + Meta */}
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-3'>
                          
                        </div>
                        <h2 className='text-white font-bold text-4xl leading-tight capitalize'>{job.title}</h2>
                        <span className='text-lg font-semibold px-2 py-0.5 rounded text-green-400  '>ACTIVE <span className='text-xl text-gray-300'>• Posted on {new Date(job.createdAt).toLocaleDateString()} by 
                          <span className='text-blue-400 font-semibold ml-1 hover:underline cursor-pointer'>
                          {job.client.fullname.firstname} {job.client.fullname.lastname}</span>
                          </span> </span>
                        
                        <span className='text-xl mt-5 mb-4'>
                          {job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
                        </span>
                        <span className='mb-4 mt-4 gap-2 flex flex-wrap'>
                          {
                            job.skills.map((skill, index) => (
                              <span key={index} className='text-xl bg-[#37374b] border-[#5b94ff] px-8 py-2 rounded-md border mr-2 '>{skill}</span>
                            ))
                          }
                        </span>
                        <div className='flex items-center gap-5 text-gray-400 text-sm mb-2'>
                          <div className='text-xl flex flex-col gap-1  border p-3 border-[#237988] rounded-lg'>Budget<span className='font-semibold text-white text-'>${job.budget.minbudget} - ${job.budget.maxbudget} {job.budget.type}</span></div>
                          <div className='text-xl flex flex-col gap-1 p-3 border border-[#237988] rounded-lg'>Duration<span className='font-semibold text-white text-'>
                            {job.budget.duration}</span></div>
                          <div className='text-xl flex flex-col gap-1 p-3 border-[#237988] border rounded-lg'>Experience<span className='font-semibold text-white text-'>
                            {job.budget.xplevel}</span></div>
                        </div>
                      </div>

                      {/* Right - Stats + Actions */}
                      <div className='flex items-center gap-6 flex-shrink-0 ml-8'>
                        {/* <div className='text-center'>
                          <p className='text-white font-bold text-xl'>24</p>
                          <p className='text-gray-400 text-xs'>Proposals</p>
                        </div> */}
                        <div className='text-center'>
                          {/* <p className='text-white font-bold text-xl'>06</p> */}
                          {/* <p className='text-gray-400 text-xs'>Interviews</p> */}
                        </div>
                        <Link 
                        to={`/jobs/${job._id}`} 
                        // onClick={()=> setLoading(true)}
                        className='px-5 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-semibold rounded-lg w-[10rem] h-[4rem] cursor-pointer text-xl flex items-center justify-center'>
                          View Details
                        </Link>
                        {/* <button className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#1e2230] hover:bg-[#1e2230] transition-colors text-gray-400'>
                          <i className="ri-more-2-fill"></i>
                        </button> */}
                      </div>

                    </div>


                    
                  ))
                }
              </div>
            )
          }
        </div>
    </div>
    </div>
  )
}

export default FindWork