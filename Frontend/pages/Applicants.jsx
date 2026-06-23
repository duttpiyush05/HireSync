import React from 'react'
import {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'

const Applicants = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [jobs, setJobs] = useState([])
  const [isloading, setisLoading] = useState(true)
  const [freelancerId, setfreelancerId] = useState('')
  const [isAccepted, setisAccepted]  = useState(false)
  const [isRejected, setisRejected]  = useState(false)


  const [progress, setProgress] = useState(70)
  const { client, setclient } = useContext(ClientDataContext)
  const token = localStorage.getItem('token')

  const [clientId, setClientId] = useState('')
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try
      {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setclient(response.data.client)
        setClientId(response.data.client._id)
      }catch(err)
      {
        
      }finally{
      setTimeout(()=>
      {
        setisLoading(false)
      }, 500)
    }
    }
    getProfile()
  }, [])


  useEffect(()=>{
    const getProposals = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/proposals/clients/${clientId}`, 
          {
            headers : {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response);
          const data = response.data
          setProposals(data.proposals)
      }catch(err)
      {
        console.log(err.response.data);
      }
    }
    getProposals()
  },[clientId])

  const updateProposalStatus = async (proposalId, status) => {
  try
  {
    const response = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/proposals/proposals/${proposalId}/status`,
    { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  console.log(response);
  alert(response?.data?.message)
  }catch(err)
  {
    console.log(err.response.data);
  }
};
  

  if(isloading)
    {
      return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
  
        <div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
  
        <h3 className='text-white block mt-5 font-bold text-xl'>Please Wait...</h3>
        </div>
      )
    }

  return (
    
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>
    
          <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>

            <div>
              {
                proposals.length === 0 || (proposals.every(proposal=>proposal.status === 'rejected')) || (proposals.every(proposal=>proposal.status === 'accepted')) ? (
                  <div className='flex flex-col items-center justify-center h-[calc(100vh-5rem)]'>
                    <h1 className='text-4xl font-bold mb-4'>No Pending Appications Found</h1>
                    <p className='text-lg text-gray-400'>There are currently no Applications for you.</p>
                  </div>
                ) : (
                   
                 <div>
                  <div className='mt-10'>
                      <h1 className='text-3xl font-bold p-1 '>Pending Proposals</h1>
                    </div>
                   <div className='grid grid-cols-2 gap-3 py-10  h-full'>
                   
                    { 
                      proposals.map((job) => (
                        <div key={job._id} 
                        className={
                          (job.status==='rejected' || job.status==='accepted') ? 'hidden' : 'group h-full bg-[#151b2d] p-5 rounded-lg shadow-md flex items-center justify-between px-5 shadow-3xl'
                        } >
                          
                          {/* Left - Status + Title + Meta */}
                          <div className='flex flex-col gap-2  w-full'>
                            <div className='flex items-center gap-3 bord'>
                              
                            </div>
                            <h2 className='text-white font-bold text-3xl leading-tight capitalize mb-3'>{job.freelancer.fullname.firstname} {job.freelancer.fullname.lastname} </h2>
                            <h2 className='text-white font-semibold text-2xl leading-tight capitalize'>Applied for <span className='text-blue-500 hover:underline cursor-pointer font-semibold'>{job.job.title}</span><span className='text-lg font-semibold px-2 py-0.5 rounded text-green-400  bord'><span className='text-xl text-gray-300'>on {new Date(job.job.createdAt).toLocaleDateString()} 
                              </span> </span></h2>
                        
                            <h3 className='font-bold text-2xl mt-2'>CoverLetter</h3>
                            <span className='text-xl mt- mb-4'>
                              {job.coverLetter.length > 100 ? job.job.description.substring(0, 100) + '...' : job.coverLetter}
                            </span>
                
                            <div className='flex flex-col justify-between  w-full'>
                              <div className='flex items-center gap-5 text-gray-400 text-sm mb-2'>
                              <div className='text-xl flex flex-col gap-1 border-3 p-3 border-[#237988] rounded-lg'>Asking Amount<span className='font-semibold text-white text-'>${job.askingAmt}</span></div>
                              <div className='text-xl flex flex-col gap-1 p-3 border-3 border-[#237988] rounded-lg'>Estimated Duration<span className='font-semibold text-white text-'>
                                {job.estCompletion}</span></div>
                             
                            </div>

                            <div  className='grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 font-semibold text-sm sm:text-base borde'>
                <Link 
                to={`/freelancer/profiles/${job?.freelancer?._id}`}
                className='bg-[#272752] text-white py-2 px-4 rounded-lg hover:bg-blue-900 h-12 sm:h-14 flex items-center justify-center'>
                  Review Profile
                </Link>
                <Link 
                to='/messages' 
                className='bg-[#007a2d] text-white py-2 px-4 rounded-lg hover:bg-[#004c1c] h-12 sm:h-14 flex items-center gap-2 justify-center'>
                <i className="ri-send-plane-fill"></i>
                  Message
                </Link>
                <button 
                onClick={()=> updateProposalStatus(job?._id, "accepted")}
                className='bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-white py-2 px-4 rounded-lg h-12 sm:h-14 flex items-center gap-2 justify-center'>
              Accept Proposal
            </button>
            <button 
            onClick={()=> updateProposalStatus(job?._id, "rejected")}
            className='bg-[#e72929] hover:bg-[#951c1c] transition-colors text-white py-2 px-4 rounded-lg h-12 sm:h-14 flex items-center gap-2 justify-center'>
              Reject Proposal
            </button>

              </div>
          </div>
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

export default Applicants
