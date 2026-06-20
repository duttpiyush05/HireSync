import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const ClientProfile = () => {

  const {clientId} = useParams()
  // console.log(clientId);
  const [client, setClient] = useState()
  
  useEffect(()=>
  {
    const fetchClient = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/getclient/${clientId}`, 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        console.log(response);
        
        const data = response?.data
        // console.log(data);
        setClient(data.client)
        
      }catch(err)
      {
        console.log(err);
        
      }
    }
    fetchClient()
  }, [clientId])
  
  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 md:px-8 lg:px-16 py-8'>
      <div className='max-w-6xl mx-auto bg-[#111827] border border-[#1e2230] rounded-xl p-5 md:p-8'>

        {/* HEADER */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>

          <div className='flex items-start gap-4'>
            {/* Avatar */}
            <div className='relative flex-shrink-0'>
              <div className='w-15 h-15 md:w-35 md:h-35 rounded-xl overflow-hidden bg-[#19192f] border border-[#1e2230]'>
                <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
              </div>
              <span className='w-[80%] flex justify-center items-center absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[15px] font-bold px-2 py-0.5 rounded-full bg-green-400/90 text-[#0c1324] whitespace-nowrap'>
                AVAILABLE
              </span>
            </div>

            <div className='pt-1'>
              <h1 className='text-xl md:text-4xl font-bold'>{client?.fullname?.firstname} {client?.fullname?.lastname}</h1>
              {/* <p className='text-[#6366F1] text-sm md:text-base font-semibold mt-0.5'>Senior Full-Stack Engineer</p> */}
              <div className='flex flex-wrap items-center gap-3 text-lg text-gray-400 mt-2'>
                <span className='flex items-center gap-1'>
                  <i className="ri-map-pin-line"></i>
                  {client?.location}
                </span>
                {/* <span className='flex items-center gap-1'>
                  <i className="ri-time-line"></i>
                  10:30 AM local time
                </span> */}
              </div>
            </div>
          </div>

          <button className='w-full md:w-40 px-5 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white flex-shrink-0'>
            Message
          </button>
        </div>

        {/* STAT CARDS */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
          <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-4'>
            <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Total Job Posted</p>
            <p className='text-green-400 font-bold text-lg'>100%</p>
          </div>
          <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-4'>
            <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Email</p>
            <p className='font-bold text-lg flex items-center gap-1'>
              {client?.email}
            </p>
          </div>
          <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-4'>
            <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Total Earnings</p>
            <p className='font-bold text-lg'>$200K+</p>
          </div>
          <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-4'>
            <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Contact Number</p>
            <p className='font-bold text-lg'> {client?.contactno}</p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>

          {/* LEFT COLUMN */}
          <div className='md:col-span-2 flex flex-col gap-5'>

            {/* Bio */}
            <div>
              <h2 className='text-2xl font-bold mb-3 flex items-center gap-2'>
                <i className="ri-user-line text-[#6366F1]"></i>
                Bio
              </h2>

              <div className='text-md text-gray-400 leading-relaxed mb-4 bg-[#0c1324] h-50 border border-[#1e2230]'>
                {client?.bio}
              </div>

            </div>

            {/* Company */}
            <div>
              <h2 className='text-2xl font-bold mb-3 flex items-center gap-'>
                <i className="ri-building-line text-[#6366F1] ml-0 mr-2.5"></i>
                Company
              </h2>
              <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-8'>
                <p className='text-xl font-bold text-[#6366F1] mb-1'>{client?.companyProfile?.companyName}.</p>
                <p className='text-md text-gray-400 leading-relaxed mb-2'>
                  {client?.companyProfile?.description}.
                </p>
                <a href='https://sterlingtech.io' className='text-xl font-medium text-green-400 hover:underline'>{client?.companyProfile?.website}</a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h2 className='text-2xl font-bold mb-3 flex items-center gap-2'>
              <i className="ri-link text-[#6366F1]"></i>
              Connect
            </h2>
            <div className='flex flex-col gap-3 '>
              
            <a
                href={client?.companyProfile?.website}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-2 px-4 h-15 rounded-lg border border-[#1e2230] bg-[#0c1324] hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300 '
              >
                <i className="ri-github-fill"></i>
                GitHub
              </a>
              
              <a
                href={client?.linkedin}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-2 px-4 h-15 rounded-lg border border-[#1e2230] bg-[#0c1324] hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300'
              >
                <i className="ri-linkedin-box-fill"></i>
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ClientProfile