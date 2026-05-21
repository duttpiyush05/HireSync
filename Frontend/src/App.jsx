import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LandingPage from '../pages/LandingPage'
import LoginFLPage from '../pages/LoginFLPage'
import FreelancerDashboard from '../pages/FreelancerDashboard'
import FreelancerAuth from '../pages/FreelancerAuth'
import FreelancerLogout from '../pages/FreelancerLogout'

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

      </Routes>

    </div>
  )
}

export default App
