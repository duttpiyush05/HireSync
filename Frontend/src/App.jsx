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


function App() {
  
  return (
    <div>
      
      <Routes>

      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/fl/login' element={<LoginFLPage/>} />
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

      </Routes>

    </div>
  )
}

export default App
