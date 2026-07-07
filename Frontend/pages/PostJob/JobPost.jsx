import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Basics from './Basics'
import Description from './Description'
import Budget from './Budget'
import Review from './Review'
import { toast } from 'react-toastify'

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

   const [isloading, setisLoading] = useState(true)

   useEffect(()=>
   {
      const settingisLoading = ()=>
      {
         setTimeout(()=>
         {
            setisLoading(false)
         }, 5000)
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

   const nextStep = ()=>
   {
      switch(step)
      {
         case 1 :
               if(!jobData.title.trim())
               {
                  toast.warning('Please Fill Job Title')
                  return
               }
               else if(!jobData.category)
               {
                  toast.warning('Please Select Job Category')
                  return
               }

               setstep(step+1)
               setCurrentStep(currentStep+1)

               break
         case 3 :
               if(jobData.budget.minbudget.length ===0 || jobData.budget.maxbudget.length ===0)
               {
                  toast.warning('Please Enter Budget price')
                  return
               }
               else if((Number)(jobData.budget.minbudget) > (Number)(jobData.budget.maxbudget))
               {
                  
                  toast.warning('Please Enter Correct Budget Price')
                  return
               }
               if(jobData.budget.duration.length===0)
               {
                  toast.warning('Please Select Duration')
                  return
               }
               if(jobData.budget.xplevel===0)
               {
                  toast.warning('Please Select Experience Level')
                  return
               }

               setstep(step+1)
               setCurrentStep(currentStep+1)
               break
         case 2: 
                if(!jobData.description.trim())
               {
                  toast.warning('Please Fill Job Description')
                  return
               }
               else if(jobData.description.trim().length<10)
               {                  
                  toast.warning('Please Enter atleast 10 words')
                  return
               }
               if(jobData.skills.length===0)
               {
                  toast.warning('Please Select 1 skill')
                  return
               }
               setstep(step+1)
               setCurrentStep(currentStep+1)
               break  
      }

   }

  return (
    
     <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

       <div className='h-full w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>

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
          className='font-semibold text-lg h-15 bg-gray-700 text-center w-50 rounded-md cursor-pointer' >
            {
               step>=2 ? 'Previous' : 'Cancel'
            }
         
          </button>


          <button 
          onClick={()=> nextStep()}
          className={`p-5 w-50 rounded-md bg-[#2e8fff] font-semibold cursor-pointer
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
