import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ClientProfile = () => {
  
  const [isloading, setisLoading] = useState(true)

  const [client, setClient] = useState({
    fullname : {
      firstname : '',
      lastname: ''
    },
    email : '',
    contactno : '',
    gender : '',
    github : '',
    linkedin : '',
    location: '',
    bio : '',
    companyProfile : {
      companyName : '',
      description: '',
      website : '',
    }
  })

  const [clientId, setClientId] = useState()

  useEffect(()=>
  {
    const fetchClient = async()=>
    {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/clients/profile`, 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        // console.log(response);
        
        const data = response?.data
        const client = data.client
        const id = client._id
        setClientId(id)
        setClient(client)
        // console.log(clientId);
         
      }catch(err)
      {
        console.log(err);        
      }
      
    }
    fetchClient()
  }, [])

  const handleUpdateProfile = async()=>
  {
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/clients/updateprofile`, 
        client, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // if(response.status===201)
      alert("Profile Updated Successfully");
    }catch (err) {
    console.log(err.response.data);
    } 
  }

  //   if(isloading)
  // {
  //   return (
  //     <div className="h-screen flex flex-col justify-center items-center bg-[#0c1324]">

  //     <div
  //       className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
  //       style={{ animationDuration: "2s" }}
  //     ></div>

  //     <h3 className='text-white block mt-5 font-bold text-xl'>Please Wait...</h3>
  //     </div>
  // )
  // }

  console.log(client);
  
  
  return (
    <div className='bg-[#0c1324] min-h-screen text-white px-4 md:px-8 lg:px-16 py-8'>
      <div className='max-w-6xl mx-auto'>

        {/* PROFILE HEADER */}
        <div className='flex items-start gap-4 mb-8'>
          <div className='relative flex-shrink-0'>
            <div className='w-30 h-30 rounded-xl overflow-hidden bg-[#19192f] border border-[#1e2230]'>
              <div className='w-full h-full bg-gradient-to-br from-[#2a2a4a] to-[#1a1a2e]'></div>
            </div>
            <button className='absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center hover:bg-[#4f52d9] transition-colors'>
              <i className="ri-camera-line text-[10px] text-white"></i>
            </button>
          </div>

          <div className='pt-1'>
            <h1 className='text-lg md:text-3xl font-bold'>{client?.fullname?.firstname} {client?.fullname?.lastname}</h1>

            <h3 className='mt-2'>{client?.location}</h3>

            <span className='inline-flex items-center gap-1.5 mt-2 text-md px-2.5 py-1 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 font-medium'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-400'></span>
              Verified 
            </span>

    
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold mb-4 pl-3 border-l-4 border-[#6366F1]'>Personal Info</h2>

          <div className='flex flex-col gap-4'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>First Name *</label>
                <input
                  type='text'
                  value={client?.fullname?.firstname}
                  onChange={(e) => setClient(
                    {
                      ...client, fullname : {
                        ...client.fullname, firstname:e.target.value
                      }
                    }
                  )}
                  className='w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />
              </div>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Last Name</label>
                <input
                  type='text'
                  value={client?.fullname?.lastname}
                  onChange={(e) => setClient(
                    {
                      ...client, fullname : {
                        ...client.fullname, lastname:e.target.value
                      }
                    }
                  )}
                  className='w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Email Address *</label>
                <div className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'>
                  <i className="ri-mail-line text-gray-400 text-lg flex-shrink-0"></i>
                  <input
                    type='email'
                    value={client?.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className='bg-transparent flex-1 text-lg text-white focus:outline-none min-w-0 disable'
                  />
                </div>
              </div>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Contact Number</label>
                <div className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'>
                  <i className="ri-phone-line text-gray-400 text-lg flex-shrink-0"></i>
                  <input
                    type='text'
                    onChange={(e) => setClient(
                    {
                      ...client, contactno : e.target.value
                    }
                  )}
                  value={client?.contactno}
                    // onChange={(e) => setContactNo(e.target.value)}
                    className='bg-transparent flex-1 text-lg text-white focus:outline-none min-w-0'
                  />
                </div>
                <p className='text-md text-gray-500 mt-1.5'>Enter exactly 10 digits</p>
              </div>

              
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Gender</label>
                <div className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'>
                  <i className="ri-user-line text-gray-400 text-lg flex-shrink-0"></i>
                  <select
                    value={client?.gender}
                    // onChange={(e) => setGender(e.target.value)}
                    className='bg-transparent flex-1 text-lg text-white focus:outline-none cursor-pointer min-w-0 bg-[#111827] '
                  >
                    <option>{client?.gender}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>location </label>
                
                <i className="absolute mt-3.5 ml-2 ri-map-pin-line text-gray-400 text-2xl flex-shrink-0"></i>
                <input
                  type='text'
                  value={client?.location}
                  onChange={(e) => setClient(
                    {
                      ...client, location : e.target.value
                    }
                  )}
                  className='pl-12 w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />

                
              </div>
            </div>

            <div className=''>

                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>BIO</label>
                {/* <div className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'> */}
                  {/* <i className="ri-user-line text-gray-400 text-lg flex-shrink-0"></i> */}
                  <textarea
                    // value={}
                    rows={6}
                    value={client?.bio}
                    onChange={(e) => setClient(
                    {
                      ...client, bio : e.target.value
                    }
                  )}
                    className='w-full bg-[#111827] border border-[#1e2230] rounded-lg p-4 text-lg text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-[#6366F1] transition-colors font-medium'
                    placeholder='Enter Bio'
                  />
                    
                  {/* </textarea> */}
                {/* </div> */}
         
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Github </label>
                
                <i className="absolute mt-3 ml-2 ri-github-fill text-gray-400 text-3xl flex-shrink-0"></i>
                <input
                  type='text'
                  value={client?.github}
                  onChange={(e) => setClient(
                    {
                      ...client, github : e.target.value
                    }
                  )}
                  className='pl-12 w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />

                
              </div>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Linked in</label>
                <i 
                className="absolute mt-3 ml-2 ri-linkedin-box-fill text-gray-400 text-3xl flex-shrink-0"></i>
                <input
                  type='text'
                  onChange={(e) => setClient(
                    {
                      ...client, linkedin : e.target.value
                    }
                  )}
                  value={client?.linkedin}
    
                  className='pl-12 w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />
              </div>
            </div>

          </div>
        </div>

        {/* COMPANY PROFILE */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 pl-3 border-l-4 border-green-400 mt-10'>Company Profile</h2>

          <div className='flex flex-col gap-4'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Company Name</label>
                <input
                  type='text'
                  value={client?.companyProfile?.companyName}
                  onChange={(e) => setClient(
                    {
                      ...client, companyProfile : {
                        ...client.companyProfile, companyName : e.target.value
                      }
                    }
                  )}
                  className='w-full bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors'
                />
              </div>
              <div>
                <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Company Website</label>
                <div className='flex items-center gap-2 bg-[#111827] border border-[#1e2230] rounded-lg h-15 px-4 focus-within:border-[#6366F1] transition-colors'>
                  <i className="ri-global-line text-gray-400 text-lg flex-shrink-0"></i>
                  <input
                    type='text'
                    value={client?.companyProfile?.website}
                    onChange={(e) => setClient(
                    {
                      ...client, companyProfile : {
                        ...client.companyProfile, website : e.target.value
                      }
                    }
                  )}
                    className='bg-transparent flex-1 text-lg text-white focus:outline-none min-w-0'
                  />
                </div>
              </div>
            </div>

            <div>
              <label className='text-md text-gray-500 uppercase tracking-widest mb-2 block'>Company Description</label>
              <textarea
                value={client?.companyProfile?.description}
                onChange={(e) => setClient(
                    {
                      ...client, companyProfile : {
                        ...client.companyProfile, description : e.target.value
                      }
                    }
                  )}
                rows={4}
                className='w-full bg-[#111827] border border-[#1e2230] rounded-lg p-4 text-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none'
              />
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className='flex justify-end gap-3'>
          <Link 
          to={'/client/dashboard'}
          className='px-10 h-15 rounded-lg border-[#00e140] bg-[#00bc00] hover:bg-[#1d6800] transition-colors text-md font-bold text-gray-300 flex justify-center items-center'>
            Dashboard
          </Link>
          <button 
          onClick={handleUpdateProfile}
          className='px-6 h-15 rounded-lg bg-[#6366F1] hover:bg-[#4f52d9] transition-colors text-lg font-semibold text-white'>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default ClientProfile
