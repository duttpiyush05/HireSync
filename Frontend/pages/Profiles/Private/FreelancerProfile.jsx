import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const FreelancerProfile = () => {

    const token = localStorage.getItem('token')
    const [freelancer, setFreelancer] = useState({
    fullname : {
      firstname : '',
      lastname: ''
    },
    email : '',
    contactno : '',
    gender : '',
    profile : {
      title : '',
      bio: '',
      skills : [],
      hourlyRate: '',
      experienceLevel : '',
      github : '',
      linkedin : ''
    }
  })
    const [isloading, setisLoading] = useState(true)

    const navigate = useNavigate()
  const xplevel = freelancer?.profile?.experienceLevel
  const [experienceLevel, setExperienceLevel] = useState(xplevel)
  // const [skills, setSkills] = useState(['React', 'Node.js', 'TypeScript', 'AWS'])
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {

  const skill = newSkill.trim().toLowerCase()

  if(!skill) return

  if(freelancer?.profile?.skills?.some(s => s.toLowerCase()===skill.toLowerCase())){
    alert("Skill already added")
    return
  }

  setFreelancer((freelancer) => ({
  ...freelancer,
  profile: {
    ...freelancer.profile,
    skills: [
      ...freelancer?.profile?.skills,
      skill
    ]
  }
}));
  
  setNewSkill('');
};


  const removeSkill = (skillToRemove) => {
  setFreelancer({
    ...freelancer,
    profile: {
      ...freelancer.profile,
      skills: freelancer?.profile?.skills?.filter(
        skill => skill !== skillToRemove
      )
    }
  });
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

   useEffect(()=>{
      const fetchFreelancer= async()=>
      {
        try
        {
          const response =await axios.get(`${import.meta.env.VITE_BASE_URL}/freelancers/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          const data = response.data          
          setFreelancer(data.freelancer)
        }catch(err)
        {
          console.log(err.response?.data)
        }finally{
          setTimeout(() => {
            setisLoading(false)
          }, 2000);
        }
      }
  
      fetchFreelancer()
     },[])

     if(isloading)
  {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">

      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "2s" }}
      ></div>

      <h3 className='text-white block mt-5 font-bold text-xl'>Please Wait...</h3>
      </div>
  )
  }

  const handleUpdateProfile = async () => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/freelancers/updateprofile`,
      freelancer,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    if(response.status===201)
      alert("Profile Updated Successfully");
  } catch (err) {
    console.log(err.response.data);
  }finally{
    setTimeout(() => {
      setisLoading(false)
    }, 1000);
  }
};

  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 sm:px-8 md:px-12 lg:px-16 py-8'>
      <div className='max-w-7xl mx-auto '>

        {/* PAGE HEADER */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>Edit Profile</h1>
            <p className='text-sm sm:text-base text-gray-400 mt-1'>Manage your public identity and professional details.</p>
          </div>
          <div className='flex gap-3 flex-shrink-0'>
            <Link
              to={'/fl/dashboard'}
              className='px-10 h-15 rounded-lg border-[#00e140] bg-[#009c00] hover:bg-[#1d6800] transition-colors text-md font-bold text-gray-300 flex justify-center items-center'
            >
              Dashboard
            </Link>

            <button 
            onClick={handleUpdateProfile}
            className='px-10 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white'>
              Save Changes
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

          {/* LEFT COLUMN */}
          <div className='flex flex-col gap-5'>

            {/* Photo */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6 min-h-[20rem]'>
              <h2 className='text-2xl font-bold mb-5'>Photo</h2>
              <div className='flex flex-col items-center gap-4'>
                <div className='relative'>
                  <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#1e2230] overflow-hidden bg-[#19192f]'>
                    <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
                  </div>
                  <button className='absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center hover:bg-[#4f52d9] transition-colors'>
                    <i className="ri-camera-line text-xs text-white"></i>
                  </button>
                </div>
                <p className='text-md text-gray-400 text-center leading-relaxed'>
                  Upload a high-quality JPG or PNG. Minimum recommended size is 400×400px.
                </p>
              </div>
            </div>

            {/* Social Connectivity */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6 min-h-[20rem]'>
              <h2 className='text-2xl font-bold mb-5'>Social Connectivity</h2>

              <div className='flex flex-col gap-4'>
                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>GitHub URL</label>
                  <div className='flex items-center gap-2 bg-[#0c1324] border border-[#1e2230] rounded-lg h-11 px-3 focus-within:border-[#6366F1] transition-colors'>
                    <i className="ri-github-fill text-gray-400 text-3xl flex-shrink-0"></i>
                    <input
                      type='text'
                      value={freelancer?.profile?.github}
                      onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, profile : {
                            ...freelancer, github : e.target.value
                          }
                        })
                      }
                      } 
                      className='bg-transparent flex-1 text-lg text-white focus:outline-none min-w-0'
                    />
                  </div>
                </div>

                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>LinkedIn Profile</label>
                  <div className='flex items-center gap-2 bg-[#0c1324] border border-[#1e2230] rounded-lg h-11 px-3 focus-within:border-[#6366F1] transition-colors'>
                    <i className="ri-linkedin-box-fill text-gray-400 text-3xl flex-shrink-0"></i>
                    <input
                      type='text'
                      value={freelancer?.profile?.linkedin}
                      onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, profile : {
                            ...freelancer, linkedin : e.target.value
                          }
                        })
                      }
                      } 
                      className='bg-transparent flex-1 text-lg text-white focus:outline-none min-w-0'
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className='lg:col-span-2 flex flex-col gap-5'>


                        <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <h2 className='text-2xl font-bold mb-5'>Personal Information</h2>

              <div className='flex flex-col gap-5'>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block '>First Name</label>
                    <input
                      type='text'
                      value={freelancer?.fullname?.firstname}
                      onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, fullname : {
                              ...freelancer, firstname : e.target.value
                          }
                        })
                      }
                      }   
                      className='capitalize w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>

                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Last Name</label>
                    <input
                      type='text'
                      value={freelancer?.fullname?.lastname}
                      onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, fullname : {
                              ...freelancer, lastname : e.target.value
                          }
                        })
                      }
                      } 
                      className='capitalize w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Email Address</label>
                    <input
                      type='email'
                      value={freelancer?.email}
                      className='disable  w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>

                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Phone Number</label>
                    <input
                      type='text'
                      value={freelancer?.contactno}
                      onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, contactno : e.target.value
                        })
                      }
                      } 
                      className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                  </div>
                </div>

                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Gender</label>
                  <select
                    className='disable w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer'
                  >
                    <option>{freelancer?.gender}</option>
                  </select>
                </div>

              </div>
            </div>


            {/* Profile Basics */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <h2 className='text-2xl font-bold mb-5'>Profile Basics</h2>

              <div className='flex flex-col gap-5'>
                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Professional Title</label>
                  <input
                    type='text'
                    value={freelancer?.profile?.title}
                    onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, profile : {
                            ...freelancer.profile, title : e.target.value
                          }
                        })
                      }
                      }
                    className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg h-11 px-4 text-md font-medium text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                  />
                </div>

                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Bio</label>
                  <textarea
                    value={freelancer?.profile?.bio}
                    onChange={(e)=>
                      {
                        setFreelancer({
                          ...freelancer, profile : {
                            ...freelancer.profile, bio : e.target.value
                          }
                        })
                      }
                      } 
                    rows={5}
                    className='w-full bg-[#0c1324] border border-[#1e2230] rounded-lg p-4 text-md text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none'
                  />
                  {/* Toolbar */}
                  {/* <div className='flex items-center justify-between mt-2 px-1'>
                    <div className='flex gap-3'>
                      <button className='text-sm font-bold text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center'>B</button>
                      <button className='text-sm italic text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center'>I</button>
                      <button className='text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center'>
                        <i className="ri-list-unordered text-sm"></i>
                      </button>
                    </div>
                    <i className="ri-information-line text-gray-500 text-sm"></i>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Expertise & Billing */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <h2 className='text-2xl font-bold mb-5'>Expertise & Billing</h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

                {/* Skills */}
                <div>
                  <label className='text-md text-gray-500 uppercase tracking-widest mb-3 block'>Skills</label>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {freelancer?.profile?.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className='flex items-center gap-1.5 text-md px-3 py-1.5 rounded-md bg-[#19192f] border border-[#33336e] text-gray-300 font-medium'
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className='text-gray-500 hover:text-red-400 transition-colors leading-none'
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder='Add skill...'
                      className='flex-1 min-w-0 bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-3 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1] transition-colors'
                    />
                    <button
                      onClick={addSkill}
                      className='px-4 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-md font-semibold text-white flex-shrink-0'
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Rate + Level */}
                <div className='flex flex-col gap-5'>
                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Hourly Rate ($)</label>
                    <div className='flex items-center gap-2 bg-[#0c1324] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'>
                      <span className='text-gray-400 text-xl'>$</span>
                      <input
                        type='number'
                        value={freelancer?.profile?.hourlyRate}
                         onChange={(e)=>
                          {
                            setFreelancer({
                              ...freelancer, profile : {
                                ...freelancer.profile, hourlyRate : e.target.value
                              }
                            })
                          }
                          } 
                        className='bg-transparent flex-1 text-xl text-white focus:outline-none min-w-0'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Experience Level</label>
                    <div className='flex gap-2'>
                      {['Entry', 'Mid', 'Expert'].map((level) => (
                        <button
                          key={level}
                          onClick={()=>{
                            setFreelancer({
                              ...freelancer, profile : {
                                ...freelancer.profile, experienceLevel : level
                              }
                            })
                          }}
                          className={`flex-1 h-12 rounded-lg text-md font-semibold border transition-colors cursor-pointer ${
                            xplevel === level
                              ? 'bg-[#6366F1] border-[#6366F1] text-white'
                              : 'bg-transparent border-[#1e2230] text-gray-400 hover:border-[#33336e]'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Visibility */}
            <div className='bg-[#111827] border border-[#1e2230] rounded-xl p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                  <h2 className='text-2xl font-bold text-[#f97316] mb-1'>Profile Visibility</h2>
                  <p className='text-xs sm:text-lg text-gray-400 leading-relaxed'>
                    Your profile is currently public and appearing in search results.
                  </p>
                </div>
                <button className='flex-shrink-0 px-5 py-2.5 rounded-lg border border-[#f97316] text-[#f97316] hover:bg-[#f97316]/10 transition-colors text-md font-semibold whitespace-nowrap'>
                  Deactivate Profile
                </button>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default FreelancerProfile
