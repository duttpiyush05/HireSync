import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import FLContext from './context/FLContext.jsx'
import ClientContext from './context/ClientContext.jsx'
import NotificationContext from './context/NotificationContext.jsx'
import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from 'react-hot-toast'

// function Test() {
//   return (
//     <>
//       <h1>Hello World</h1>
//       {/* <Toaster /> */}
//     </>
//   );
// }

createRoot(document.getElementById('root')).render(
     <NotificationContext>

       <ClientContext>
      <FLContext>
        <BrowserRouter>

          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
          {/* <Toaster/> */}
          <App/>
          

        </BrowserRouter>

      </FLContext>
    </ClientContext>

     </NotificationContext>

    // <Test/>
    
)
