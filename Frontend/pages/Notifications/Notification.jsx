import axios from 'axios'
import React,{useEffect, useState, useContext} from 'react'
import { formatDistanceToNow } from 'date-fns'
import { NotificationsContext } from '../../src/context/NotificationContext'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const [isloading, setisLoading] = useState(true)
  const navigate = useNavigate()
  const [contractId, setContractId] = useState("")
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [totalNotifications, setTotalNotifications] = useState()

  const [activeTab, setActiveTab] = useState('All')

  const tabs = ['All', 'Projects', 'Payments', 'Messages']

  const {notifications,setNotifications,unreadCount,setUnreadCount}= useContext(NotificationsContext)

  const [allnotifications, setAllNotifications] = useState([])

  const markAllAsRead = async()=>
  {
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/notifications/markAllasRead`,{},
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      const data = response.data
      setNotifications(data?.notifications)
      setAllNotifications(data?.notifications)
      setUnreadCount(0)
    }catch(err)
    {
      console.log(err.response.data);      
    }
  }

  useEffect(()=>
  {
    if(page===1)
    {
      setAllNotifications(notifications)
      setisLoading(false)
      return
    }
    const fetchNotifications = async()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications?page=${page}`,
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )                
        const data = response.data
        console.log(data);        
        setAllNotifications(prev => [
            ...prev,
            ...data.notifications
        ]);  
        setContractId(data?.notifications?.contract_id)   
        setRole(data?.role)  
        setTotalNotifications(data?.countNotifications)
        setTotalPages(data?.totalPages)
      }
      catch(err)
      {
        console.log(err?.response?.data);        
      }
      finally{
        setTimeout(()=>
         {
            setisLoading(false)
         }, 1000)
      }
    }
    fetchNotifications()
  },[page, notifications])  

  useEffect(()=>
  {
    if(unreadCount>0)
    {
      markAllAsRead()
    }
  },[])

  const handleReviewContract = (contractId)=>
  {
    navigate(`/client/contracts/${contractId}`)
  } 
   if(isloading)
    {
      return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
  
        <div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
  
        <h3 className='text-white block mt-5 font-bold text-xl'>Loading Notifications Please Wait...</h3>
        </div>
      )
    }

    // console.log(page);
    console.log(totalPages);
    // console.log(totalNotifications);
    

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* PAGE HEADER */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 mt-5'>
          <div>
            <h1 className='text-2xl md:text-4xl font-bold'>Notifications</h1>
            <p className='text-md text-gray-400 mt-1'>Stay updated with your latest project activity and earnings.</p>
          </div>
        </div>

        {/* TABS */}
        <div className='flex items-center gap-6 border-b border-[#1e2230] mb-6 overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-lg font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === tab ? 'text-[#6366F1]' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-[#6366F1]'></span>
              )}
            </button>
          ))}
        </div>

        {/* NOTIFICATION LIST */}
        <div className='flex flex-col gap-3 h-full'>
          {
            allnotifications.length===0 && (
              <div className='mt-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
                No Recent Notifications
              </div>
            )
          }
          {allnotifications.map((n, i) => (
            <div
              key={i}
              className='flex items-start gap-4 bg-[#111827] border border-[#1e2230] rounded-xl p-4 sm:p-6 cursor-pointer hover:border-[#33336e] transition-colors'
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                <i className='ri-message-3-line text-xl sm:text-3xl'></i>
              </div>

              <div className='flex-1 min-w-0 flex items-start justify-between gap-3'>
                <div className='flex flex-col gap-1'>
                  <p className='text-base sm:text-xl font-bold text-white leading-tight'>{n.title}</p>
                  <p className='text-md sm:text-md text-gray-400 leading-relaxed'>{n.message}</p>
                </div>
                <div className='flex flex-col items-end gap-2 flex-shrink-0'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs sm:text-lg text-gray-500 whitespace-nowrap'>
                      {formatDistanceToNow(new Date(n?.createdAt), { addSuffix: true })}
                    </span>
                    {!n.isRead && <span className='w-2 h-2 rounded-full bg-[#6366F1] flex-shrink-0'></span>}
                  </div>

                  {n?.contract_id?.length > 0 && (
                    <button
                      onClick={() => handleReviewContract(n?.contract_id)}
                      className='px-8 py-1.5 text-xs sm:text-lg font-medium text-blue-400 border border-blue-500/40 rounded-lg hover:bg-blue-500/10 transition-colors whitespace-nowrap'
                    >
                      Review
                    </button>
                  )}
                </div>

              </div>
            </div>
))}
        </div>

      </div>

      <div 
        className=
        {allnotifications.length>0 ?`flex justify-center items-center px-100 py-10 `:'hidden'}>
        <button 
        disabled={page===totalPages}
        onClick={()=> setPage(page+1)}
        className='px-15 py-5 text-lg bg-[#262634] rounded-md cursor-pointer font-semibold'>
          Load More
        </button>
        </div>
    </div>
  )
}

export default Notification
