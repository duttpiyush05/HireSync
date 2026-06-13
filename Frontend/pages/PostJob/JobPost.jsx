import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Basics from './Basics'
import Description from './Description'
import Budget from './Budget'
import Review from './Review'
// import { Toaster, toast } from 'alert'
import toast,{Toaster} from 'react-hot-toast'

const JobPost = () => {
  const steps = ['Basics', 'Details', 'Budget', 'Review']
  //for page render
  const [step, setstep] = useState(1)
  //for showing the steps in the lines'
  const [currentStep, setCurrentStep] = useState(1)

  const [jobData, setjobData] = useState({
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

   console.log(jobData)

   const nextStep = ()=>
   {
      if(step==1 && (!jobData.title || !jobData.category))
      {
         // <Toaster />
         alert('Please field all fields')
         return
      }
      setstep(step+1)
      setCurrentStep(currentStep+1)

   }


  return (
    
     <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

       <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>


        <nav className='w-full border-b-2 border-[#0c1324] h-[6rem] flex border-b-1 border-white justify-between sticky top-0 z-50 bg-[#15152a] rounded-b'>

        <div className=' h-full flex items-center gap-4 w-[60rem]'>
          <Link to='/' className='text-3xl font-bold mr-5'>HireSync</Link>

        </div>

        <div className='text-white w-[50%] flex items-center justify-end'>
            <i className="ri-notification-2-fill ri-xl cursor-pointer"></i>
             
         
          <div className='bg-white w-10 h-10 rounded-3xl ml-10 mr-15'>

          </div>
        </div>
        
      </nav>

        <div className='flex items-center justify-center w-full mt-[4rem]  font-semibold text-xl pl-[1rem]'>

   {steps.map((step, index) => (

      <div
         key={index}
         className='flex items-center w-full '
      >

         <div className='flex flex-col items-center justify-center'>

            <div
               className={`
                  h-10 w-10 rounded-full
                  flex items-center justify-center
                  text-white font-bold
                  ${
                     currentStep >= index + 1
                     ? 'bg-blue-600'
                     : 'bg-gray-600'
                  }
               `}
            >
               {index +1}
            </div>

            <p className='mt-2 text-lg'>
               {step}
            </p>

         </div>

         {index !== steps.length - 1 && (

            <div
               className={`
                  flex-1 h-1 mx-2 mb-10 rounded-xl
                  ${
                     currentStep > index + 1
                     ? 'bg-blue-600'
                     : 'bg-gray-600'
                  }
               `}
            />

         )}

      </div>

   ))}

         </div>

        <div>
         {
            (step==1 && <Basics
            jobData = {jobData}
            setjobData = {setjobData}
            />)
         }
         {
            (step==2 && <Description
            jobData = {jobData}
            setjobData = {setjobData}
            />)
         }
         {
            (step==3 && <Budget
            jobData = {jobData}
            setjobData = {setjobData}
            />)
         }
         {
            (step==4 && <Review
            jobData = {jobData}
            setjobData = {setjobData}
            />)
         }
        </div>
         
         <div className=' flex justify-between m-10 pb-[5rem]' >
          <button 
          onClick={()=>
            {
               (step>=2) ?
               setstep(step-1): 
                  setjobData({
                     ...jobData, title : '',category :'',
                  }),
                  (step===1) ? setCurrentStep(1):setCurrentStep(currentStep-1)
            }
          }
          className='font-semibold text-lg h-15 bg-gray-700 text-center w-50 rounded-md' >
            {
               step>=2 ? 'Previous' : 'Cancel'
            }
         
          </button>


          <button 
          onClick={()=> nextStep()}
          className={`p-5 w-50 rounded-md bg-[#2e8fff] font-semibold
          ${
            step==4 && 'hidden'
          }
          `}>
            {
               step>=1 && step<=3 ? 'Continue' : ''
            }
         </button>
         {/* <Toaster /> */}


        </div>


       </div>

      </div>
  )
}

export default JobPost
