import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from "react"
import { toast } from 'react-toastify'
import socket from '../socket'
export const NotificationsContext = createContext()

const NotificationContext = ({children}) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {

    socket.on("new-notification", ({ notification }) => {

        setNotifications(prev => [notification, ...prev]);

        setUnreadCount(prev => prev + 1);

    })

    return () => {
        socket.off("new-notification");
    }

}, [])

  return (
    <NotificationsContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        notifications,
        setNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationContext