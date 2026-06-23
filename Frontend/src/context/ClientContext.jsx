import React, { Children, useState } from 'react'
export const ClientDataContext = React.createContext()

const ClientContext = ({children}) => {

  const [client, setclient] = useState(null)

  return (
      <ClientDataContext.Provider value={{client, setclient}}>
        {children}
      </ClientDataContext.Provider>
    
  )
}

export default ClientContext
