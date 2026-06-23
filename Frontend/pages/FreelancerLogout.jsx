import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
      toast.success("Logout Sucessfully",{
        hideProgressBar : true
      })
      navigate('/')
    }
  }
  ).catch(error =>
  {
    toast.error(`${err?.response?.data}`)
  }
  )

  return (
    <div>
      Logout Page
    </div>
  )
}

export default FreelancerLogout
