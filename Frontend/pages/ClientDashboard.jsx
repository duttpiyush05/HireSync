import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ClientDataContext } from '../src/context/ClientContext'

const ClientDashboard = () => {
  const [progress, setProgress] = useState(70)
  const [menuOpen, setMenuOpen] = useState(false)
  const { client, setclient } = useContext(ClientDataContext)
  const token = localStorage.getItem('token')

  const [clientId, setClientId] = useState('')
  const [proposals, setProposals] = useState([])

  const [isloading, setisLoading] = useState(true)
    

  useEffect(() => {
    const getProfile = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      setclient(response.data.client)
      setClientId(response.data.client._id)
      }catch(err)
      {
        
      }finally{setTimeout(()=>
      {
        setisLoading(false)
      }, 1000)
    }
    }
    getProfile()
  }, [])



  useEffect(()=>{
    const getProposals = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/proposals/clients/${clientId}`, 
          {
            headers : {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response);
          const data = response.data
          setProposals(data.proposals)
      }catch(err)
      {
        console.log(err.response.data);
        
      }
    }
    getProposals()
  },[clientId])

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
    <div className='bg-[#0c1324] min-h-screen flex justify-center text-white'>

      <div className='h-full w-full max-w-[1600px] px-4 sm:px-6 lg:px-10'>


        <div className='pt-6 sm:pt-8 lg:pt-[2rem]'>
          <h1 className='text-2xl sm:text-4xl lg:text-5xl xl:text-[4rem] font-bold leading-tight'>
            Welcome Back, {client?.fullname?.firstname}!
          </h1>

          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 mt-3'>
            <div>
              <h3 className='mt-2 text-sm sm:text-lg lg:text-2xl text-gray-300 font-semibold'>
                Here's an overview of your hiring pipeline and active engagements.
              </h3>
            </div>

            <div className='flex gap-3 sm:gap-6 flex-wrap'>
              <Link
                to='/post-job'
                className='border border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[12rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#3d4aff] gap-2 whitespace-nowrap'
              >
                <i className="ri-add-line ri-xl"></i>
                Post a New Job
              </Link>
              <Link
                              to='/client/profile'
                              className='border border-white h-[3.5rem] sm:h-[4rem] px-4 sm:w-[10rem] text-center flex items-center justify-center rounded-lg text-base sm:text-lg font-semibold bg-[#00bc00] hover:bg-[#1d6800]'
                            >
                              <i className="ri-pencil-line mr-1"></i> Edit Profile
                            </Link>
            </div>
          </div>

        </div>

        {/* STAT CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 mt-4 sm:mt-8'>

          <div className='h-auto min-h-[10rem] sm:min-h-[12rem] p-5 sm:p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>
            <div className='font-bold p-1 sm:p-2 flex justify-between items-start'>
              <h3 className='text-base sm:text-lg font-bold mb-2 sm:mb-4'>Total Posted Jobs</h3>
              <div className='p-1 sm:p-[0.3rem] rounded-lg border flex-shrink-0'>
                <i className="ri-suitcase-fill text-sm sm:text-base"></i>
              </div>
            </div>
            <h2 className='font-bold mt-2 sm:mt-3 p-2 sm:p-4 text-2xl sm:text-4xl lg:text-[3rem] text-center'>
              12
            </h2>
          </div>

          <div className='h-auto min-h-[10rem] sm:min-h-[12rem] p-5 sm:p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>
            <div className='font-bold p-1 sm:p-2 flex justify-between items-start'>
              <h3 className='text-base sm:text-lg font-bold mb-2 sm:mb-4'>Active Hires</h3>
              <div className='p-1 sm:p-[0.3rem] rounded-lg border flex-shrink-0'>
                <i className="ri-team-line text-sm sm:text-base"></i>
              </div>
            </div>
            <h2 className='font-bold mt-2 sm:mt-3 p-2 sm:p-4 text-2xl sm:text-4xl lg:text-[3rem] text-center'>
              24
              <p className='text-xs sm:text-base text-gray-300 font-semibold mt-2'>
                Across 8 Projects
              </p>
            </h2>
          </div>

          <div className='h-auto min-h-[10rem] sm:min-h-[12rem] p-5 sm:p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>
            <div className='font-bold p-1 sm:p-2 flex justify-between items-start'>
              <h3 className='text-base sm:text-lg font-bold mb-2 sm:mb-4'>Total Spend (YTD)</h3>
              <div className='p-1 sm:p-[0.3rem] rounded-lg border flex-shrink-0'>
                <i className="ri-currency-fill text-sm sm:text-base"></i>
              </div>
            </div>
            <h2 className='font-bold mt-2 sm:mt-3 sm:p-4 text-2xl sm:text-4xl lg:text-[3rem] text-center'>
              $12,000
              <p className='text-xs sm:text-base text-gray-300 font-semibold mt-2'>On track with budget</p>
            </h2>
          </div>

          <div className='h-auto min-h-[10rem] sm:min-h-[12rem] p-5 sm:p-6 border rounded-2xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'>
            <div className='font-bold p-1 sm:p-2 flex justify-between items-start'>
              <h3 className='text-base sm:text-xl font-bold mb-2 sm:mb-4'>Upcoming Projects</h3>
              <div className='p-1 sm:p-[0.3rem] rounded-lg border flex-shrink-0'>
                <i className="ri-receipt-fill text-sm sm:text-base"></i>
              </div>
            </div>
            <h2 className='font-bold mt-2 sm:mt-3 p-2 sm:p-4 text-2xl sm:text-4xl lg:text-[3rem] text-center'>
              3
              <p className='text-xs sm:text-base text-red-300 font-semibold mt-2'>3 Due within 7 days</p>
            </h2>
          </div>

        </div>

        {/* APPLICANTS HEADER */}
        <div className='mt-10 sm:mt-16 mb-6 flex items-center justify-between gap-4'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold'>
            Top Recent Applicants
          </h2>
          <Link to="/applicants" className='text-blue-500 hover:text-blue-700 font-semibold text-sm sm:text-lg whitespace-nowrap'>
            View All
          </Link>
        </div>

        {/* APPLICANT CARDS */}
        <div 
        className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8'>

          {proposals.map((id) => (
            <div key={id} 
            className={
              `${id.status === 'rejected' ? 'hidden' : 'h-auto min-h-[15rem] max-w-[40rem] sm:min-h-[15rem] p-5 sm:p-6 border rounded-xl bg-[#151b2d] shadow-xl hover:border-blue-500 transition duration-0'}`
            }>

              <div className='font-bold p-1 sm:p-2 flex flex-col sm:flex-row gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row justify-between w-full gap-3'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-lg sm:text-2xl capitalize'>{id?.freelancer?.fullname?.firstname}</span>
                    <p className='text-sm sm:text-lg text-gray-300 font-semibold'>{id?.job?.title}</p>
                  </div>

                  <div className='px-4 rounded-3xl flex gap-1 sm:gap-3 items-center justify-center text-green-400 bg-[#3e4292] '>
                    <i className="ri-flashlight-fill"></i>
                    <h3 className='text-sm sm:text-lg  whitespace-nowrap'>X% Match</h3>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row justify-between w-full mt-4 font-semibold gap-1 text-sm sm:text-base'>
                <div>Ratings</div>
                <div>Applied : {id?.updatedAt ? new Date(id?.createdAt).toLocaleDateString() : 'Unknown'}</div>
              </div>

              {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 font-semibold text-sm sm:text-base'>
                <Link to="/profile" className='bg-[#272752] text-white py-2 px-4 rounded-lg hover:bg-blue-900 h-12 sm:h-14 flex items-center justify-center'>
                  Review Profile
                </Link>
                <Link to="/profile" className='bg-[#002d61] text-white py-2 px-4 rounded-lg hover:bg-[#004da5] h-12 sm:h-14 flex items-center justify-center'>
                  Message
                </Link>
              </div> */}

            </div>
          ))}

        </div>


      </div>

    </div>
  )
}

export default ClientDashboard