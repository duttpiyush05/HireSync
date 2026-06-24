import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Details = () => {

  const {contractId} = useParams()
  const [contract, setContract] = useState()
  const [client, setClient] = useState()
  const [freelancer, setFreelancer] = useState()
  const [job, setJob] = useState()
  const [role, setRole] = useState("")
  

  const navigate = useNavigate()

  useEffect(() => {
    const fetchContract = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/contracts/${contractId}`, 
          {
            headers : 
            {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
        const contract = response?.data?.contract
        setContract(contract)        
        setClient(contract?.client)        
        setFreelancer(contract?.freelancer)        
        setJob(contract?.job) 
        setRole(response?.data?.role)
        console.log(response);
               
      }catch(err)
      {
        console.log(err.response?.data);
      }
    }
    fetchContract()
  },[])

  const [buttonValue, setbuttonValue] = useState("Request Completion")

  const handleCompletionRequest = async ()=>
  {
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/contracts/completionRequest/${contractId}`,{},{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response);
      
    }catch(err)
    {
      console.log(err?.response?.data);
    }
  }

  const handleMarkCompleted = async()=>{
    try
    {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/contracts/markCompleted/${contractId}`,{},{
        headers :{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response);
      
    }catch(err)
    {
      console.log(err?.response?.data);      
    }
  }

  const handleCancelCompletion = async()=>
  {
    try
    {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/contracts/markCancel/${contractId}`,{},{
        headers: {
          Authorization :  `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response);
      
    }catch(err)
    {
      console.log(err?.response?.data);
    }
  }

  const handleReview = async()=>
  {
    navigate(`/${role}/reviews/${contractId}`)
  } 

  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 md:px-8 lg:px-16 py-8'>
      <div className='max-w-7xl mx-auto'>

        {/* PAGE HEADER */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-2xl md:text-5xl font-bold'>Contract Details</h1>
            <p className='text-sm text-[#6366F1] font-medium mt-1'>Contract ID: {contractId}</p>
          </div>
          {
            (contract?.status==="completed" ||  contract?.status==="completed") && (
              <span className='inline-flex items-center gap-1.5 text-lg px-10 py-3 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-medium flex-shrink-0 capitalize'>
            <span className='w-1.5 h-1.5 rounded-full bg-current'></span>
            {contract?.status}
          </span>
            )
          }
          {
            (contract?.status==="cancelled") && (
              <span className='inline-flex items-center gap-1.5 text-lg px-10 py-3 rounded-full bg-red-600 text-white border border-red-700 font-medium flex-shrink-0 capitalize'>
            
            {contract?.status}
          </span>
            )
          }
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

          {/* LEFT COLUMN */}
          <div className='lg:col-span-2 flex flex-col gap-5'>

            {/* Basic Information */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <h2 className='text-3xl font-bold mb-5'>Basic Information</h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Job Title</p>
                  <p className='capitalize text-[#6366F1] font-semibold text-md md:text-lg'>{job?.title}</p>
                </div>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Total Budget</p>
                  <p className='text-white font-semibold text-md md:text-lg'>${contract?.budget}</p>
                </div>

                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Client</p>
                  <p className='flex items-center gap-2 text-sm md:text-lg font-medium'>
                    <i className="ri-building-line text-gray-400"></i>
                    {client?.fullname?.firstname} {client?.fullname?.lastname}
                  </p>
                </div>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Freelancer</p>
                  <p className='flex items-center gap-2 text-sm md:text-lg font-medium'>
                    <i className="ri-user-line text-amber-400"></i>
                    <span className='text-amber-400 capitalize'>{freelancer?.fullname?.firstname} {freelancer?.fullname?.lastname}</span>
                  </p>
                </div>

                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Start Date</p>
                  <p className='text-white font-semibold text-sm md:text-lg'>{new Date(contract?.startDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  }
                )}</p>
                </div>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Estimated Completion</p>
                  <p className='text-white font-semibold text-sm md:text-lg'>Next {contract?.job?.budget?.duration}
                  
                </p>
                </div>
              </div>
            </div>

            {/* Proposal Snapshot */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <div className='flex items-start justify-between mb-5'>
                <h2 className='text-3xl font-bold'>Proposal Snapshot</h2>
                <div className='w-9 h-9 rounded-lg bg-[#19192f] border border-[#1e2230] flex items-center justify-center flex-shrink-0'>
                  <i className="ri-file-text-line text-gray-400"></i>
                </div>
              </div>

              <p className='text-lg text-gray-500 uppercase tracking-widest mb-3'>Original Cover Letter</p>
              <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-4 mb-5'>
                <p className='text-md text-gray-300 leading-relaxed italic'>
                  "{contract?.proposal?.coverLetter}."
                </p>
              </div>

              <div className='flex gap-10'>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Asking Amount</p>
                  <p className='text-green-400 font-bold text-lg'>${contract?.budget}</p>
                </div>
                <div>
                  <p className='text-lg text-gray-500 uppercase tracking-widest mb-2'>Timeline</p>
                  <p className='text-white font-bold text-lg'>{job?.budget?.duration}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className='flex flex-col gap-5'>

            {/* Contract Management */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>

              
              <h2 className='text-2xl font-bold mb-5'>Contract Management</h2>

              {role==="client" ? 
              
              <div>
                
                  
                  {
                    (contract?.status==="active" || contract?.status==="requested_completion") && (
                      <div className='flex flex-col gap-3 mb-6'>
                    <button 
                    onClick={handleMarkCompleted}
                    className='w-full h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-lg py-2 font-semibold text-white cursor-pointer'>
                      Mark Completed
                    </button>
                    <button 
                    onClick={handleCancelCompletion}
                    className='w-full h-15 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors text-lg font-semibold cursor-pointer'>
                      Cancel Contract
                    </button>
                  </div>
                    )
                  }
                  {
                    contract?.status==="completed" && (
                      <div>
                    {/* < i className="absolute ri-check-fill text-4xl ml-23 mt-2.5"></i> */}
                    <button 
                    // onClick={handleMarkCompleted}
                    
                    className='w-full h-15 rounded-lg bg-[#007111] transition-colors text-lg py-2 font-semibold text-white disable'>
                      Completed
                    </button>
                    <button
                disabled={contract?.cReview}
                onClick={handleReview}
                className={contract?.cReview ? 'mt-5 w-full h-15 rounded-lg bg-[#038416] transition-colors text-lg py-2 font-semibold text-white border border-[#003007] cursor-pointer cursor-not-allowed' : 'mt-5 w-full h-15 rounded-lg bg-[#002d71] transition-colors text-lg py-2 font-semibold text-white border border-[#0037a5] cursor-pointer'}>
                  {
                    contract?.cReview ? 'Review Submitted' : 'Leave a review'
                  }
                </button>
                  </div>
                    )
                  }
                  {
                    contract?.status==="cancelled" && (
                      <div>
                  <button 
                  className='disable w-full h-15 rounded-lg bg-red-600 transition-colors text-lg font-semibold text-white mb-5 font-semibold '>
                    Contract Cancelled
                  </button>
                </div>
                    )
                  }
              </div>
              
              : 
              
              <div>                
              {contract?.status=="completed" && (
                <div>
                  {/* < i className="absolute ri-check-fill text-4xl ml-8 mt-2.5"></i> */}
                <button                 
                className='w-full h-15 rounded-lg bg-[#038416] transition-colors text-lg py-2 font-semibold text-white disable'>
                  Completed
                </button>
                
                <button
                disabled={contract?.fReview}
                onClick={handleReview}
                className={contract?.fReview ? 'mt-5 w-full h-15 rounded-lg bg-[#038416] transition-colors text-lg py-2 font-semibold text-white border border-[#003007] cursor-pointer cursor-not-allowed' : 'mt-5 w-full h-15 rounded-lg bg-[#002d71] transition-colors text-lg py-2 font-semibold text-white border border-[#0037a5] cursor-pointer'}>
                  {
                    contract?.fReview ? 'Review Submitted' : 'Leave a review'
                  }
                </button>

                </div>
              )}
              {contract?.status=="requested_completion" && (
                <div>
                  <button 
                  className='w-full h-15 rounded-lg text-white border border-green-500 disable transition-colors text-lg font-semibold text-[#04342C] mb-5 font-semibold cursor-pointer'>
                    Requested Completion
                  </button>
                  
                </div>
              )}
              {contract?.status=="active" && (
                <div>
                  <button 
                  onClick={handleCompletionRequest}
                  className='w-full h-15 rounded-lg bg-green-400 hover:bg-green-500 transition-colors text-lg font-semibold text-[#04342C] mb-5 font-semibold cursor-pointer'>
                    Request Completion
                  </button>
                </div>
              )}
              {contract?.status=="cancelled" && (
                <div>
                  <button 
                  className='disable w-full h-15 rounded-lg bg-red-600 transition-colors text-lg font-semibold text-white mb-5 font-semibold '>
                    Contract Cancelled
                  </button>
                </div>
              )}

              </div>

              }

              <div className='text-center pt-4 border-t border-[#1e2230]'>
                <p className='text-md text-gray-400 mb-1'>Need help with this contract?</p>
                <button className='text-md text-[#6366F1] hover:underline font-medium'>Contact Support</button>
              </div>
            </div>

            {/* Milestone Progress */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl overflow-hidden'>
              <div className='relative w-full h-50 bg-[#0c1324]'>
                <div className='w-full h-full bg-gradient-to-br from-[#1a2540] to-[#0c1324]'></div>
                <div className='absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-md font-medium text-white'>Milestone Progress</span>
                    <span className='text-md font-bold text-white'>65%</span>
                  </div>
                  <div className='w-full h-3.5 bg-white/20 rounded-full overflow-hidden'>
                    <div className='h-full bg-[#6366F1] rounded-full' style={{ width: '65%' }}></div>
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

export default Details
