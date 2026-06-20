import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientNavbar from './ClientNavbar'
import Footer from './Footer'


const ClientLayout = () => {
  return (

     <div className="min-h-screen bg-[#0c1324] text-white flex flex-col">

      <ClientNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
    
  )
}

export default ClientLayout
