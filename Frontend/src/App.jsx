import { useState } from 'react'
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

import Dashboard from '../pages/Contracts/Dashboard'


function App() {
  
  return (
    <div>
      
      <Routes>

        <Route element={<Layout/>}>
        
        <Route path='/find-work' element={<FreelancerAuth>
                                              <FindWork/>
                                            </FreelancerAuth >
                                              } />

        <Route path='/jobs/:jobId' element={<FreelancerAuth>
                                              <JobDetails/>
                                            </FreelancerAuth >
                                              } />
        
        <Route path='jobs/:jobId/apply' element={<FreelancerAuth>
                                              <CreateProposal/>
                                            </FreelancerAuth >
                                              } />
        <Route path='/proposals/:proposalId/submission' element={< FreelancerAuth>
                                              <ProposalSubmitted/>
                                            </FreelancerAuth >  } /> 

        <Route path='/fl/dashboard' element={
                                            <FreelancerAuth>
                                              <FreelancerDashboard/>
                                            </FreelancerAuth>                                          
                                          } />      
        <Route path='/freelancer/profile' element={
                                            <FreelancerAuth>
                                              <FreelancerPrivateProfile/>
                                            </FreelancerAuth>                                          
                                          } />   
        <Route path='client//profiles/:clientId' element={<FreelancerAuth>
                                              <ClientPublicProfile/>
                                            </FreelancerAuth >
                                              } />  

        <Route path='/notifications' element={<FreelancerAuth>
                                              <Notification/>
                                            </FreelancerAuth >
                                              } />  
        
        </Route>

        <Route element={<ClientLayout/>}>

          <Route path='/client/dashboard' element={<ClientAuth>
                                              <ClientDashboard/>
                                            </ClientAuth >
                                              } />  

         <Route path='/my-jobs' element={<ClientAuth>
                                              <ClientMyJobs/>
                                            </ClientAuth >
                                              } />
         <Route path='/applicants' element={<ClientAuth>
                                              <Applicants/>
                                            </ClientAuth >
                                              } />
         <Route path='/post-job' element={<ClientAuth>
                                              <JobPost/>
                                            </ClientAuth >
                                              } />
         <Route path='/freelancer/profiles/:freelancerId' element={<ClientAuth>
                                              <FreelancerPublicProfile/>
                                            </ClientAuth >
                                              } />

        <Route path='/client/profile' element={
                                            <ClientAuth>
                                              <ClientPrivateProfile/>
                                            </ClientAuth>  
                                                } />

        <Route path='/contracts' element={
                                            <ClientAuth>
                                              <Dashboard/>
                                            </ClientAuth>  
                                                } />
        <Route path='/contracts/:contractId' element={
                                            <ClientAuth>
                                              <Details/>
                                            </ClientAuth>  
                                                } />

        </Route>

      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/fl/login' element={<LoginFLPage/>} />
      <Route path='/client/login' element={<ClinetLoginPage/>} />
      
      <Route path='/fl/logout' element={ <FreelancerAuth>
                                              <FreelancerLogout/>
                                            </FreelancerAuth >                                          
                                          } />
      <Route path='/client/register' element={<ClientRegisterPage />} />

                                           
      <Route path='/client/logout' element={<ClientAuth>
                                              <ClientLogout/>
                                            </ClientAuth >
                                              } />
      
      </Routes>

    </div>
  )
}

export default App
