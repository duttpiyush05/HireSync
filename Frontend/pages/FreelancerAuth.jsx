import React, { useContext, useEffect, useState } from 'react'
import { FLDataContext } from '../src/context/FLContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FreelancerAuth = ({children}) => {

  const token = localStorage.getItem('token')
  const {freelancer, setfreelancer} = useContext(FLDataContext)

  const [isloading, setisloading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>
  {
    if(!token)
    {
      navigate('/fl/login')
      return 
    }

    const fetchFreelancerDate = async ()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        if(response.status===200)
        {
          const data = response.data
          setfreelancer(data.user)
          setisloading(false)
        }
      }
      catch(err)
      {
        console.log(err)
        navigate('/fl/login')
      }
    }

    fetchFreelancerDate()
    
  }, [token])

  if(isloading)
  {
    return <div> Loading.... </div>
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default FreelancerAuth
