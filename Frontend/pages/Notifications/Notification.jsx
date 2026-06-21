import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const notification = () => {
  const [isloading, setIsloading] = useState(true)

  const [allnotifications, setAllNotifications] = useState([])
   
  useEffect(()=>
  {
    const fetchNotifications = async()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications`,
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        const data = response.data
        setAllNotifications(data?.notifications)
        console.log(data?.notifications);
        
      }
      catch(err)
      {
        console.log(err.response.data);        
      }
    }
    fetchNotifications()
  },[])
    

   const [activeTab, setActiveTab] = useState('All')

  const tabs = ['All', 'Projects', 'Payments', 'Messages']

  const notifications = [
    {
      icon: 'ri-money-dollar-circle-line',
      iconBg: 'bg-green-500/20 text-green-400',
      title: 'Payment Received',
      desc: '$1,200 for "MERN Dashboard" has been released and added to your balance.',
      time: '2 hours ago',
      unread: true,
    },
    {
      icon: 'ri-folder-line',
      iconBg: 'bg-[#19192f] text-[#6366F1]',
      title: 'New Proposal',
      desc: 'TechFlow Inc. has invited you to bid on "E-commerce API Refactor".',
      time: '5 hours ago',
      unread: true,
    },
    {
      icon: 'ri-message-3-line',
      iconBg: 'bg-amber-500/20 text-amber-400',
      title: 'New Message',
      desc: 'Sarah Jenkins: "The assets look great! Can we discuss the mobile layout?"',
      time: 'Yesterday',
      unread: false,
    },
    {
      icon: 'ri-shield-check-line',
      iconBg: 'bg-[#19192f] text-gray-300',
      title: 'Profile Verified',
      desc: 'Your professional credentials have been successfully verified by our team.',
      time: '2 days ago',
      unread: false,
    },
    {
      icon: 'ri-checkbox-circle-line',
      iconBg: 'bg-green-500/20 text-green-400',
      title: 'Milestone Approved',
      desc: 'Phase 1 (Database Architecture) for Project "Zephyr" has been approved.',
      time: '3 days ago',
      unread: false,
    },
  ]

  const markAllAsRead = ()=>
  {
    console.log(allnotifications);
    
    allnotifications.forEach((n)=>{
      n.isRead = true
    })
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 md:px-8 lg:px-16 py-8'>
      <div className='max-w-7xl mx-auto'>

        {/* PAGE HEADER */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6'>
          <div>
            <h1 className='text-2xl md:text-4xl font-bold'>Notifications</h1>
            <p className='text-md text-gray-400 mt-1'>Stay updated with your latest project activity and earnings.</p>
          </div>
          <button 
          onClick={markAllAsRead}
          className='flex items-center gap-2 text-lg text-[#6366F1] font-semibold flex-shrink-0 whitespace-nowrap border-[#1e2230] hover:border-[#33336e] p-2 rounded-lg'>
            <i className="ri-check-double-line"></i>
            Mark all as read
          </button>
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
        <div className='flex flex-col gap-3'>
          {allnotifications.map((n, i) => (
            <div
              key={i}
              className='flex items-start gap-4 bg-[#111827] border border-[#1e2230] rounded-xl p-6 cursor-pointer hover:border-[#33336e] transition-colors'
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                <i className='ri-message-3-line text-3xl'></i>
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-3 '>
                  <p className='text-lg font-bold text-white'>{n.title}</p>
                  <div className=' flex flex-col gap-4 justify-center items-center'>
                    <div className='flex justify-center items-center gap-2 flex-shrink-0 '>
                    <span className='text-lg text-gray-500 whitespace-nowrap'>{formatDistanceToNow(
                      new Date(n?.createdAt), {addSuffix : true}
                    )}</span>
                    {!n.isRead && <span className='w-2 h-2 rounded-full bg-[#6366F1]'></span>}
                  </div>

                  
                  </div>
                  
                </div>
                <div className=' flex justify-between mt-2'>
                  <p className='text-md text-gray-400 mt-1 leading-relaxed'>{n.message}</p>
                <button className='p-5 py-2 font-bold bg-green-500 flex justify-center rounded-sm'>
                    Mark as Read
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className='flex justify-center mt-6'>
          <button className='px-6 h-20 rounded-lg border border-[#1e2230] bg-transparent hover:bg-[#19192f] transition-colors text-lg font-medium text-gray-300'>
            Load earlier notifications
          </button>
        </div>

      </div>
    </div>
  )
}

export default notification
