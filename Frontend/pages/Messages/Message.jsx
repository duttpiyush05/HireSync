import axios from 'axios'
import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import socket from '../../src/socket'
import { Link } from 'react-router-dom'


const Messages = () => {

  const [messageText, setMessageText] = useState('')

  const {contractId} = useParams() 

  const [role, setRole] = useState()
  const [client, setClient] = useState()
  const [freelancer, setFreelancer] = useState()
  const [convoId, setConvoId] = useState()
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState()
  const [receiverStatus, setReceiverStatus] = useState()

  const bottomRef = useRef()
  const typingTimeout = useRef(null)
  const isTyping = useRef(false)
  const [istyping, setIsTyping] = useState(false)
 

  useEffect(()=>
  {
    const loadChat = async()=>
    {
      //fetching conversation
      const fetchContractDetails = await axios.get(`${import.meta.env.VITE_BASE_URL}/conversations/${contractId}`,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })                                             
          setRole(fetchContractDetails?.data?.role)
          setClient(fetchContractDetails?.data?.contract?.client)
          setFreelancer(fetchContractDetails?.data?.contract?.freelancer)
          setConvoId(fetchContractDetails?.data?.convo?._id)

      //fetchMessages      
      const fetchMessages = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/${fetchContractDetails?.data?.convo._id}`,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          setMessages(fetchMessages?.data?.messages)
          setUser(fetchMessages?.data?.userId)
    }
    loadChat()
  },[])

  let receiverId = freelancer?._id
  if(role==='freelancer') receiverId = client?._id
  let sender = freelancer?._id
  if(role==='client') sender = client?._id

  // to indicate the open of messages
  useEffect(()=>
  {
    if(!convoId || !sender) return
    if(messages.length===0) return
    socket.emit("join-room", convoId)

    socket.emit('message-read',{
      convoId : convoId,
      reader : sender
    })

    return ()=>
    {
      socket.emit("leave-room", convoId)
    }

  },[convoId, sender, messages.length])

  //to receive messages
  useEffect(()=>
  {
    socket.on("receive-message", (message)=>
    {      
      setMessages(prev=>[...prev, message])         
      
      socket.emit('message-delivered',{
        messageId : message._id,
        convoId : message.conversation
      })
    })
    return ()=>
    {
      socket.off("receive-message")
    }
  },[])

  // to message status

 useEffect(() => {
    socket.on("message-delivered", ({ messageId, status }) => {

        setMessages(prev => {
            return prev.map(msg =>
                msg._id === messageId
                    ? { ...msg, status }
                    : msg
            )
        })
    })

    return () => socket.off("message-delivered");

}, [])

 useEffect(() => {
    socket.on("message-read", ({ convoId, reader, status }) => {

        setMessages(prev => {
            return prev.map(msg =>
                msg.sender === sender && msg.status!=='read'
                    ? { ...msg, status }
                    : msg
            )
        })
    })

    return () => socket.off("message-read");

}, [sender])

  // set Reciever
  useEffect(()=>
  {
    if(!receiverId) return
    const fetchReceiverStatus = async()=>{
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/conversations/status/${receiverId}`,{
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })                
      setReceiverStatus(res?.data?.isOnline)
    }
    fetchReceiverStatus()
  },[receiverId])

  useEffect(() => {    
    socket.on("user-status-changed", ({ userId, isOnline }) => {
      
        if (userId === receiverId) {
            setReceiverStatus(isOnline);
        }
    });

    return () => {
        socket.off("user-status-changed");
    };
}, [receiverId]);

  const handleSendMessage = async()=>
  {
    socket.emit("stop-typing", {
        convoId,
        sender
    })

    isTyping.current = false;
    clearTimeout(typingTimeout.current)

    if(messageText.length===0)
    {
      return toast.error("Please type some message")
    }
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/messages/sendmessage/${convoId}`,
        {messageText},{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    catch(err)
    {
      toast.error(err?.res?.data?.message);
    }finally{
      setMessageText('')
    }
  }

  useEffect(()=>
  {
    bottomRef.current?.scrollIntoView({
      behavior : 'smooth'
    })
  },[messages])  

  const handleTyping = (text)=>
  {
    setMessageText(text)
    if (text.trim() === "") {
        socket.emit("stop-typing", {
            convoId,
            sender
        })

        isTyping.current = false
        clearTimeout(typingTimeout.current)
        return
    }

    if(!isTyping.current){
        socket.emit('user-typing',{
        convoId,sender
      })

      isTyping.current = true
    }

    clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(()=>
    {
      socket.emit('stop-typing',{
        convoId, sender
      })

      isTyping.current = false
    }, 1000)
  }
  
  useEffect(()=>{
    socket.on('user-typing', ({sender: typingUser})=>
    {
      if(typingUser===receiverId) setIsTyping(true)
    })
    socket.on('stop-typing', ({sender: typingUser})=>
    {
      if(typingUser===receiverId) setIsTyping(false)
    })
    return ()=>
    {
      socket.off('user-typing')
      socket.off('stop-typing')
    }
  },[receiverId]) 
  
  return (
    <div className='bg-[#0c1324] min-h-screen text-white flex justify-center'>
    <div className='flex flex-col lg:flex-row w-full max-w-7xl my-0 lg:my-5 lg:h-[calc(100vh-2.5rem)] rounded-2xl overflow-hidden border border-[#1e2230] shadow-[0_8px_40px_rgba(0,0,0,0.35)]'>

      {/* SIDEBAR */}
      <div className='w-full lg:w-72 bg-[#111827] border-b lg:border-b-0 lg:border-r border-[#1e2230] flex-shrink-0 flex flex-col'>
        <div className='px-5 py-5 border-b border-[#1e2230]'>
          <h2 className='text-2xl font-bold'>Messages</h2>
          <p className='text-xs text-gray-500 mt-0.5'>Your active conversation</p>
        </div>

        {/* Current conversation preview */}
        {(client || freelancer) && (
          <div className='px-3 py-3'>
            <div className='flex items-center gap-3 px-3 py-3 rounded-xl bg-[#1e2230]/60 border border-[#1e2230]'>
              <div className='relative w-11 h-11 rounded-full overflow-hidden bg-[#1e2230] border border-[#2a2c4a] flex-shrink-0'>
                {role==='client' && freelancer?.profile?.profilePicture && (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${freelancer?.profile?.profilePicture}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                {role==='freelancer' && client?.profilePicture && (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${client?.profilePicture}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                {receiverStatus && (
                  <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#111827]'></span>
                )}
              </div>
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-semibold text-white truncate'>
                  {role==='freelancer' ? `${client?.fullname?.firstname} ${client?.fullname?.lastname}`: `${freelancer?.fullname?.firstname} ${freelancer?.fullname?.lastname}`}
                </p>
                <p className='text-xs text-gray-500 truncate'>
                  {istyping ? 'Typing...' : receiverStatus ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHAT WINDOW */}
      <div className='flex-1 flex flex-col min-h-[75vh] lg:min-h-0 bg-[#0c1324]'>

        {/* Chat Header */}
        <div className='flex items-center gap-3 px-4 sm:px-6 border-b border-[#1e2230] flex-shrink-0 py-3 bg-[#111827]/60 backdrop-blur-sm'>
          <div className='relative w-11 h-11 rounded-full overflow-hidden bg-[#1e2230] border border-[#2a2c4a] flex-shrink-0'>

            {
              role==='client' && (
                <img
                            src={
                        `${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${freelancer?.profile?.profilePicture}`
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
              )
              
            }
            {
              role==='freelancer' && (
                <img
                            src={
                        `${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${client?.profilePicture}`
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
              )
            }
            {receiverStatus && (
              <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0c1324]'></span>
            )}

          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2'>
              <p className='text-base sm:text-lg font-bold text-white truncate'>
                {
                  role==='freelancer' ? `${client?.fullname?.firstname} ${client?.fullname?.lastname}`: `${freelancer?.fullname?.firstname} ${freelancer?.fullname?.lastname}`
                }
                </p>
            </div>
            <p className={`text-xs sm:text-sm font-medium truncate ${istyping ? 'text-[#a5a8ff]' : 'text-gray-500'}`}>
              {
                istyping?'Typing...':receiverStatus?'Active now':'Offline'
              }</p>
          </div>
          <div className='flex items-center gap-2 flex-shrink-0'>

            <Link 
            to={role==='client' ? `/freelancer/profiles/${freelancer?._id}`:`/client/profiles/${client?._id}`}
            className='hidden sm:flex items-center gap-2 px-4 h-10 rounded-xl border border-[#1e2230] hover:bg-[#1e2230] transition-colors text-sm font-medium text-gray-300'>
              <i className="ri-user-line"></i>
              View Profile
            </Link>

            <button className='sm:hidden w-10 h-10 rounded-xl border border-[#1e2230] hover:bg-[#1e2230] transition-colors flex items-center justify-center text-gray-300 flex-shrink-0'>
              <i className="ri-user-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className='flex-1 overflow-y-auto px-3 sm:px-6 py-5 flex flex-col gap-1.5'>
            {
              messages.length===0 && (
                <div className='flex-1 flex flex-col justify-center items-center text-center gap-2 min-h-[50vh]'>
                  <div className='w-16 h-16 rounded-full bg-[#1e2230] flex items-center justify-center text-3xl mb-2'>
                    👋
                  </div>
                  <p className='text-2xl sm:text-3xl font-bold text-white'>Start Your Conversation</p>
                  <p className='text-sm sm:text-base text-gray-500'>Say hi and get things moving</p>
                </div>
               
              )
            }
                {
                  messages.map((m, i)=> (
                    <div
                    key={i}
                    className={`flex ${user===m?.sender ? 'justify-end':'justify-start'} px-1 py-0.5`}>
                      <div className={`relative px-4 py-2.5 rounded-2xl max-w-[80%] sm:max-w-[65%] ${
                        user===m.sender
                          ? 'bg-gradient-to-br from-[#6366F1] to-[#4f52d9] text-white rounded-br-sm'
                          : 'bg-[#1e2230] text-gray-100 rounded-bl-sm'
                      }`}>
                        <p className='text-sm sm:text-base leading-relaxed break-words pr-2'>
                          {m.text}
                        </p>
                        <div className={`flex items-center gap-1 mt-1 justify-end ${user===m.sender ? 'text-indigo-100/70' : 'text-gray-500'}`}>
                          <span className='text-[11px]'>
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {
                            m.status==='sent' && m.sender===sender && (
                              <i className="ri-check-line text-xs"></i>
                            )
                          }
                          {
                            m.status==='delivered'&& m.sender===sender && (
                              <i className="ri-check-double-line text-xs"></i>
                            )
                          }
                          {
                            m.status==='read' && m.sender===sender && (
                              <i className="ri-check-double-line text-xs text-[#7dd3fc]"></i>
                            )
                          }
                        </div>
                      </div>
                     
                      
                    </div>
                  ))
                }
                <div ref={bottomRef}></div>
        </div>

        {/* Input Bar */}
        <div className='px-3 sm:px-6 py-3 sm:py-4 border-t border-[#1e2230] flex-shrink-0 bg-[#111827]/60 backdrop-blur-sm'>
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <button className='w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-[#1e2230] transition-colors flex items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-add-circle-line text-xl sm:text-2xl"></i>
            </button>
            <button className='hidden sm:flex w-11 h-11 rounded-full hover:bg-[#1e2230] transition-colors items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-attachment-2 text-2xl"></i>
            </button>
            <button className='hidden sm:flex w-11 h-11 rounded-full hover:bg-[#1e2230] transition-colors items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-emotion-line text-2xl"></i>
            </button>
            <input
              type='text'
              value={messageText}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
              placeholder={`Message ${role==='freelancer'?`${client?.fullname?.firstname||''}`:`${freelancer?.fullname?.firstname||''}`}...`}
              className='flex-1 min-w-0 bg-[#1e2230] border border-[#2a2c4a] rounded-full h-11 sm:h-12 px-5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
            />
            <button 
            onClick={handleSendMessage}
            className='w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4f52d9] hover:opacity-90 transition-opacity flex items-center justify-center flex-shrink-0'>
              <i className="ri-send-plane-fill text-white text-lg sm:text-xl"></i>
            </button>
          </div>
        </div>

      </div>

    </div>
    </div>
  )
}

export default Messages