import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ClientMyJobs = () => {

  const [jobs, setJobs] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

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
        console.log(response);
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  return (

    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

        <nav className='w-full border-[#0013be] min-h-[5rem] flex border-b-4 justify-between items-center py-3 relative sticky top-0 z-50 bg-[#15152a] rounded-b'>

          {/* Left: Logo + Nav Links */}
          <div className='flex items-center gap-4 flex-1'>
            <Link to='/' className='text-2xl sm:text-3xl font-bold mr-2 sm:mr-5 whitespace-nowrap'>HireSync</Link>

            {/* Desktop Nav */}
            <ol className='hidden md:flex gap-6 lg:gap-[4rem] items-center font-semibold text-base lg:text-lg text-gray-300'>
              <Link to="/">Find Work</Link>
              <Link to="/my-jobs">My Jobs</Link>
              <Link to="/">Messages</Link>
              <Link to="/post-job">Post Job</Link>
              <Link to="/">Invoices</Link>
            </ol>
          </div>

          {/* Right: Search + Icons */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Search — hidden on mobile */}
            <div className='relative hidden sm:block'>
              <i className="ri-search-line ri-xl absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                className='h-[3rem] w-[12rem] lg:w-[20rem] pl-10 rounded-full bg-[#37374b] text-base font-semibold'
                type="text"
                placeholder='Search....'
              />
            </div>

            <i className="ri-notification-2-fill ri-xl cursor-pointer"></i>
            <div className='bg-white w-9 h-9 rounded-full flex-shrink-0'></div>

            {/* Hamburger — mobile only */}
            <button
              className='md:hidden ml-1 text-white'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`ri-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className='absolute top-full left-0 w-full bg-[#151b2d] z-50 flex flex-col gap-4 p-5 border-t border-[#0013be] md:hidden'>
              {/* Mobile Search */}
              <div className='relative sm:hidden'>
                <i className="ri-search-line ri-xl absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  className='h-[3rem] w-full pl-10 rounded-full bg-[#37374b] text-base font-semibold'
                  type="text"
                  placeholder='Search....'
                />
              </div>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Find Work</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>My Jobs</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Messages</Link>
              <Link to="/" className='font-semibold text-gray-300 text-lg' onClick={() => setMenuOpen(false)}>Invoices</Link>
            </div>
          )}
        </nav>

        <div>
          {
            jobs.length === 0 ? (
              <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl font-bold'>No Jobs Found</h1>
              </div>
            ) : (
              <div className='mt-5 pt-5 grid grid-cols-1 gap-6 py-10  '>
                <div>
                  <h1 className='text-2xl font-bold p-1'>All Posted Jobs</h1>
                </div>
                { 
                  jobs.map((job) => (
                    // <div key={job._id} className='bg-[#1c1f2a] p-4 rounded-lg shadow-md w-full border'>
                    //   <h2 className='text-5xl font-semibold mb-2'>{job.title}</h2>
                    //   <p className='text-gray-400 mb-2'>Category: {job.category}</p>
                    //   <p className='text-gray-400 mb-2'>Description: {job.description}</p>
                    //   <p className='text-gray-400 mb-2'>Skills: {job.skills.join(', ')}</p> 
                    //   <p className='text-gray-400 mb-2'>Budget: {job.budget.minbudget} - {job.budget.maxbudget} ({job.budget.type})</p>
                    //   <p className='text-gray-400 mb-2'>Duration: {job.budget.duration}</p>
                    //   <p className='text-gray-400 mb-2'>Experience Level: {job.budget.xplevel}</p>
                    //   <p>
                    //     Posted on {new Date(job.createdAt).toLocaleDateString()}
                    //   </p>
                    // </div>
                    
                    // <div className='flex items-center justify-between px-5 py-4 bg-[#0f1117] rounded-xl border border-[#1e2230]' key={job._id}>
                    <div key={job._id} className='h-full bg-[#1c1f2a] p-4 rounded-lg shadow-md border flex items-center justify-between px-5 '>
                      
                      {/* Left - Status + Title + Meta */}
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-3'>
                          <span className='text-lg font-semibold px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30'>ACTIVE</span>
                          <span className='text-xl text-gray-400'>• Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2 className='text-white font-bold text-4xl leading-tight mb-5'>{job.title}</h2>
                        <div className='flex items-center gap-4 text-gray-400 text-sm'>
                          <span className='text-xl'><i className="ri-money-dollar-circle-line mr-1"></i>${job.budget.minbudget} - ${job.budget.maxbudget} {job.budget.type}</span>
                          <span className='text-xl'><i className="ri-time-line mr-1"></i>{job.budget.duration}</span>
                          <span className='text-xl'><i className="ri-group-line mr-1"></i>{job.budget.xplevel}</span>
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
                        <button className='px-5 py-2 bg-green-500 hover:bg-green-600 transition-colors text-white text-sm font-semibold rounded-lg w-[10rem] h-[4rem] cursor-pointer text-xl flex items-center justify-center'>
                          Manage
                        </button>
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

export default ClientMyJobs
