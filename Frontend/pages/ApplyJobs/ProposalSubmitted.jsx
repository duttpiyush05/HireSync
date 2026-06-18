import React from 'react'
import { useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ProposalSubmitted = () => {

  const navigate = useNavigate()
  const {proposalId} = useParams()
  const [isloading, setisLoading] = useState(true)
  const [proposal, setProposal] = useState()
  const [jobId, setJobId] = useState('')
  const [job, setJob] = useState()
  const [freelancerId, setFreelanerId] = useState('')
  const [clientId, setClientId] = useState('')
  const [client, setClient] = useState('')

  useEffect(() =>{
    const fetchProposal = async ()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/proposals/${proposalId}`,
          {
            headers : {
              'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

          const data = response.data
          const proposal = data.proposal

          const freelancer = data.proposal.freelancer
          const client = data.proposal.client
          const job = data.proposal.job

          setFreelanerId(freelancer)
          setClientId(client)
          setJobId(job)
          setProposal(proposal)
        
      }catch(err){
    } finally
      {
        setTimeout(() => {
          setisLoading(false)
        }, 1000);
      }
    }
    
    fetchProposal()
  },[])

  useEffect(() => {
    if(!clientId ) return 
    const fetchClient = async ()=>
    {
      try
      {
        console.log(`${import.meta.env.VITE_BASE_URL}/jobs/${jobId}`);
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/${jobId}`,
          {
            headers : {
              'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        const data = response.data
        const job = data?.job
        setJob(job)
        
      }catch(err){
            } 
    }
    fetchClient()
  }, [jobId])
  useEffect(() => {
    if(!jobId ) return 
    const fetchJob = async ()=>
    {
      try
      {        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/${jobId}`,
          {
            headers : {
              'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        const data = response.data
        const job = data?.job
        setJob(job)
        
      }catch(err){
            } 
    }
    fetchJob()
  }, [jobId])
  

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

  const recommendations = [
    {
      icon: 'ri-server-line',
      tag: 'NEW',
      title: 'Backend Infrastructure Architect',
      desc: 'Scale the core cloud services for a leading fintech platform using Rust and AWS.',
      rate: '$120/hr',
      posted: 'Posted 2h ago',
    },
    {
      icon: 'ri-layout-line',
      tag: null,
      title: 'UI/UX System Lead',
      desc: 'Develop a comprehensive design system for a global logistics enterprise application.',
      rate: '$95/hr',
      posted: 'Posted 5h ago',
    },
    {
      icon: 'ri-code-box-line',
      tag: null,
      title: 'Machine Learning Research Engineer',
      desc: 'Fine-tune LLMs for specific healthcare documentation use cases with Python.',
      rate: '$150/hr',
      posted: 'Posted 1d ago',
    },
  ]
  return (
     <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>


      <div className='min-h-screen bg-[#0c1324] text-white px-4 sm:px-8 md:px-12 lg:px-16 py-12'>
      <div className='max-w-10xl mx-auto flex flex-col items-center '>

        {/* Success Icon */}
        <div className='w-20 h-20 rounded-full border-4 border-green-400/30 bg-green-400/10 flex items-center justify-center mb-6'>
          <div className='w-14 h-14 rounded-full bg-green-400/20 border-2 border-green-400 flex items-center justify-center'>
            <i className="ri-check-line text-green-400 text-3xl"></i>
          </div>
        </div>

        {/* Title */}
        <h1 className='text-3xl sm:text-4xl font-bold text-center mb-3'>Proposal Submitted!</h1>
        <p className='text-sm sm:text-base text-gray-400 text-center leading-relaxed max-w-md mb-10'>
          Your application for the <span className='text-white font-medium'>{job.title}</span> position to <span className='text-blue-400 hover:underline cursor-pointer'>{job?.client?.fullname?.firstname}</span> has been successfully delivered. You're one step closer to your next great project.
        </p>

        {/* Submission Summary */}
        <div className='w-full bg-[#111827] border border-[#1e2230] rounded-xl p-6 sm:p-8 mb-8'>
          <h2 className='text-xl font-semibold text-gray-400 flex items-center gap-2 mb-6'>
            <i className="ri-file-list-3-line text-[#6366F1]"></i>
            Submission Summary
          </h2>

          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Project Rate</p>
              <p className='text-green-400 font-bold text-lg'>${proposal?.receivingAmt} USD</p>
            </div>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Estimated Timeline</p>
              <p className='text-white font-bold text-lg'>{proposal.estCompletion}</p>
            </div>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Connects Used</p>
              <p className='text-white font-bold text-lg'>12 Connects</p>
            </div>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-1'>Submitted On</p>
              <p className='text-white font-bold text-lg'>{proposal?.createdAt ? new Date(proposal?.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>

          {/* Payment Protection */}
          <div className='flex items-center gap-3 bg-[#0c1324] border border-[#1e2230] rounded-lg px-4 py-3'>
            <div className='w-10 h-10 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center flex-shrink-0'>
              <i className="ri-shield-check-line text-green-400 text-lg"></i>
            </div>
            <div>
              <p className='text-lg font-semibold text-white'>Payment Protection Active</p>
              <p className='text-md text-gray-400'>This project is eligible for HireSync Escrow Protection.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16'>
          <button
            onClick={() => navigate('/find-work')}
            className='flex items-center justify-center gap-2 px-8 h-15 rounded-lg bg-[#19192f] border border-[#33336e] hover:bg-[#33336e] transition-colors text-md font-medium text-white'
          >
            <i className="ri-search-line"></i>
            Browse More Jobs
          </button>
          <button
            onClick={() => navigate('/')}
            className='flex items-center justify-center gap-2 px-8 h-15 rounded-lg bg-[#19192f] border border-[#33336e] hover:bg-[#33336e] transition-colors text-md font-medium text-white'
          >
            <i className="ri-file-list-line"></i>
            Go to My Proposals
          </button>
        </div>

        {/* Recommendations */}
        <div className='w-full'>
          <div className='flex items-start justify-between mb-2'>
            <div>
              <p className='text-2xl font-semibold text-white'>Recommended for you</p>
              <p className='text-md text-gray-400'>Based on your recent application</p>
            </div>
            <Link to='/' className='text-md text-[#6366F1] hover:underline flex items-center gap-1 mt-1'>
              View all recommendations
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
            {recommendations.map((job, i) => (
              <div
                key={i}
                className='bg-[#111827] border border-[#1e2230] rounded-xl p-5 cursor-pointer hover:border-[#33336e] transition-colors flex flex-col gap-3'
              >
                <div className='flex items-center justify-between'>
                  <div className='w-8 h-8 rounded-lg bg-[#19192f] border border-[#1e2230] flex items-center justify-center'>
                    <i className={`${job.icon} text-[#6366F1] text-3xl`}></i>
                  </div>
                  {job.tag && (
                    <span className='text-sm px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 font-semibold'>
                      {job.tag}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className='text-xl font-bold text-white mb-1 leading-snug'>{job.title}</h3>
                  <p className='text-md text-gray-400 leading-relaxed'>{job.desc}</p>
                </div>
                <div className='flex items-center justify-between mt-auto pt-2 border-t border-[#1e2230]'>
                  <span className='text-md font-bold text-white'>{job.rate}</span>
                  <span className='text-md text-gray-500'>{job.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

      </div>

      </div>
  )
}

export default ProposalSubmitted
