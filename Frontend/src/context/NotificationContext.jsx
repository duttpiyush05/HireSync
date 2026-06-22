import React from 'react'
import { createContext, useState } from "react"
export const NotificationCountContext = createContext()

const NotificationContext = ({children}) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <NotificationCountContext.Provider
      value={{
        unreadCount,
        setUnreadCount
      }}
    >
      {children}
    </NotificationCountContext.Provider>
  )
}

export default NotificationContext