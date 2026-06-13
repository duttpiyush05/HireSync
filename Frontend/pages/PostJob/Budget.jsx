import React, { useState } from 'react'
import HourlyRate from './HourlyRate'
import FixedRate from './FixedRate'

const Budget = ({jobData, setjobData}) => {

  const [budgettype, setbudgettype] = useState('fixed')

  return (
    <div className=' mt-10 h-full rounded-xl '>
      
      <div className='rounded-lg  bg-[#151b2d] p-[2rem]'>
      <h2 className='font-bold text-[2rem]'>What type of project is this?</h2>
        <p className='font-semibold text-xl text-gray-400'>Fixed price projects are ideal for well-defined deliverables and milestones.</p>

        <div className=' grid xl:grid-cols-2 gap-5 mt-10 pb-[1rem]'>

        <div 

        onClick={()=> {
          setbudgettype('hourly')
          setjobData({
            ...jobData, budget : {
                                  ...jobData.budget, type:'hourly', minbudget:'', maxbudget:'', duration :'', xplevel :''
                                  },
                                  
          })

        }}

        className={`p-[1.8rem] rounded-lg  bg-[#151b2d] border cursor-pointer
          ${
            budgettype=='hourly' ? 'border-5 border-blue-400' : 'border-gray-500 border-5'
          }
      `} >
          <div className='border w-[3rem] h-[3rem] mb-2'></div>

          <h4 className='font-bold text-2xl mt-[2rem]'>Hourly Rate</h4>
          <p className='font-semibold text-gray-400 w-[85%] mt-[1rem]'>Best for ongoing projects or tasks without a set scope. Flexible billing based on hours worked.</p>
        </div>

      <div 
       onClick={()=> {
        setbudgettype('fixed')
        setjobData({
          ...jobData, budget : {
                                ...jobData.budget, type : 'fixed', minbudget:'', maxbudget:'', duration :'', xplevel :''
                                }
        })
       }}
      className={`p-[1.8rem] rounded-lg  bg-[#151b2d] border cursor-pointer
          ${
            budgettype=='fixed' ? 'border-5 border-blue-400' : 'border-gray-500 border-5'
          }
      `} >
          <div className='border w-[3rem] h-[3rem] mb-2'></div>

          <h4 className='font-bold text-2xl mt-[2rem]'>Fixed Price</h4>
          <p className='font-semibold text-gray-400 w-[85%] mt-[1rem]'>Set a total budget for the whole project. Great for clear scopes and milestones.</p>
        </div>
       


      </div>

            <div className=''>
            {
              (budgettype=='hourly' && <HourlyRate 
              budgettype = {budgettype}
              setbudgettype = {setbudgettype}
              jobData = {jobData}
              setjobData = {setjobData}
              />)
            }
            {
              (budgettype=='fixed' && <FixedRate 
              budgettype = {budgettype}
              setbudgettype = {setbudgettype}
              jobData = {jobData}
              setjobData = {setjobData}
              />)
            }
          </div>

        
      </div>
    </div>
  )
}

export default Budget
