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
        
        </Route>

      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/fl/login' element={<LoginFLPage/>} />
      <Route path='/client/login' element={<ClinetLoginPage/>} />
      <Route path='/fl/dashboard' element={
                                            <FreelancerAuth>
                                              <FreelancerDashboard/>
                                            </FreelancerAuth>                                          
                                          } />
      <Route path='/fl/logout' element={ <FreelancerAuth>
                                              <FreelancerLogout/>
                                            </FreelancerAuth >                                          
                                          } />
      <Route path='/client/register' element={<ClientRegisterPage />} />

      <Route path='/client/dashboard' element={<ClientAuth>
                                              <ClientDashboard/>
                                            </ClientAuth >
                                              } />                                       
      <Route path='/client/logout' element={<ClientAuth>
                                              <ClientLogout/>
                                            </ClientAuth >
                                              } />
      <Route path='/post-job' element={<ClientAuth>
                                              <JobPost/>
                                            </ClientAuth >
                                              } />
      <Route path='/my-jobs' element={<ClientAuth>
                                              <ClientMyJobs/>
                                            </ClientAuth >
                                              } />
      
         
                                        
      

      </Routes>

    </div>
  )
}

export default App
