import React, { useState } from 'react'

const Basics = ({jobData, setjobData}) => {

  return (

    <div className=' mt-10 h-full rounded-xl '>
      
      <div className='rounded-lg  bg-[#151b2d] p-[2rem] shadow-2xl'>
        <h2 className='font-bold text-[3rem]'>Job Basics</h2>
        <p className='font-semibold text-xl'>Let's start with the fundamental information about your opening.</p>

        <form action="">

          <div className='mt-20 pb-[2rem] '>
          <h3 className='font-semibold text-xl text-blue-500'>Job Title</h3>

          <input type="text" 
          required
          value={jobData.title}
          onChange={(e)=> 
            setjobData({
              ...jobData, title: e.target.value
            })
          }
          className=' w-full h-15 mb-2 mt-2 rounded-md p-[1rem] text-md bg-[#37374b] capitalize'
          placeholder='e.g. Senior React Developer'
          />

          <p>A clear title helps attract the right talent.</p>
        </div>

        <div className='mt-0  pb-[2rem]'>
          <h3 className='font-semibold text-xl text-blue-500'>Job Category</h3>

        <select 
        required
        value={jobData.category}
        onChange={(e)=> 
          setjobData({
            ...jobData, category : e.target.value
          })
        }
        className='bg-[#37374b] font-semibold w-full h-15 mb-2 mt-2 rounded-md p-[1rem]'>
          <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="AI/ML">AI/ML</option>
          <option value="DevOps">DevOps</option>
          <option value="Cybersecurity">Cybersecurity</option>

        </select>

          
        </div>

        </form>


      </div>

      <div className=' grid xl:grid-cols-2 gap-2 mt-10 pb-[1rem]'>

        <div className='p-[1.8rem] rounded-lg  bg-[#151b2d] h-[15rem] shadow-2xl' >
          <div className='border w-[3rem] h-[3rem] mb-2'></div>

          <h4 className='font-semibold text-lg'>Quick Tip</h4>
          <p className='font-semibold text-gray-400 w-[85%]'>Specific job titles receive up to 3x more relevant applications. Avoid generic titles like "Developer".</p>
        </div>

      <div className='p-[1.8rem] rounded-lg  bg-[#151b2d] shadow-2xl' >
          <div className='border w-[3rem] h-[3rem] mb-2'></div>

          <h4 className='font-semibold text-lg'>Confidentiality</h4>
          <p className='font-semibold text-gray-400 w-[85%]'>Your company details remain private until you decide to reveal them during the interview stage.</p>
        </div>
       

      </div>

    </div>
  )
}

export default Basics
