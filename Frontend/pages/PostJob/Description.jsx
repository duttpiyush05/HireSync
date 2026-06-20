import React, { useState , useEffect} from 'react'

const Description = ({jobData, setjobData}) => {

  const [decription, setdescription] = useState('')

  const availableSkills = [
    'React', 'Node.js', 'UI/UX Design','TypeScript','PostgreSQL','Machine Learning','React Native', 'Flutter','Express.js','Spring Boot','MongoDB','Next.js']

  const addSkill = (skill)=>
  {
    if(!jobData.skills.includes(skill))
    {
      setjobData({
        ...jobData, skills:[...jobData.skills, skill]
      })
    }
  }
  const removeSkill = (skill)=>
  {
    setjobData({
      ...jobData,
      skills : jobData.skills.filter((item)=> item!=skill)
    })
  }

  const [isloading, setisLoading] = useState(true)
  
     useEffect(()=>
     {
        const settingisLoading = ()=>
        {
           setTimeout(()=>
           {
              setisLoading(false)
           }, 1000)
        }
        settingisLoading()
     },[])
  
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
   <div className='mt-10 h-full rounded-xl '>

    <div className='pb-[3rem]'>
      <h2 className='font-bold text-[3rem]'>Job Details</h2>
    </div>
      
      <div className='grid  lg:grid-cols-3 gap-[1.5rem] '>
        
        <div className='rounded-lg bg-[#151b2d] p-[2rem] h-auto min-h-[12rem] col-span-[2] row-span-2 shadow-2xl'>
        <div className=' flex justify-between items-center '>

              <h3 className='font-bold text-[2rem]'>Job Descriptions</h3>
              <h4 className='font-semibold text-[1.2rem] text-gray-300'>Recommended : 200+ words</h4>

        </div>

          <textarea name="" id="" rows={20} 
        required
        value={jobData.decription}
        onChange={(e)=>
        {
          setjobData({
            ...jobData, description : e.target.value
          })
        }
        }
        className='w-full border rounded-lg mt-10 p-[2rem] text-xl'
        placeholder='Describe the project scope, technical challenges, and expected outcomes. Be as detailed as possible to attract the best talent...'
        ></textarea>

      </div>

      <div className='border-3 border-[#00679b] shadow-2xl h-auto min-h-[25rem] p-[2rem] rounded-lg bg-[#151b2d] shadow-2xl'>
        <h3 className='font-semibold text-[2rem]'>Pro-Tips</h3>

        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <p className=' text-lg'>Detailed descriptions lead to 40% higher quality applications.</p>
          </div>
        </div>
        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <p className=' text-lg'>Selecting 3-5 specific skills helps our matching algorithm find the perfect developer faster.</p>
          </div>
        </div>
      </div>


      <div className='border-3 border-[#00679b] shadow-2xl h-auto min-h-[25rem] p-[2rem] rounded-lg row-span-1 bg-[#151b2d]'>
        <h3 className='font-semibold text-[1.5rem]'>Platform Benefits</h3>

        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'><p className='font-bold inline'>Verified Talent</p>: Access top 1% of pre-vetted freelancers.</h2>
          </div>
        </div>
        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'><p className='font-bold inline'>Instant Matching</p>: AI-driven matching finds candidates in minutes.</h2>
          </div>
        </div>
        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'><p className='font-bold inline'>Risk-Free</p>: 100% money-back guarantee on your first hire.</h2>
          </div>
        </div>
      </div>

      <div className='rounded-lg  bg-[#151b2d] p-[2rem] h-auto min-h-[12rem] col-span-[2] row-span-10 shadow-2xl'>
        <div className=' flex flex-col justify-between '>

              <h3 className='font-bold text-[2rem]'>Required Skills</h3>
              <h4 className='font-semibold text-[1.2rem] text-gray-300 mt-[.5rem]'>Specify technical expertise and tools needed for this role.</h4>

        </div>

       

        <div className=' mt-[2.5rem] flex gap-4 flex-wrap justify-evenly h-1/4'>

        {availableSkills.map((skill, index)=>
        {
          const isSelected = jobData.skills.includes(skill)
          return (
            

            <button 
            key={index}
            onClick={()=>{isSelected ? removeSkill(skill) : addSkill(skill)}}
            className={`cursor-pointer p-[1rem] w-[15rem] border rounded-md font-semibold text-[1rem] ${
              isSelected ? 'bg-blue-500' : 'bg-gray-800'
            }`}>
              {skill}

              <span className='ml-4'>
                {
                  isSelected ? 'X' : '+'
                }
              </span>
            </button>
          )
        })}


        </div>

      </div>

      <div className='border-3 border-[#00679b] h-auto min-h-[25rem] p-[2rem] rounded-lg row-span-10 lg:col-span-1 bg-[#151b2d] shadow-2xl'>
        <h3 className='font-semibold text-[1.5rem]'>Compliance & Safety</h3>

        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'>Funds are held securely in escrow until milestones are approved.</h2>
          </div>
        </div>
        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'>Verified payment methods ensure global tax and labor law compliance.</h2>
          </div>
        </div>
        <div className='flex gap-[2rem] pt-[2rem]'>
          <div>icon</div>
          <div>
            <h2 className=' text-lg'>Automated NDAs and intellectual property protection for every contract.</h2>
          </div>
        </div>
      </div>


      </div>

    

     </div>
  )
}

export default Description
