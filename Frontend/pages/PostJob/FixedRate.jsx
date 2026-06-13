import React, { useState } from 'react'

const FixedRate = ({budgettype, setbudgettype, jobData, setjobData}) => {

  const [minbudget, setminbudget] = useState('')
  const [maxbudget, setmaxbudget] = useState('')
  const [duration, setduration] = useState('')
  const [xplevel, setxplevel] = useState('')

  return (

    <div 
    className='mt-[3rem]'>
       <h3 
       className='font-bold text-3xl pb-[3rem]'>
          Total Project budget
        </h3>
      <div className='grid grid-cols-2 gap-[2rem]'>

       <div className=''>
        <h4 className='font-semibold text-lg'>Minimum Budget (₹)</h4>
        <input 
        required
        value={jobData.budget.minbudget}
        onChange={(e)=> 
          setjobData({
            ...jobData, budget : {...jobData.budget, minbudget:e.target.value}
          })
        }
        type="number" 
        className='border h-[4rem] w-full rounded-lg pl-15 text-2xl' 
        placeholder='5,000'/>
       </div>

       <div className=''>
        <h4 className='font-semibold text-lg'>Maximum Budget (₹)</h4>
        <input 
        required
        value={jobData.budget.maxbudget}
        onChange={(e)=> {
          setjobData({
            ...jobData, budget : {...jobData.budget, maxbudget:e.target.value}
          })
        }}
        type="number" 
        className='border h-[4rem] w-full rounded-lg pl-15 text-2xl' 
         placeholder='10,000' />
       </div>
      
      </div>

      <p className='mt-5 font-semibold pl-8'>
        Most freelancers prefer seeing a range rather than a single number.
      </p>

      <div className='h-0.5 border border-gray-700 mt-[2.5rem]'></div>

      <div className='pt-[2rem]'>
        <h3 className='font-semibold text-2xl'>Expected Duration</h3>

        <div className='grid xl:grid-cols-4 pt-[1.5rem] gap-[1rem]'>

          <div
          
          onClick={()=> {
            setduration('1-3 Months')
            setjobData({
              ...jobData, budget : {...jobData.budget, duration:'1-3 Months'}})
            }
          } 
          className={`border h-[4rem] rounded-lg flex justify-center items-center font-semibold text-xl cursor-pointer ${duration==='1-3 Months' ? 'border-blue-400':'border-gray-600'}`}>
            1 - 3 Months
          </div>

          <div
          onClick={()=> {
            setduration('3-6 Months')
            setjobData({
              ...jobData, budget : {...jobData.budget, duration:'3-6 Months'}})
            }
          } 
          className={`border h-[4rem] rounded-lg flex justify-center items-center font-semibold text-xl cursor-pointer ${duration==='3-6 Months' ? 'border-blue-400':'border-gray-600'}`}>
            3 - 6 Months
          </div>


          <div
          onClick={()=> {
            setduration('8-12 Months')
            setjobData({
              ...jobData, budget : {...jobData.budget, duration:'8-12 Months'}})
            }
          } 
          className={`border h-[4rem] rounded-lg flex justify-center items-center font-semibold text-xl cursor-pointer ${duration==='8-12 Months' ? 'border-blue-400':'border-gray-600'}`}>
            8 - 12 Months
          </div>


          <div
         onClick={()=> {
            setduration('1 Year+')
            setjobData({
              ...jobData, budget : {...jobData.budget, duration:'1 Year+'}})
            }
          } 
          className={`border h-[4rem] rounded-lg flex justify-center items-center font-semibold text-xl cursor-pointer ${duration==='1 Year+' ? 'border-blue-400':'border-gray-600'}`}>
            1 Years+
          </div>

          
        </div>

        <div className='h-0.5 border border-gray-700 mt-[2.5rem]'></div>

        <div className='pt-[4rem]'>
        <h3 className='font-semibold text-2xl pb-[3rem]'>Desired Experience Level</h3>

        <div className='grid grid-cols-1 gap-5'>

          <div 
          onClick={()=> {
            setxplevel('entry')
            setjobData({
              ...jobData, budget : {...jobData.budget, xplevel:'Entry'}
            })
          }}
          className={`border p-[1rem] flex gap-4  justify-start items-center rounded-lg ${xplevel==='entry' ? 'border-blue-400':'border-gray-600'} cursor-pointer`}>

            <div className='h-[2rem] w-[2rem] border rounded-full'></div>

            <div
            >
              <h4 className={`font-semibold text-2xl`}>
              Entry Level
            </h4>
            <p>
              Looking for someone starting out at a lower cost.
            </p>
            </div>
          </div>



          <div 
          onClick={()=> {
            setxplevel('intermediate')
            setjobData({
              ...jobData, budget : {...jobData.budget, xplevel:'Intermediate'}
            })
          }}
          className={`border p-[1rem] flex gap-4  justify-start items-center rounded-lg ${xplevel==='intermediate' ? 'border-blue-400':'border-gray-600'} cursor-pointer`}>

            <div className='h-[2rem] w-[2rem] border rounded-full'></div>
            <div>
              <h4 className={`font-semibold text-2xl ${xplevel==='intermediate' ? 'border-blue-400':'border-gray-600'}`}>
              Intermediate
            </h4>
            <p>
              Experienced professionals with specialized skills.
            </p>
            </div>
          </div>

          <div 
          onClick={()=> {
            setxplevel('expert')
            setjobData({
              ...jobData, budget : {...jobData.budget, xplevel:'Expert'}
            })
          }}
         className={`border p-[1rem] flex gap-4  justify-start items-center rounded-lg ${xplevel==='expert' ? 'border-blue-400':'border-gray-600'} cursor-pointer`}>

            <div className='h-[2rem] w-[2rem] border rounded-full'>

            </div>
            <div
            >
             <h4 className={`font-semibold text-2xl ${xplevel==='expert' ? 'border-blue-400':'border-gray-600'}`}>
              Expert / Lead
            </h4>
            <p>
              Top-tier talent for high-stakes enterprise projects.
            </p>
            </div>
          </div>

        </div>

        </div>

      </div>
    </div>
  )
}

export default FixedRate
