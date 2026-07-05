import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditJob = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [isloading, setisLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [skillInput, setSkillInput] = useState('')

  const [jobTitle, setJobTitle] = useState()
  const [category, setCategory] = useState()
  const [description, setDescription] = useState()
  const [aiOptimized, setAiOptimized] = useState(true)
  const [skills, setSkills] = useState()
  const [compensationType, setCompensationType] = useState('hourly')
  const [projectDuration, setProjectDuration] = useState()
  const [hourlyMin, setHourlyMin] = useState()
  const [hourlyMax, setHourlyMax] = useState()
  const [publicVisibility, setPublicVisibility] = useState(true)

  const [marketCompetition, setMarketCompetition] = useState('High')
  const [marketNote, setMarketNote] = useState('Similar roles currently offering 15% higher rates in your region. Consider adjusting your budget to attract top talent.')
  const [activeApplicants, setActiveApplicants] = useState(0)
  const [interviewing, setInterviewing] = useState(0)
  const [daysLive, setDaysLive] = useState(0)
  const [xplevel, setXplevel] = useState()

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/jobInfo/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const job = response?.data?.jobs?.job        
        if (job) {
          setXplevel(job?.budget?.xplevel)
          setJobTitle(job.title || jobTitle)
          setCategory(job.category)
          setDescription(job.description || description)
          setAiOptimized(job.aiOptimized ?? aiOptimized)
          setSkills(job.skills || skills)
          setCompensationType(job?.budget?.type || compensationType)
          setProjectDuration(job?.budget?.duration || projectDuration)
          setHourlyMin(job?.budget?.minbudget ?? hourlyMin)
          setHourlyMax(job.budget?.maxbudget ?? hourlyMax)
        }   
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        setTimeout(() => setisLoading(false), 800)
      }
    }
    if (jobId) getJob()
  }, [jobId])  

  const handleAddSkill = (e) => {
    e.preventDefault()
    const value = skillInput.trim()
    if (value && !skills.includes(value)) {
      setSkills([...skills, value])
    }
    setSkillInput('')
  }

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

