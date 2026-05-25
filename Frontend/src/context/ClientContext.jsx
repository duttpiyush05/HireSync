import React, { Children, useState } from 'react'
export const ClientDataContext = React.createContext()

const ClientContext = ({children}) => {

  const [client, setclient] = useState(null)

  return (
    <div>
      <ClientDataContext.Provider value={{client, setclient}}>
        {children}
      </ClientDataContext.Provider>
    </div>
  )
}

export default ClientContext
