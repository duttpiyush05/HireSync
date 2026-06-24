import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ClientLogout = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then(response =>
  {
    if(response.status===200)
    {
      const data = response.data;
      localStorage.removeItem('token')
      toast.success("Logout Sucessfully")
      navigate('/')
    }
  }).catch(error =>
  {
    console.log(error)
  }
  )

  return (
    <div>
      Logout
    </div>
  )
}

export default ClientLogout
