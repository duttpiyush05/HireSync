import axios from 'axios'
import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import socket from '../../src/socket'


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
    <div className='bg-[#0c1324] min-h-screen text-white flex flex-col lg:flex-row max-w-7xl mx-auto my-5'>

      {/* SIDEBAR */}
      <div className='w-full lg:w-60 border-b lg:border-b-0 lg:border-r border-[#1e2230] flex-shrink-0'>
        <div className='p-4'>
          <h2 className='text-3xl font-bold uppercase tracking-widest'>Messages</h2>
        </div>

        {/*  */}
      </div>

      {/* CHAT WINDOW */}
      <div className='flex-1 flex flex-col min-h-[30vh] lg:min-h-screen py-5'>

        {/* Chat Header */}
        <div className='flex items-center gap-3 px-4 sm:px-6 border-b border-[#1e2230] flex-shrink-0 py-2'>
          <div className='w-10 h-10 rounded-full overflow-hidden bg-[#19192f] border border-[#1e2230] flex-shrink-0'>
            <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <p className='text-xl font-bold text-white truncate'>
                {
                  role==='freelancer' ? `${client?.fullname?.firstname} ${client?.fullname?.lastname}`: `${freelancer?.fullname?.firstname} ${freelancer?.fullname?.lastname}`
                }
                </p>
            </div>
            <p className='text-xl text-green-400 font-medium'>
              {
                istyping?'Typing...':receiverStatus?'Active':''
              }</p>
          </div>
          <div className='flex items-center gap-2 flex-shrink-0'>
            <button className='w-12 h-12 rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors flex items-center justify-center'>
              <i className="ri-vidicon-line text-gray-300 text-2xl"></i>
            </button>
            <button className='w-12 h-12 rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors flex items-center justify-center'>
              <i className="ri-phone-line text-gray-300 text-2xl"></i>
            </button>
            <button className='hidden sm:flex items-center gap-2 px-4 h-12 rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300'>
              <i className="ri-user-line"></i>
              View Profile
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-4  max-h-[100vh]'>
            {
              messages.length===0 && (
                <div className=' h-screen flex flex-col justify-center items-center text-4xl font-medium'>
                  Start Your Conversation...
                  <div className='text-xl text-gray-500 '>
                    Say hii ....👋
                  </div>
                </div>
               
              )
            }
                {
                  messages.map((m, i)=> (
                    <div
                    key={i}
                    className={`${user===m?.sender ? 'flex justify-end':'flex items-left'} p-1 text-lg px-5 py-2 `}>
                      <div className={`p-3 rounded-xl border ${user===m.sender?' border-[#0f9200]':' border-[#005589]'} flex flex-col gap-0 max-w-[75%]`}>
                        <div>
                          {m.text}
                        {
                          m.status==='sent' && m.sender===sender && (
                            <i className="ml-2 ri-check-line"></i>
                          )
                        }
                        {
                          m.status==='delivered'&& m.sender===sender && (
                            <i className="ml-2 ri-check-double-line"></i>
                          )
                        }
                        {
                          m.status==='read' && m.sender===sender && (
                            <i className="ml-2 ri-check-double-line text-blue-500"></i>
                          )
                        }
                        </div>
                         <div className='text-sm self-end text-gray-500 '>
                          <p className='self-start'>
                          {new Date(m.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                         </div>
                      </div>
                     
                      
                    </div>
                  ))
                }
                <div ref={bottomRef}></div>
        </div>

        {/* Input Bar */}
        <div className='px-4 sm:px-6 py-5 border-t border-[#1e2230] flex-shrink-0 border'>
          <div className='flex items-center gap-2'>
            <button className='w-12 h-12 rounded-lg hover:bg-[#19192f] transition-colors flex items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-add-circle-line  text-2xl"></i>
            </button>
            <button className='hidden sm:flex w-12 h-12 rounded-lg hover:bg-[#19192f] transition-colors items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-attachment-2  text-2xl"></i>
            </button>
            <button className='hidden sm:flex w-12 h-12 rounded-lg hover:bg-[#19192f] transition-colors items-center justify-center text-gray-400 flex-shrink-0'>
              <i className="ri-emotion-line  text-2xl"></i>
            </button>
            <input
              type='text'
              value={messageText}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder={`Type your message to ${role==='freelancer'?`${client?.fullname?.firstname}`:`${freelancer?.fullname?.firstname}`}...`}
              className='flex-1 pl-6 min-w-0 bg-[#161c33] border border-[#1e2230] rounded-full h-15 px-4 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
            />
            <button 
            onClick={handleSendMessage}
            className='w-14 h-14 rounded-full bg-[#6366F1] hover:bg-[#4f52d9] transition-colors flex items-center justify-center flex-shrink-0'>
              <i className="ri-send-plane-fill text-white text-2xl cursor-pointer"></i>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Messages
