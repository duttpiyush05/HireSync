import React, { useContext, useEffect, useState } from 'react'
import { FLDataContext } from '../src/context/FLContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import socket from '../src/socket'
import { Outlet } from 'react-router-dom'
import { NotificationsContext } from '../src/context/NotificationContext'
import { toast } from 'react-toastify'

const FreelancerAuth = ({children}) => {

  const token = localStorage.getItem('token')
  const {freelancer, setfreelancer} = useContext(FLDataContext)
  const [isloading, setisloading] = useState(true)
  const navigate = useNavigate()
  const {setNotifications, setUnreadCount} = useContext(NotificationsContext)

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

          const notificationRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/notifications`,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      )

      setNotifications(notificationRes.data.notifications);

      setUnreadCount(
          notificationRes.data.notifications.filter(
              n => !n.isRead
          ).length
      )
        }
      }
      catch(err)
      {
        toast(err?.response?.data?.message)
        navigate('/fl/login')
      }
    }

    fetchFreelancerDate()
    
  }, [token])

  // for showing the online status
  useEffect(()=>
  {
    if(!freelancer) return

    if(!socket.connected)
    {
      socket.connect()
    }
    socket.emit('user-online', {
      userId : freelancer._id
    })
  },[freelancer])

  if(isloading)
  {
    return <div> Loading.... </div>
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default FreelancerAuth
