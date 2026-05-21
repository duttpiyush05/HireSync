import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FreelancerLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then(response =>
  {
    if(response.status === 200)
    {
      const data = response.data
      localStorage.removeItem('token')
      navigate('/')
    }
  }
  ).catch(error =>
  {
    console.log(error)
  }
  )

  return (
    <div>
      Logout Page
    </div>
  )
}

export default FreelancerLogout