const handleSaveChanges = async () => {
  setIsSaving(true);

  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/jobs/updateJob/${jobId}`,
      {
        title: jobTitle,
        category,
        description,
        skills,
        compensationType,
        duration: projectDuration,
        hourlyMin,
        hourlyMax,
        xplevel
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    toast.success("Job updated successfully!");
    navigate(-1)

  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Something went wrong"
    );
  } finally {   
    setIsSaving(false);
  }
};

  const handleCancel = () => {
    navigate(-1)
  }

  if (isloading) {
    return (
      <div className='h-screen flex flex-col justify-center items-center bg-[#0c1324]'>
        <div className='w-16 h-16 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin'></div>
        <h3 className='text-white block mt-5 font-bold text-xl'>Loading Job...</h3>
      </div>
    )
  }
  

  return (
    <div className='bg-[#0c1324] min-h-screen text-white'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8'>

        {/* BACK LINK */}
        <Link 
        onClick={()=> navigate(-1)}
         className='inline-flex items-center gap-1.5 text-lg text-[#a5a8ff] hover:underline font-medium mb-4'>
          <i className="ri-arrow-left-line"></i> Back
        </Link>

        {/* PAGE HEADER */}
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Edit Job Posting</h1>
          <p className='text-sm sm:text-base text-[#a5a8ff] mt-1'>
            Editing: <span className='font-semibold'>{jobTitle}</span>
          </p>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>

          {/* LEFT — form */}
          <div className='xl:col-span-2 flex flex-col gap-5'>

            {/* CORE DETAILS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-2xl font-bold flex items-center gap-2 mb-5'>
                <i className="ri-file-list-3-line text-[#a5a8ff]"></i> Core Details
              </h2>

              <label className='text-base font-semibold text-gray-500 tracking-wide'>JOB TITLE</label>
              <input
                type='text'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className='w-full mt-2 mb-5 bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
              />

              <label className='text-base font-semibold text-gray-500 tracking-wide'>CATEGORY</label>
              <div className='relative mt-2'>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full appearance-none bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                >
                  <option>{category}</option>
                  <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="AI/ML">AI/ML</option>
          <option value="DevOps">DevOps</option>
          <option value="Cybersecurity">Cybersecurity</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
              </div>
            </div>

            {/* JOB DESCRIPTION */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                  <i className="ri-article-line text-[#a5a8ff]"></i> Job Description
                </h2>
              </div>

              <div className='rounded-xl border border-[#1e2230] overflow-hidden'>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className='w-full bg-[#0c1324] px-4 py-4 text-base text-gray-300 leading-relaxed focus:outline-none resize-none'
                />
              </div>
            </div>

            {/* REQUIRED SKILLS */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-2xl font-bold flex items-center gap-2 mb-5'>
                <i className="ri-tools-line text-[#a5a8ff]"></i> Required Skills
              </h2>
              <div className='flex flex-wrap gap-2 mb-3'>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className='flex items-center gap-1.5 rounded-lg bg-[#1e2230] px-5 py-2.5 text-base text-gray-200'
                  >
                    {skill}
                    <i
                      className="ri-close-line cursor-pointer text-gray-500 hover:text-white"
                      onClick={() => handleRemoveSkill(skill)}
                    ></i>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddSkill}>
                <input
                  type='text'
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder='Add skill...'
                  className='w-full bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-4.5 text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] transition-colors'
                />
              </form>
            </div>

            {/* BUDGET & SCOPE */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>
              <h2 className='text-2xl font-bold flex items-center gap-2 mb-5'>
                <i className="ri-wallet-3-line text-[#a5a8ff]"></i> Budget & Scope
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
                <div>
                  <label className='text-base font-semibold text-gray-500 tracking-wide'>COMPENSATION TYPE</label>
                  <div className='flex gap-2 mt-2'>
                    <button
                      onClick={() => setCompensationType('hourly')}
                      className={`flex-1 h-15 rounded-xl text-base font-semibold transition-colors ${
                        compensationType === 'hourly'
                          ? 'bg-[#6366F1] text-white'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      onClick={() => setCompensationType('fixed')}
                      className={`flex-1 h-15 rounded-xl text-base font-semibold transition-colors ${
                        compensationType === 'fixed'
                          ? 'bg-[#6366F1] text-white'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      Fixed Price
                    </button>
                  </div>
                </div>

                <div>
                  <label className='text-base font-semibold text-gray-500 tracking-wide'>PROJECT DURATION</label>
                  <div className='flex flex-col gap-2 mt-2'>
                    <button
                      onClick={() => setProjectDuration('1 Year+')}
                      className={`flex items-center justify-between h-12 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        projectDuration === '1 Year+'
                          ? 'bg-[#6366F1]/15 border border-[#6366F1]/40 text-[#a5a8ff]'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      <span className='flex items-center gap-2'><i className="ri-time-line"></i> More than 1 Year</span>
                      {projectDuration === '1 Year+' && <i className="ri-checkbox-circle-fill text-[#a5a8ff]"></i>}
                    </button>
                    <button
                      onClick={() => setProjectDuration('8-12 Months')}
                      className={`flex items-center gap-2 h-12 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        projectDuration === '8-12 Months'
                          ? 'bg-[#6366F1]/15 border border-[#6366F1]/40 text-[#a5a8ff]'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      <span className='flex items-center gap-2'><i className="ri-time-line"></i> 8 to 12 Months</span>
                      {projectDuration === '8-12 Months' && <i className="ri-checkbox-circle-fill text-[#a5a8ff]"></i>}
                      {/* <i className="ri-time-line"></i> 8 to 12 Months */}
                    </button>
                    <button
                      onClick={() => setProjectDuration('3-6 Months')}
                      className={`flex items-center gap-2 h-12 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        projectDuration === '3-6 Months'
                          ? 'bg-[#6366F1]/15 border border-[#6366F1]/40 text-[#a5a8ff]'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      <span className='flex items-center gap-2'><i className="ri-time-line"></i> 3 to 6 Months</span>
                      {projectDuration === '3-6 Months' && <i className="ri-checkbox-circle-fill text-[#a5a8ff]"></i>}
                      {/* <i className="ri-time-line"></i> 3 to 6 Months */}
                    </button>
                    <button
                      onClick={() => setProjectDuration('1-3 Months')}
                      className={`flex items-center gap-2 h-12 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        projectDuration === '1-3 Months'
                          ? 'bg-[#6366F1]/15 border border-[#6366F1]/40 text-[#a5a8ff]'
                          : 'bg-[#0c1324] border border-[#1e2230] text-gray-400 hover:bg-[#161c2a]'
                      }`}
                    >
                      <span className='flex items-center gap-2'><i className="ri-time-line"></i> 1 to 3 Months</span>
                      {projectDuration === '1-3 Months' && <i className="ri-checkbox-circle-fill text-[#a5a8ff]"></i>}
                      {/* <i className="ri-time-line"></i> 1 to 3 Months */}
                    </button>
                  </div>
                </div>
              </div>

              {compensationType === 'hourly' && (
                <div>
                  <label className='text-base font-semibold text-gray-500 tracking-wide'>HOURLY RATE RANGE</label>
                  <div className='flex items-center gap-3 mt-2'>
                    <input
                      type='number'
                      value={hourlyMin}
                      onChange={(e) => setHourlyMin(Number(e.target.value))}
                      className='w-28 bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                    <span className='text-gray-500 text-sm'>to</span>
                    <input
                      type='number'
                      value={hourlyMax}
                      onChange={(e) => setHourlyMax(Number(e.target.value))}
                      className='w-28 bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>
                </div>
              )}
              {compensationType === 'fixed' && (
                <div>
                  <label className='text-base font-semibold text-gray-500 tracking-wide'>FIXED RATE RANGE</label>
                  <div className='flex items-center gap-3 mt-2'>
                    <input
                      type='number'
                      value={hourlyMin}
                      onChange={(e) => setHourlyMin(Number(e.target.value))}
                      className='w-28 bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                    <span className='text-gray-500 text-base'>to</span>
                    <input
                      type='number'
                      value={hourlyMax}
                      onChange={(e) => setHourlyMax(Number(e.target.value))}
                      className='w-28 bg-[#0c1324] border border-[#1e2230] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT — hiring insights */}
          <div className='flex flex-col gap-5'>
            <div className='bg-[#111827] border border-[#1e2230] rounded-2xl p-5'>

              <div className='flex flex-col gap-3 text-base mb-5'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Active Applicants</span>
                  <span className='font-bold text-white'>{activeApplicants}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Interviewing</span>
                  <span className='font-bold text-white'>{interviewing}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Days Live</span>
                  <span className='font-bold text-white'>{daysLive}</span>
                </div>
              </div>

              <p className='text-base font-semibold text-gray-500 tracking-wide mb-3'>JOB SETTINGS</p>
              <div className='flex flex-col gap-4 mb-5'>
                <div className='flex items-center justify-between'>
                  <span className='flex items-center gap-2 text-base text-gray-300'>
                    <i className="ri-eye-line text-gray-500"></i> Public Visibility
                  </span>
                  <button
                    onClick={() => setPublicVisibility(!publicVisibility)}
                    className={`h-6 w-11 rounded-full relative transition-colors ${publicVisibility ? 'bg-[#1d9e75]' : 'bg-[#1e2230]'}`}
                  >
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${publicVisibility ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className='w-full h-15 rounded-xl bg-[#c7c9ff] text-[#1a1a2e] font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 mb-2'
              >
                <i className="ri-save-line"></i> {isSaving ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                onClick={handleCancel}
                className='w-full h-15 rounded-xl bg-transparent text-gray-400 hover:text-white font-medium text-base transition-colors'
              >
                Cancel & Discard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditJob