import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {ClientDataContext} from '../src/context/ClientContext'
import axios from 'axios'
import socket from '../src/socket'
import { Outlet } from 'react-router-dom'

const ClientAuth = ({children}) => {
  const token = localStorage.getItem('token')
  const {client, setclient} = useContext(ClientDataContext)
  const [isloading, setisloading] = useState(true)

  const navigate = useNavigate()


  useEffect(()=>
  {
    if(!token)
    {
      navigate('/fl/login')
      return
    }
    const fetchClientData = async ()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`,
          {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        )
        if(response.status === 200)
        {
            const data = response.data
            setclient(data.user)
            setisloading(false)
        }
      }
      catch(err)
      {
        console.log(err)
        navigate('/client/login')
      }
    }
    fetchClientData()

  },[token])

  useEffect(()=>
  {
    if(!client) return

    if(!socket.connected)
    {
      socket.connect()
    }

    socket.emit('user-online', {
      userId : client._id
    })
  },[client])

  if(isloading)
  {
    return (
      <div>Loading.....</div>
    )
  }
  return (
    <div>
      <Outlet/>
    </div>

  )
}

export default ClientAuth
