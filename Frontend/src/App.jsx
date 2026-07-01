import { useState,useContext, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import RegisterPage from '../pages/RegisterPage'
import LandingPage from '../pages/LandingPage'
import LoginFLPage from '../pages/LoginFLPage'
import FreelancerDashboard from '../pages/FreelancerDashboard'
import FreelancerAuth from '../pages/FreelancerAuth'
import ClientAuth from '../pages/ClientAuth'
import FreelancerLogout from '../pages/FreelancerLogout'
import ClientRegisterPage from '../pages/ClientRegisterPage'
import ClientDashboard from '../pages/ClientDashboard'
import ClientLogout from '../pages/ClientLogout'
import ClinetLoginPage from '../pages/LoginClient'
import JobPost from '../pages/PostJob/JobPost'
import ClientMyJobs from '../pages/ClientMyJobs'
import FindWork from '../pages/FindWork'
import JobDetails from '../pages/ApplyJobs/JobDetails'
import CreateProposal from '../pages/ApplyJobs/CreateProposal'
import ProposalSubmitted from '../pages/ApplyJobs/ProposalSubmitted'
import Layout from '../components/Layout'
import Applicants from '../pages/Applicants'
import FreelancerPublicProfile from '../pages/Profiles/Public/FreelancerProfile'
import FreelancerPrivateProfile from '../pages/Profiles/Private/FreelancerProfile'
import ClientPublicProfile from '../pages/Profiles/Public/ClientProfile'
import ClientPrivateProfile from '../pages/Profiles/Private/ClientProfile'
import ClientLayout from '../components/ClientLayout'
import Details from '../pages/Contracts/Details'
import Notification from '../pages/Notifications/Notification'
import FreelancerMyWork from '../pages/FreelancerMyWork'
import Review from '../pages/Reviews/Review'
import Messages from '../pages/Messages/Message'
import Dashboard from '../pages/Contracts/Dashboard'

//context api
import {NotificationCountContext} from './context/NotificationContext'

//socket
import socket from './socket'

function App() {

  const {unreadCount, setUnreadCount}= useContext(NotificationCountContext)
        
  useEffect(()=>
  {
    const fetchUnreadCount = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications/getunreadcount`,{
          headers : {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setUnreadCount(response?.data?.count)
      }
      catch(err)
      {
        console.log(err.response.data);        
      }
    }
    fetchUnreadCount()
  },[])

  useEffect(()=>
  {   
    socket.connect()
  },[])
   
  return (

      <Routes>

        {/* Proteted Routes */}
        <Route element={<Layout/>}>

        <Route element={<FreelancerAuth />}>

        <Route path='/fl/logout' element={<FreelancerLogout/>} />

        <Route path='/find-work' element={<FindWork/> } />
                                              
        <Route path='/jobs/:jobId' element={<JobDetails/> } />                                           
        
        <Route path='jobs/:jobId/apply' element={ <CreateProposal/>} />
                                  
        <Route path='/proposals/:proposalId/submission' element={ <ProposalSubmitted/>} />                                     

        <Route path='/fl/dashboard' element={<FreelancerDashboard/> } />  
                                    
        <Route path='/freelancer/profile' element={<FreelancerPrivateProfile/>  } /> 
                                     
        <Route path='/client/profiles/:clientId' element={ <ClientPublicProfile/> } />  
                                
        <Route path='/freelancer/contracts' element={<Dashboard/>  } />
                                    
        <Route path='/freelancer/contracts/:contractId' element={<Details/> } />

        <Route path='/freelancer/notifications' element={  <Notification/> } />  
                                       
        <Route path='/freelancer/reviews/:contractId' element={ <Review/>} />  
                                      
        <Route path='/my-work' element={<FreelancerMyWork/> } />  
                                              
        <Route path='/freelancer/messages/:contractId' element={<Messages/>} />
        
        </Route>       
        
        </Route>

        <Route element={<ClientLayout/>}>

        <Route element={<ClientAuth/>}>

        <Route path='/client/logout' element={<ClientLogout/>} />

        <Route path='/client/dashboard' element={<ClientDashboard/>} />  

        <Route path='/my-jobs' element={ <ClientMyJobs/>} />

        <Route path='/applicants' element={<Applicants/> } />
                               
        <Route path='/post-job' element={<JobPost/>} />
                                 
        <Route path='/freelancer/profiles/:freelancerId' element={ <FreelancerPublicProfile/> } />

        <Route path='/client/profile' element={ <ClientPrivateProfile/> } />

        <Route path='/client/contracts' element={<Dashboard/>} />                
                                                
        <Route path='/client/contracts/:contractId' element={<Details/> } />
                                         
        <Route path='/client/notifications' element={<Notification/>} />
                                            
        <Route path='/client/reviews/:contractId' element={<Review/> } /> 
                                    
        <Route path='/client/messages/:contractId' element={<Messages/>} />    
        
        </Route>
        </Route>

      {/* Unprotected Routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/fl/login' element={<LoginFLPage/>} />
      <Route path='/client/login' element={<ClinetLoginPage/>} />
      <Route path='/client/register' element={<ClientRegisterPage />} />

      </Routes>
    
  )
}

export default App
