import React, { useContext } from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {FLDataContext} from '../src/context/FLContext'
import { useNavigate } from 'react-router-dom'

const FreelancerDashboard = () => {
  const [progress, setProgress] = useState(70)

  return (
    <div className='bg-[#0c1324] flex justify-center items-center text-white'>

   <div className=' h-[100%] w-[75%] border-white'>

     <nav className='w-full border-b-2 border-[#0c1324] h-[6rem] flex border-b-1 border-white justifyy-between'>
    
            <div className=' h-full flex items-center gap-4 w-[60rem]'>
              <h2 className='text-3xl font-bold mr-5'>HireSync</h2>
            <ol className='flex gap-[4rem] h-full items-center font-semibold text-md text-gray-300'>
              <Link to="/">Find Work</Link>
              <Link to="/">My Jobs</Link>
              <Link to="/">Messages</Link>
              <Link to="/">Post a Job</Link>
              <Link to="/">Invoices</Link>
            </ol>
    
            </div>
    
            <div className='text-white w-[50%] flex items-center justify-end'>
            <i className="ri-search-line absolute mr-[31rem] ri-2x pl-[2]"></i>
            <input 
            className='h-[4rem] w-[20rem] align-center pl-20 rounded-full bg-[#37374b] text-lg font-semibold mr-[3.6rem]'
            type="text" 
            placeholder='Search....'
          />

              <i className="ri-notification-2-fill ri-2x"></i>
              <div className='bg-white w-10 h-10 rounded-3xl ml-10 mr-15'>
    
              </div>
            </div>
            
          </nav>

          <div className=' pt-[2rem]'>
            <h1 className='text-[4rem] font-bold'>
              Welcome Back,
            </h1>

            <div className=' flex justify-between'>
              <div className='w-[50%] '>
                <h5 className='font-bold mt-[1rem] text-4xl'>
              Overview
            </h5>
            <h3 className='mt-[0.7rem] text-lg'>
              Project Overview and matrices
            </h3>
              </div>

            <div className=' w-[50%] flex justify-end items-end gap-[2rem]' >
              <Link to='/fl/dashboard' className='border-1 h-[4rem] w-[10rem] text-center pt-[1.2rem] rounded-lg'> Reports</Link>
            <Link to='/' className='border-1 h-[4rem] w-[12rem] text-center pt-[1.2rem] rounded-lg'> Find new Works</Link>

            </div>
            </div>

          </div>

          <div className=' grid grid-cols-3 gap-[2rem] pt-[5rem]'>
            <div className='border-1 rounded-md h-[15rem] p-[2rem] '>
              <div className='border-1 w-[3rem] h-[3rem] rounded-full'>
              </div>
              <h3 className='font-bold mt-[2rem] text-xl'>Jobs</h3>
              <h1 className='text-4xl font-bold mt-[0.5rem]'>$25,000</h1>
            </div>
            <div className='border-1 rounded-md h-[15rem] p-[2rem] '>
              <div className='border-1 w-[3rem] h-[3rem] rounded-full'>
              </div>
              <h3 className='font-bold mt-[2rem] text-xl'>Jobs</h3>
              <h1 className='text-4xl font-bold mt-[0.5rem]'>$25,000</h1>
            </div>
            <div className='border-1 rounded-md h-[15rem] p-[2rem] '>
              <div className='border-1 w-[3rem] h-[3rem] rounded-full'>
              </div>
              <h3 className='font-bold mt-[2rem] text-xl'>Jobs</h3>
              <h1 className='text-4xl font-bold mt-[0.5rem]'>$25,000</h1>
            </div>


            <div className='border-1 rounded-sm col-span-2 pb-[3rem] p-[2rem] row-span-9'>

             <div className='flex justify-between  mb-[5rem]'>
               <h2 className='text-3xl font-semibold'>Current Projects</h2>
               <Link to='/fl/login' >View All</Link>
             </div>

             {/* div that wil change on the basis of the projects */}

             <div className='flex flex-col gap-[3rem]'>
              <div className=''>
                <h2 className='text-3xl font-bold mb-[0.8rem]'>Project Name</h2>
                <h3 className='text-gray-300 text-xl'>Company Name</h3>

                <div className='w-full bg-gray-700 rounded-full h-2'>

   <div className='w-full bg-gray-700 rounded-full h-2 mt-[2rem]' >

   <div
      className='bg-purple-500 h-2 rounded-full transition-all duration-300'
      style={{ width: `${progress}%` }}
   ></div>

</div>
</div>

              </div>
             <div className=''>
              <h2 className='text-3xl font-bold mb-[0.8rem]'>Project Name</h2>
              <h3 className='text-gray-300 text-xl'>Company Name</h3>

                <div className='w-full bg-gray-700 rounded-full h-2 mt-[2rem]'>

   <div
      className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
      style={{ width: `20%` }}
   ></div>

</div>

             </div>
             </div>

            </div>



            <div className='border-1 rounded-sm p-[2rem] row-span-[0]'>
              <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold mb-[2rem]'>Recent Messages</h2>

                <Link to='/fl/dahsboard' className='border-1 p-[0.5rem]' >Link</Link>
              </div>

                 {/* div that wil change on the basis of the Messages */}
              <div className='flex flex-col gap-[3rem] justify-between'>
              
              <div className='flex gap-[1rem]'>
                <div className='border-1 h-[4rem] w-[4rem] rounded-full'></div>
                <div className=' w-[50%] p-[1rem] font-semibold text-xl'>Name</div>
                <div className=' w-[full] p-[1rem] w-[25%]'>Time</div>
              </div>
              <div className='flex gap-[1rem]'>
                <div className='border-1 h-[4rem] w-[4rem] rounded-full'></div>
                <div className=' w-[50%] p-[1rem] font-semibold text-xl'>Name</div>
                <div className=' w-[full] p-[1rem] w-[25%]'>Time</div>
              </div>

            
             </div>
            </div>


            <div className='border-1 rounded-sm row-span-15 col-span-2 p-[2rem]'>
               <h2 className='text-3xl font-semibold mb-[4rem]'>Recommedations for you</h2>

               {/* div that wil change on the basis of the Recommendations */}
               <div className='flex flex-col gap-[3rem]'>

                <div className='border-1 p-[1rem] flex flex-col h-[15rem] justify-between'>

                  <div className='flex flex-col '>
                    <h1 className='font-bold text-2xl pb-[1rem]'>
                    Senior Frontend Engineer (Vue.js)
                  </h1>

                  <h3 className='font-semibold text-lg'>
                    Architect a portal with Vue 3 and pinis
                  </h3>

                  <div className='ml-auto p-[1rem]'>
                    TEMP BOX
                  </div>
                  </div>

                  <div className='flex gap-[2rem]'>
                      <div className='h-[3rem] p-[0.7em] text-center w-[7rem] border-1'>Next.Js</div>
                      <div className='h-[3rem] p-[0.7rem] text-center w-[7rem] border-1'>Node.Js</div>

                      <Link to='/fl/dashboard' className='ml-auto p-[1rem]' >View All</Link>
                  </div>

                </div>
             
             <div className='border-1 p-[1rem] flex flex-col h-[15rem] justify-between'>

                  <div className='flex flex-col '>
                    <h1 className='font-bold text-2xl pb-[1rem]'>
                    Senior Frontend Engineer (Vue.js)
                  </h1>

                  <h3 className='font-semibold text-lg'>
                    Architect a portal with Vue 3 and pinis
                  </h3>

                  <div className='ml-auto p-[1rem]'>
                    TEMP BOX
                  </div>
                  </div>

                  <div className='flex gap-[2rem]'>
                      <div className='h-[3rem] p-[0.7em] text-center w-[7rem] border-1'>Next.Js</div>
                      <div className='h-[3rem] p-[0.7rem] text-center w-[7rem] border-1'>Node.Js</div>

                      <Link to='/fl/dashboard' className='ml-auto p-[1rem]' >View All</Link>
                  </div>

                </div>

               </div>
            </div>

            

            <div className='border-1 rounded-sm p-[2rem] row-span-[0]'>

               <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold mb-[2rem]'>Activity Feed</h2>

  
              </div>

                 {/* div that wil change on the basis of the Messages */}
              <div className='flex flex-col gap-[3rem] justify-between'>
              
              <div className='flex gap-[1rem]'>
                <div className='border-1 w-full h-[6rem] flex p-[1rem]'>

                  <div className='h-[3rem] w-[3rem] rounded-full border-1'>
                    
                  </div>
                </div>
              </div>
              

            
             </div>

            </div>

            <div className='border-1 rounded-sm row-span-2 row-span-4'>G


            </div>
          </div>

           <footer  className=' h-[15rem] w- flex bg-[#15152a] mt-[3rem]'>
          <div className='w-[60%] h-full p-[4rem]'>
            <h2 className='text-3xl font-bold mb-3'>HireSync</h2>
            <p className='text-lg'>© 2026 HireSync. All rights reserved.</p>
          </div>

          <div >
            <ol className='w-full flex h-[20%] p-[5rem] gap-[3rem] font-semibold text-lg'>
              <li>Company</li>
              <li>Resources</li>
              <li>Support</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ol>
          </div>
      </footer>
   </div>

  

    </div>
  )
}

export default FreelancerDashboard
