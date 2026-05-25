import React, { useState } from 'react'
export const FLDataContext = React.createContext()

const FLContext = ({children}) => {

   const [freelancer, setfreelancer] = useState(null)

   console.log(freelancer)
  return (

    <div>

      <FLDataContext.Provider value={{freelancer, setfreelancer}}>
        {children}
      </FLDataContext.Provider>
    </div>

  )
}

export default FLContext
