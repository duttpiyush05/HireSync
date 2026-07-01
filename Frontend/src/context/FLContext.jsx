import React, { useState } from 'react'
export const FLDataContext = React.createContext()

const FLContext = ({children}) => {

   const [freelancer, setfreelancer] = useState(null)

  return (

      <FLDataContext.Provider value={{freelancer, setfreelancer}}>
        {children}
      </FLDataContext.Provider>
  )
}

export default FLContext
