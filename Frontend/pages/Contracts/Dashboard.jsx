import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalContracts, setTotalContracts] = useState()
  const [totalPages, setTotalPages] = useState(1)
  const [isloading, setisLoading] = useState(true)


  const statusStyles = {
    Active: 'bg-green-500/20 text-green-400 border border-green-500/30',
    Completed: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30',
  }

  const [allcontracts, setallContracts] = useState([])
  const [contractId, setcontractId] = useState('')
  const [role, setRole] = useState("")
  const [totalActives, setTotalActives] = useState(0)
  const [totalBudget, setTotalBudget] = useState(0)

  useEffect(()=>
  {
    const fetchContracts = async()=>
    {
      try
      {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/contracts/getAllContracts?page=${currentPage}`, {
          headers  : {
            "Content-Type": "application/json", 
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = response.data
        
        const allContracts = data.contracts
        setallContracts(allContracts)
        setRole(data?.role)     
        setTotalContracts(data?.totalContracts)        
        setTotalPages(data?.totalPages)        
      }catch(err)
      {
        toast.error(err?.response?.data?.message);
      }finally {
        setTimeout(() => setisLoading(false), 1000)
      }
    }
    fetchContracts()
  },[currentPage])

  useEffect(() => {
  const activeCount = allcontracts.filter(
    contract => contract.status === "active"
  ).length

    setTotalActives(activeCount);
  }, [allcontracts])

  useEffect(() => {
  const budgetCount = allcontracts.forEach((c)=>
  {
    setTotalBudget(prev => prev+c?.budget)
  })
  }, [allcontracts])



    if (isloading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">
        <div className="w-16 h-16 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div>
        <h3 className='text-white block mt-5 font-bold text-xl'>Loading Contracts...</h3>
      </div>
    )
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* PAGE HEADER */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-2xl md:text-4xl font-bold'>Contracts Dashboard</h1>
            <p className='text-sm md:text-lg text-gray-400 mt-1'>Manage your active agreements and track project milestones.</p>
          </div>
          <div className='flex gap-3 flex-shrink-0'>
            <button className='flex items-center gap-2 px-4 h-15 rounded-lg border border-[#1e2230] bg-transparent hover:bg-[#19192f] transition-colors text-md font-medium text-gray-300'>
              <i className="ri-filter-3-line"></i>
              Filters
            </button>
            <button className='flex items-center gap-2 px-4 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white whitespace-nowrap'>
              <i className="ri-add-line"></i>
              New Contract
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>

          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-5 flex items-center justify-between shadow-2xl min-h-50 '>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Total Active</p>
              <div className='flex items-baseline gap-2'>
                <p className='text-3xl md:text-4xl font-bold'>{totalActives}</p>
                {/* <span className='text-md text-green-400 font-medium'>+2 this month</span> */}
              </div>
            </div>
            <div className='w-15 h-15 rounded-lg bg-[#19192f] flex items-center justify-center flex-shrink-0'>
              <i className="ri-checkbox-circle-line text-gray-400 text-3xl"></i>
            </div>
          </div>

          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-5 flex items-center justify-between shadow-2xl'>
            <div>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-2'>Total Budgeted</p>
              <div className='flex items-baseline gap-2'>
                <p className='text-2xl md:text-4xl font-bold'>₹{totalBudget}</p>
                {/* <span className='text-md text-gray-400 font-medium'>Paid: $18k</span> */}
              </div>
            </div>
            <div className='w-15 h-15 rounded-lg bg-[#19192f] flex items-center justify-center flex-shrink-0'>
              <i className="ri-bank-card-line text-gray-400 text-3xl"></i>
            </div>
          </div>

        </div>

        {/* RECENT CONTRACTS */}
        <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-5 md:p-6 shadow-2xl'>

  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5'>
    <h2 className='text-3xl font-bold'>Recent Contracts</h2>
    <div className='relative w-full md:w-64'>
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold"></i>
      <input
        type='text'
        placeholder='Search contracts...'
        className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 pl-9 pr-3 text-md text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
      />
    </div>
  </div>
  <div className='hidden md:grid grid-cols-[2.5fr_1fr_1.5fr_1.2fr_1fr_0.9fr] gap-5 px-3 pb-3 border-b border-[#1e2230] text-md text-gray-500 uppercase tracking-widest font-semibold'>
    <span>Contract title</span>
    <span>Budget</span>
    <span>Timeline</span>
    <span>Status</span>
    <span>Message</span>
    <span className='text-right px-10'>Action</span>
  </div>

  <div className='flex flex-col'>
    {
      allcontracts.length===0 && (
        <div className='mt-5 min-h-full flex justify-center items-center font-bold text-3xl text-gray-500'>
          No Recent Contracts        
      </div>
      )
    }

    {allcontracts.map((c, i) => (
      <div
        key={i}
        className='flex flex-col md:grid md:grid-cols-[2.5fr_1fr_1.5fr_1fr_1fr_1.4fr] md:items-center gap-3 md:gap-5 px-3 py-4 border-b border-[#1e2230] last:border-b-0'
      >

        {/* Title */}
        <div className='flex items-center gap-3 min-w-0'>
          {/* <div className='w-12 h-12 rounded-lg bg-[#19192f] border border-[#1e2230] flex items-center justify-center flex-shrink-0'>
            <i className={`${c.icon} text-gray-400 text-xl`}></i>
          </div> */}
          <span className='text-lg font-bold text-white truncate capitalize'>{c?.job?.title}</span>
        </div>

        {/* Budget */}
        <div className='flex items-center justify-between md:block'>
          <span className='text-sm text-gray-500 md:hidden'>Budget</span>
          <span className='text-lg font-semibold text-white'>{c?.budget}</span>
        </div>

        {/* Timeline */}
        <div className='flex items-center justify-between md:block'>
          <span className='text-sm text-gray-500 md:hidden'>Timeline</span>
          <div className='text-right md:text-left'>
            <p className='text-md text-gray-300'>{new Date(c?.startDate)?.toDateString()}</p>
            <p className='text-md text-gray-500'>Ends: in {c?.job?.budget?.duration}</p>
          </div>
        </div>

        {/* Status */}
        <div className='flex items-center justify-between md:block'>
          <span className='text-sm text-gray-500 md:hidden'>Status</span>
          {
            (c?.status==="active" || c?.status==="completed") && (
              <span className={`inline-flex items-center gap-1.5 text-md px-5 py-2 rounded-full font-medium ${statusStyles[c.status]} border border-green-500 bg-green-900 capitalize `}>
              <span 
              className='w-1.5 h-1.5 rounded-full bg-current'></span>
              {c?.status}
            </span>
            )
          }
          {
            (c?.status==="cancelled") && (
              <span className={`inline-flex items-center gap-1.5 text-md px-5 py-2 rounded-full font-medium ${statusStyles[c.status]} border border-red-500 bg-red-900 capitalize `}>
              <span 
              className='w-1.5 h-1.5 rounded-full bg-current'></span>
              {c?.status}
            </span>
            )
          }
          {
            (c?.status==="requested_completion") && (
              <span className={`inline-flex items-center gap-1.5 text-md px-5 py-2 rounded-full font-medium ${statusStyles[c.status]} border border-yellow-600 bg-yellow-500 capitalize `}>
              <span 
              className='w-1.5 h-1.5 rounded-full bg-current'></span>
              Requested
            </span>
            )
          }
        </div>

        {/* Message */}
        <div className='md:text-right'>
      
            <Link
              to={`/${role}/messages/${c?._id}`}
              className='w-full md:w-auto inline-flex items-center justify-center px-4 py-5 h-9 bg-[#4773ca] rounded-lg border border-[#2e49ab] hover:bg-[#10689b] transition-colors text-md font-medium text-gray-300'
            >
            Message
            </Link>
        </div>

        {/* Action */}
        <div className='md:text-right'>
          {c.status === 'Cancelled' ? (
            <Link
              to={role==="freelancer" ?`/freelancer/contracts/${c?._id}` :`/client/contracts/${c?._id}`}
              className='w-full md:w-auto inline-flex items-center justify-center px-4 h-9 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white'
            >
              View Details
            </Link>
          ) : (
            <Link
              to={role==="freelancer" ?`/freelancer/contracts/${c?._id}` :`/client/contracts/${c?._id}`}
              className='w-full md:w-auto inline-flex items-center justify-center px-4 h-9 rounded-lg border border-[#1e2230] bg-[#26988e] hover:bg-[#007552] transition-colors text-md font-medium text-gray-300 py-6'
            >
              View Contract
            </Link>
          )}
        </div>

      </div>
    ))}
  </div>

  {/* Pagination */}
  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t border-[#1e2230]'>
    <p className='text-sm text-gray-500'>Showing {Math.max(0, Math.min(5 * currentPage - 4, totalContracts))} to {Math.min(totalContracts, currentPage * 5)} of {totalContracts} contracts</p>

    <div className='flex items-center gap-2'>
      <button
        disabled={currentPage===1 || currentPage===1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors text-gray-400'
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      {[1, 2, 3].map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            currentPage === p
              ? 'bg-[#6366F1] text-white'
              : 'border border-[#1e2230] text-gray-400 hover:bg-[#19192f]'
          }`}
        >
          {p}
        </button>
      ))}

      <button
      disabled={currentPage===totalPages || totalPages===1}
        onClick={() => setCurrentPage(currentPage+1)}
        className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#1e2230] hover:bg-[#19192f] transition-colors text-gray-400'
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  </div>

</div>

      </div>
    </div>
  )
}

export default Dashboard
