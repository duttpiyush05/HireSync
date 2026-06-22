import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import FLContext from './context/FLContext.jsx'
import ClientContext from './context/ClientContext.jsx'
import NotificationContext from './context/NotificationContext.jsx'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(

    <StrictMode>
     <NotificationContext>

       <ClientContext>
      <FLContext>
        <BrowserRouter>
        
          <App/>
          
        </BrowserRouter>
      </FLContext>
    </ClientContext>

     </NotificationContext>
    </StrictMode>
    
)
