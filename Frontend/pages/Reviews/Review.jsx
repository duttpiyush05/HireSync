import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Review = () => {
  const navigate = useNavigate()
  const { contractId } = useParams()
  const [role, setRole] = useState()
  const [reviewee, setReviewee] = useState()
  const [reviewer, setReviewer] = useState()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/reviews/${contractId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = response?.data
        setRole(data?.role)        
        if (data?.role === 'freelancer') {
          setReviewer(data?.contract?.freelancer)
          setReviewee(data?.contract?.client)
        }
        if (data?.role === 'client') {
          setReviewer(data?.contract?.client)
          setReviewee(data?.contract?.freelancer)
        }
      } catch (err) {
        toast.error(err?.response?.data?.message)
      }
    }

    fetchUserDetails()
  }, [])

  const [hoverRating, setHoverRating] = useState(0)
  const [overallRating, setOverallRating] = useState(0)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [qualityRating, setQualityRating] = useState(0)
  const [deadlineRating, setDeadlineRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const StarRow = ({ rating, hover, onRate, onHover, onLeave, size = 'text-2xl' }) => {
    return (
      <div className='flex gap-2'>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onLeave && onLeave()}
            className={`${size} cursor-pointer transition-colors ${
              star <= (hover || rating) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-gray-500'
            }`}
          ></i>
        ))}
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const averageRating = Number(((communicationRating + qualityRating + deadlineRating) / 3).toFixed(1))

    const newReview = {
      contract: contractId,
      reviewer: reviewer?._id,
      reviewee: reviewee?._id,
      rating: averageRating,
      review: feedback,
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/reviews/${contractId}`, newReview, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success(`Thanks for reviewing ${reviewee?.fullname?.firstname}`)
      navigate(`/${role}/contracts/${contractId}`)
    } catch (err) {
      toast.error(err?.response?.data)
    }
  }

  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 sm:px-8 py-10'>
      <div className='max-w-2xl mx-auto'>

        {/* HEADER */}
        <div className='text-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold'>Leave a Review</h1>
          <p className='text-sm text-[#6366F1] mt-1'>Share your feedback to help the HireSync community.</p>
        </div>

        {/* CARD */}
        <form onSubmit={handleSubmit}>
          <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-5 sm:p-5'>

            {/* Reviewee Info */}
            <div className='bg-[#0c1324] border border-[#1e2230] rounded-xl p-5 flex flex-col items-center mb-6'>
              <div className='w-25 h-25 rounded-full overflow-hidden bg-[#19192f] border border-[#1e2230] mb-3'>

                {
                  (role==='freelancer' && reviewee?.profilePicture) ? 
                    <img 
                    className='w-full h-full object-cover'
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${reviewee?.profilePicture}`} alt="Profile" />
                    :
                   (role==='client' && reviewee?.profile?.profilePicture) ? 
                    <img 
                    className='w-full h-full object-cover'
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/profilePics/${reviewee?.profile?.profilePicture}`} alt="Profile" />
                    :
                    <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
                }
                <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
              </div>
              <h2 className='text-lg font-bold'>{reviewee?.fullname?.firstname} {reviewee?.fullname?.lastname}</h2>
              <p className='text-xs text-[#6366F1] font-semibold uppercase tracking-widest mt-1'>From : {reviewee?.companyProfile?.companyName}</p>
              <p className='text-xs text-[#6366F1] font-semibold uppercase tracking-widest mt-1'>{reviewee?.location}</p>
            </div>

            {/* Overall Rating */}
            <div className='flex flex-col items-center mb-6'>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-3'>Rate your experience</p>
              <StarRow
                rating={overallRating}
                hover={hoverRating}
                onRate={setOverallRating}
                onHover={setHoverRating}
                onLeave={() => setHoverRating(0)}
              />
            </div>

            {/* Sub-ratings */}
            <div className='grid grid-cols-3 gap-3 mb-6'>

              <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-3 flex flex-col items-center gap-2'>
                <p className='text-md text-gray-400 font-semibold'>Communication</p>
                <StarRow rating={communicationRating} onRate={setCommunicationRating} size='text-lg' />
              </div>

              <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-3 flex flex-col items-center gap-2'>
                <p className='text-md text-gray-400 font-semibold'>Quality</p>
                <StarRow rating={qualityRating} onRate={setQualityRating} size='text-lg' />
              </div>

              <div className='bg-[#0c1324] border border-[#1e2230] rounded-lg p-3 flex flex-col items-center gap-2'>
                <p className='text-md text-gray-400 font-semibold'>Deadline</p>
                <StarRow rating={deadlineRating} onRate={setDeadlineRating} size='text-lg' />
              </div>

            </div>

            {/* Feedback */}
            <div className='mb-6'>
              <p className='text-md text-gray-500 uppercase tracking-widest mb-3'>Detailed feedback</p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                required
                placeholder='Write your detailed review here... What was it like working with them?'
                className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg p-4 text-md text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-colors resize-none'
              />
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='px-5 h-10 rounded-lg bg-[#19192f] border border-[#1e2230] hover:bg-[#33336e] transition-colors text-md font-medium text-gray-300'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-5 h-10 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white'
              >
                Submit Review
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Review