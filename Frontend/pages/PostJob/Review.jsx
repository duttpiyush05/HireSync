import React from 'react'
import axios from 'axios'


const Review = ({jobData, setjobData}) => {

  const handlePostJob = async () =>
  {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/create`, jobData, {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })  
      console.log(response)
      const data = await response.data
      if(response.status === 201)
      {
        alert(data.message)
        setjobData({
          title : '',
          category : '',
          description : '',
          skills : [],
          budget : {
             type : 'fixed',
             minbudget : '',
              maxbudget : '', 
              duration : '',
              xplevel : ''
             },
          // client : ''
        })
      } else {
        alert('Failed to post job. Please try again.')
      } 
    }catch(err)
    {
      console.log(err.response.data)
      alert('An error occurred while posting the job. Please try again.')
    }
  }


  return (
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

       <div className='h-full w-full max-w-[1400px] px-4 sm:px-4 lg:px-10  mt-10'>

        <div><h2 className='font-bold text-[3rem] '>Review & Post</h2>
        <p className='text-gray-400 font-semibold text-xl pb-[4rem]'>Check everything one last time before making your job live to the HireSync community.</p></div>

        <div className=' grid  lg:grid-cols-3 gap-[1.5rem] pb-[2rem]'>

        <div className='rounded-lg border bg-[#151b2d] p-[2rem] h-auto min-h-[15rem] lg:col-span-2 sm:row-span-1 lg:row-span-2'> 
          <h3 className='font-semibold text-2xl text-blue-400'>Basics</h3>
          <h3 className='font-bold text-4xl'>{jobData.title}</h3>
        </div>

        <div className='rounded-lg border bg-[#151b2d] p-[2rem] h-auto min-h-[15rem] lg:row-span-4'>

          <h3 className='font-semibold text-2xl text-blue-400'>Budget & Timeline</h3>
          
          <div className='grid grid-cols-1 pt-[4rem] gap-[3rem]'>

              <div className='flex gap-10'>
                  <div className='flex justify-center items-center'>Icon</div>
                  <div>
                    <h4 className='text-xl text-gray-300'>Project Budget</h4>
                    <h1 className='text-4xl font-bold'>
                      ₹{jobData.budget.minbudget} - ₹{jobData.budget.maxbudget}
                    </h1>
                  </div>
              </div>

              <div className='flex gap-10'>
                  <div className='flex justify-center items-center'>Icon</div>
                  <div>
                    <h4 className='text-xl text-gray-300'>Est. Budget</h4>
                    <h1 className='text-4xl font-bold'>
                      {jobData.budget.duration}
                    </h1>
                  </div>
              </div>

              <div className='h-0.2 border-gray-500 border'></div>

              <div className=' text-xl text-gray-300 flex flex-col gap-5 items-center'>
                <h3>
                  HireSync Service Includes Fee (3%)
                </h3>
                <h3>
                  Secure Escrow Support <p className='inline text-green-400 font-bold'>Active</p>
                </h3>
              </div>

          </div>

        </div>

        <div className='rounded-lg border bg-[#151b2d] p-[2rem] h-auto min-h-[20rem] col-span-[2] row-span-2'>
        <h3 className='font-semibold text-2xl text-blue-400 pb-[1rem]'>Job Description</h3>
          <h3 className=' text-xl'>{jobData.description}</h3>

        </div>

        
      <div className='rounded-lg border bg-[#151b2d] p-[2rem] h-auto min-h-[25rem] lg:col-span-[2] sm:row-span-2'><h3 className='font-semibold text-2xl text-blue-400 pb-[1rem]'>Required Expertise</h3>

      <div className='grid lg:grid-cols-3 lg:gap-10 pt-6'>
        {
          (jobData.skills.map((skill, index)=>
          {
                return (
                  <button 
                  key={index}
                  className='border p-[1rem] w-[12rem] rounded-lg text-xl bg-gray-700'>
                    {skill}
                    </button>
                )
          }))
        }
      </div>
          </div>

      <div className='rounded-lg border bg-[#151b2d] p-[2rem] h-auto min-h-[12rem] row-span-2'>
        <h3 className='text-xl text-gray-300 gap'>Ready to find your expert? Your job post will be visible to over 200,000 certified freelancers.</h3>

        <button 
        onClick={handlePostJob}
        className='w-full border mt-[2rem] p-[2rem] rounded-lg font-bold text-xl bg-blue-700 cursor-pointer'>
          Post Job Now
        </button>
      </div>

        </div>

        

    </div>
    </div>
  )
}

export default Review
