import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Profiles = () => {
  //  const skills = ['React', 'Node.js', 'TypeScript', 'AWS', 'Next.js', 'PostgreSQL', 'Docker']
  const {freelancerId} = useParams()
  const [freelancer, setFreelancer] = useState()
   
    const token = localStorage.getItem('token')
  
   useEffect(()=>{
    const fetchFreelancer= async()=>
    {
      try
      {
        const response =await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/getfreelancer/${freelancerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        const data = response.data
        console.log(data);
        
        setFreelancer(data.freelancer)
      }catch(err)
      {
        console.log(err.response?.data)
      }
    }

    fetchFreelancer()
   },[])
   


  return (

     <div className='bg-[#0c1324]  text-white px-4 sm:px-8 md:px-12 lg:px-16 py-10 '>
      <div className='max-w-6xl max-h-10xl mx-auto '>

        {/* HERO SECTION */}
        <div className='flex flex-col items-center text-center mb-10'>

          {/* Avatar */}
          <div className='relative mb-4'>
            <div className='w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#1e2230] overflow-hidden bg-[#19192f]'>
              <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
            </div>
            <span className='absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full bg-green-400/90 text-[#0c1324] whitespace-nowrap'>
              {freelancer?.profile?.experienceLevel}
            </span>
          </div>

          {/* Name + Title */}
          <h1 className='text-3xl sm:text-4xl font-bold mb-2 capitalize'>{freelancer?.fullname?.firstname} <span>{freelancer?.fullname?.lastname}</span></h1>
          <p className='text-[#6366F1] text-lg sm:text-xl font-semibold mb-5'>
            {freelancer?.profile?.title}
          </p>

          {/* Action Buttons */}
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <a
              href={freelancer?.profile?.github}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e2230] bg-transparent hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300'
            >
              <i className="ri-github-fill text-base"></i>
              GitHub
            </a>
            
            <a
              href={freelancer?.profile?.linkedin}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e2230] bg-transparent hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300'
            >
              <i className="ri-linkedin-box-fill text-base"></i>
              LinkedIn
            </a>
            

          </div>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

          {/* LEFT COLUMN */}
          <div className='lg:col-span-2 flex flex-col gap-5'>

            {/* About */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6 min-h-60'>
              <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <i className="ri-user-line text-[#6366F1]"></i>
                About
              </h2>
              <p className='text-lg text-gray-400 leading-relaxed'>
                {freelancer?.profile?.bio}.
              </p>
            </div>

            {/* Core Expertise */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6 min-h-50'>
              <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
                <i className="ri-terminal-box-line text-[#6366F1]"></i>
                Core Expertise
              </h2>
              <div className='flex flex-wrap gap-3'>
                {freelancer?.profile?.skills.map((skill, i) => (
                  <span
                    key={i}
                    className='text-lg px-3 py-1.5 rounded-md bg-[#19192f] border border-[#33336e] text-gray-300 font-medium min-w-30'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-5'>

            {/* Availability */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <h2 className='text-2xl font-bold mb-5'>Availability</h2>

              <div className='flex flex-col gap-4'>
                <div>
                  <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Hourly Rate</p>
                  <p className='text-2xl font-bold text-white'>
                    ${freelancer?.profile?.hourlyRate}<span className='text-sm text-gray-400 font-normal'>/hr</span>
                  </p>
                </div>

                <div>
                  <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Experience</p>
                  <p className='text-xl font-bold text-white'>{freelancer?.profile?.experienceLevel}</p>
                </div>

                <div>
                  <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Last Active</p>
                  <p className='text-xl font-medium text-gray-300'>2 days ago</p>
                </div>
              </div>
            </div>

            {/* Verified Talent */}
            <div className='bg-[#111827] border-2 border-green-500/40 rounded-xl p-5 flex items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center flex-shrink-0'>
                <i className="ri-shield-check-line text-green-400 text-3xl"></i>
              </div>
              <div>
                <p className='text-md font-bold text-white'>Verified Talent</p>
                <p className=' text-gray-400 mt-0.5'>Background and skills verified by HireSync.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Profiles
