import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'


const CreateProposal = () => {

  const {jobId} = useParams()
  const navigate = useNavigate()
  const [job, setjob] = useState()
  const [clientId, setclientId] = useState()
  const [freelancerId, setfreelancerId] = useState()

  useEffect(() =>{
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
        const job = data.job
        const clinet_id = job.client._id
        const freelancer_id = data.user
        setjob(job)
        setclientId(id)
      }catch(err){
    } finally
      {
        setTimeout(() => {
          setisLoading(false)
        }, 200);
      }
    }

    fetchJob()
  },[clientId])

   const [file, setFile] = useState(null)

  const [coverLetter, setCoverLetter] = useState('')
  const [askingPrice, setAskingPrice] = useState(0)
  const [completion, setCompletion] = useState('Less than 1 month')

  const [isloading, setisLoading] = useState(true)
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

  const serviceFee = askingPrice * 0.10
  const youReceive = askingPrice - serviceFee


  const formData = new FormData()
  formData.append('coverLetter', coverLetter)
  formData.append('portfolio', file)
  formData.append('askingAmt', askingPrice)
  formData.append('estCompletion', completion)
  formData.append('platformFee', serviceFee)
  formData.append('receivingAmt', youReceive)

  const handleSubmitProposal = async(e)=>
  {
    e.preventDefault()
    if(coverLetter.length===0)
    {
      return toast.warning("Please fill the Cover Letter")
    }
    else if(coverLetter.length<=10)
    {
      return toast.warning("Coverletter must be atleast 15 Words")
    }
    else if(askingPrice<=0)
    {
      setAskingPrice(0)
      return toast.warning("Enter a valid Price")
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/proposals/${jobId}`, formData ,
        {
          headers : 
          {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      const data = response.data
      const proposalId = data?.proposal?._id

      if(response.status === 201)
      {
        navigate(`/proposals/${proposalId}/submission`)
        toast.success("Proposal Sucessfully Submitted")
      }      
    }catch(err)
    {
      toast.error(err?.response?.data?.message)   
    }finally{
      setTimeout(()=>
      {
        setisLoading(false)
      }, 2000)
    }
  }

  return (
    
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>

     <div className=' min-h-screen bg-[#0c1324] text-white px-4 sm:px-8 md:px-12 lg:px-1 py-8'>

      {/* Back Link */}
      <Link 
      to={-1} className='flex items-center gap-2 text-lg text-gray-400 hover:text-white transition-colors mb-6'>
        <i className="ri-arrow-left-line"></i>
        Back to Job Post
      </Link>

      <div className='flex flex-col lg:flex-row gap-6  mx-auto '>

        {/* LEFT COLUMN */}
        <div className='w-full lg:w-[62%]'>
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6 sm:p-8'>

            <h1 className='text-2xl sm:text-4xl font-bold mb-1'>Submit Proposal</h1>
            <p className='text-lg text-gray-400 mb-8'>
              Job: <span className='text-[#6366F1] font-medium'>{job.title}</span>
            </p>

            {/* Cover Letter */}

            <h2 className='text-xl font-bold mb-1'>Cover Letter *</h2>
            <p className='text-lg text-gray-400 mb-3'>Introduce yourself and explain why you're the best fit for this role.</p>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={10}
              required
              placeholder='Describe your experience with React, Tailwind, and high-performance dashboards...'
              className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg p-6 text-lg text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-[#6366F1] transition-colors'
            />

            {/* Upload */}
            <div className='mt-4 border border-dashed border-[#33336e] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#6366F1] transition-colors bg-[#0c1324] h-[14rem]'>
              <i className="ri-file-upload-line text-5xl text-[#6366F1]"></i>
              
              <p className='text-lg font-semibold text-white'>Upload relevant portfolio work</p>
              <p className='text-sm text-gray-400'>PDF Upto 10MB </p>
              <div className='flex justify-evenly items-center w-[40%] text-blue-500 font-semibold cursor-pointer' >

                <label
                  htmlFor="portfolio"
                  className=" p-3  bg-blue-600 text-white rounded-sm cursor-pointer"
                >
                  Upload Portfolio
                </label>

                <input 
              className=' p-3 cursor-pointer w-full hidden'
              id='portfolio'
              type="file"
              accept='.pdf'
              // value={file}
              onChange={(e)=> setFile(e.target.files[0])}
              />
              <p className="mt-2 text-gray-300 max-w-[120px] truncate">
                {file?.name || "No file selected"}
              </p>
              </div>
            </div>

            {/* Proposed Rate */}
            <h2 className='text-xl font-bold mt-8 mb-4'>Proposed Rate *</h2>

            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
              <div className='flex-1'>
                <label className='text-md text-gray-400 mb-2 block'>Your Asking Price (₹)</label>
                <div className='flex items-center bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 gap-2'>
                  <span className='text-gray-400 text-md'>₹</span>
                  <input
                    type='number'
                    value= {askingPrice!=0? askingPrice : ''}
                    onChange={(e) => setAskingPrice(Number(e.target.value))}
                    placeholder={`0`}
                    required
                    className='bg-transparent flex-1 text-md text-white focus:outline-none'
                  />
                </div>
              </div>
              <div className='flex-1'>
                <label className='text-md text-gray-400 mb-2 block'>Estimated Completion</label>
                <select
                  value={completion}
                  onChange={(e) => setCompletion(e.target.value)}
                  className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer'
                >
                  <option>Less than 1 month</option>
                  <option>1 - 3 months</option>
                  <option>3 - 6 months</option>
                  <option>6 - 9 months</option>
                  <option>More than 1 year</option>
                </select>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-5 flex flex-col gap-3'>
              <div className='flex items-center justify-between text-md'>
                <span className='text-gray-400'>Service Amount</span>
                <span className='text-white font-medium'>₹{askingPrice.toFixed(2)}</span>
              </div>
              <div className='flex items-center justify-between text-md'>
                <span className='text-gray-400'>HireSync Platform Fee (10%)</span>
                <span className='text-red-400 font-medium'>-₹{serviceFee.toFixed(2)}</span>
              </div>
              <div className='h-px bg-[#1e2230]'></div>
              <div className='flex items-center justify-between'>
                <span className='text-md font-bold text-white'>You'll Receive</span>
                <span className='text-green-400 font-bold text-xl'>₹{youReceive.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-8'>
              <button 
              onClick={(e) => handleSubmitProposal(e)}
              className='w-full sm:flex-1 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors font-semibold text-md flex items-center justify-center gap-2 cursor-pointer'>
                <i className="ri-send-plane-fill "></i>
                Send Proposal
              </button>
                <button className='w-full sm:w-auto px-6 h-15 rounded-lg border border-[#1e2230] bg-transparent hover:bg-[#2c2c5c] transition-colors text-md text-gray-300 font-medium'>
                Save as Draft
              </button>
            </div>
              

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className='w-full lg:w-[38%] flex flex-col gap-5'>

          {/* Proposal Tips */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <i className="ri-map-pin-line text-yellow-400"></i>
              Proposal Tips
            </h2>

            <div className='flex flex-col gap-5'>
              <div>
                <p className='text-md font-bold uppercase tracking-widest text-[#6366F1] mb-2'>Showcase Experience</p>
                <p className='text-lg text-gray-400 leading-relaxed'>
                  Clients value specific project examples. Mention how you've solved similar problems for Fintech dashboards before.
                </p>
              </div>

              <div>
                <p className='text-md font-bold uppercase tracking-widest text-[#6366F1] mb-2'>Keep It Personal</p>
                <p className='text-lg text-gray-400 leading-relaxed'>
                  Avoid copy-pasting. Address the client's specific requirements mentioned in the job description.
                </p>
              </div>

              {/* Quote */}
              <div className='bg-[#19192f] border border-[#33336e] rounded-lg p-4'>
                <p className='text-md text-[#6366F1] italic leading-relaxed'>
                  "A strong first sentence increases your chance of being hired by 40%."
                </p>
              </div>

              {/* Video Thumbnail */}
              {/* <div className='relative rounded-lg overflow-hidden cursor-pointer group'>
                <div className='w-full h-28 bg-[#0c1324] border border-[#1e2230] rounded-lg flex items-center justify-center'>
                  <div className='w-10 h-10 rounded-full bg-[#6366F1]/80 flex items-center justify-center group-hover:bg-[#6366F1] transition-colors'>
                    <i className="ri-play-fill text-white text-lg ml-0.5"></i>
                  </div>
                </div>
                <p className='text-xs text-gray-400 mt-2 text-center'>Video Guide: Landing High-Value Clients</p>
              </div> */}
            </div>
          </div>

          {/* Job Details */}
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-4'>Job Requirements</h2>
            <div className='flex flex-wrap gap-2'>
              {job.skills.map((tag, i) => (
                <span
                  key={i}
                  className='text-md px-3 py-1.5 rounded-md bg-[#19192f] border border-[#33336e] text-gray-300'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>

      </div>

    </div>
    
  )
}

export default CreateProposal
