import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import registerImage from '../src/assets/register.png'
import { FLDataContext } from '../src/context/FLContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contactno, setContactno] = useState('')
  const [gender, setGender] = useState('')
  const [check, setcheck] = useState(false)
  
  const [freelancerData, setfreelancerData] = useState({})

  const [freelancer, setfreelancer] = useContext(FLDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) =>
  {
    e.preventDefault()
    const freelancerData = {
      fullname : {
        firstname : firstname,
        lastname : lastname,
      },
      email : email,
      password : password,
      contactno : contactno,
      gender : gender
    }
   
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/freelancers/register`, freelancerData)
      if(response.status === 201)
      {
        const data = response.data
        setfreelancer(data.freelancer)
        localStorage.setItem('token', data.token)
        console.log(data.user)
        navigate('/fl/dashboard')
      }
    }catch(err)
    {
      console.log(err.response.data)
    }    

    setfirstname('')
    setlastname('')
    setEmail('')
    setPassword('')
    setContactno('')
    setGender('')
    setcheck(false)
  }

  return (
    <div className='h-full w-full flex overflow-hidden '>
      
      <div className='h-screen w-1/2 flex text-white '>
        <img className='h-full w-full object-cover z-50' src={registerImage} alt="" />

        <div className='absolute z-100 w-full h-20'>
            <h1 className='text-4xl font-bold p-20 m-10'>HireSync</h1>
        </div>
      
        <div className='absolute z-100 self-end w-1/2 pb-20 p-25' >
         <h1 className='text-8xl mb-4 font-bold'>Elevate your professional trajectory.</h1>
        <div className='w-[75%]'>
           <h3 className='pt-5 text-2xl' >Access exclusive contracts with top-tier enterprise clients in a 
          streamlined, developer-first workspace engineered for high-performance talent.</h3>
        </div>
        </div>

      </div>

      <div className='h-screen w-1/2 bg-[#0c1324] text-white p-20'>

          <h1 className='text-4xl mb-3 font-bold'>Create an Account</h1>
          <h4 className='text-lg text-gray-400'>Select your primary role to customize your onboarding.</h4>

          <div className='flex w-[80%] mt-8 gap-4 mb-8'>

              <div className='p-5 h-40 rounded-xl bg-[#19192f]'>
                <h2 className='mb-2 text-2xl'><i className="ri-suitcase-line"></i></h2>
                <h3 className='font-bold mb-2'>Join as Freelancer</h3>
                <h4 className='text-md text-gray-300'>Find high-end contracts and manage projects.</h4>
              </div>

              <div className='p-5 h-40 rounded-xl bg-[#19192f]'>
                <h2 className='mb-2 text-2xl'><i className="ri-building-line"></i></h2>
                <h3 className='font-bold mb-2'>Join as Client</h3>
                <h4 className='text-md text-gray-300'>Hire vetted experts for your enterprise needs.</h4>
              </div>

            </div>
              
            <form onSubmit={(e)=> {submitHandler(e)}}>
              
                <div className='w-[80%] flex gap-4'>
                  <div className='w-1/2 '>
                    <h2 className='p-3 pl-0'>First Name</h2>

                    <input 
                    required
                    value={firstname}
                      onChange={(e)=>
                      {
                        setfirstname(e.target.value)
                      }}
                    className=' w-1/2 px-4 w-full h-12 rounded-md bg-[#19192f] capitalize' 
                    type="text" 
                    placeholder='John'
                    />

                  </div>
                  <div className='w-1/2 '>
                    <h2 className='p-3 pl-0'>Last Name</h2>

                    <input 
                    required
                    value={lastname}
                    onChange={(e)=> setlastname(e.target.value)}

                    className='w-1/2 px-4 w-full h-12 rounded-md bg-[#19192f] capitalize' 
                    type="text" 
                    placeholder='John'/>

                  </div>

                  
                </div>

                <h3 className='mt-5 mb-3'>Work Email</h3>

                <input 
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}

                className=' w-1/2 px-4 w-[80%] h-12 rounded-md bg-[#19192f]' 
                type="email" 
                placeholder='John@gmail.com'/>


                <h3 className='mt-5 mb-3'>Password</h3>

                <input 
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}

                className='bg-[#19192f] w-1/2 px-4 w-[80%] h-12 rounded-md' 
                type="password" 
                placeholder='John'/>


                 <span className='block text-sm mt-1 mb-6'>*Must be at least 6 characters containing a number and a symbol.</span>


                <h3 className='mt-5 mb-3'>Contact No.</h3>

                <input
                required
                value={contactno}
                onChange={(e)=> setContactno(e.target.value)}
                className='bg-[#19192f] w-1/2 px-4 w-[60%] m h-12 rounded-md' 
                type='text' 
                placeholder='John'/>


                <select 
                required
                onChange={(e)=> setGender(e.target.value)}

                className='h-12 rounded-md ml-5 p-3 bg-[#19192f] pointer w-1/6'>
                
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>

                </select>


                <div className='flex items-center gap-2 mt-10'>
                  <input 
                  required
                  value={check}
                  onChange={()=> setcheck(true)}
                  type="checkbox" 
                  className='h-5 w-5 accent-green-500 border-none rounded-1'  
                  /> 

                <p className='font-semibold'> I agree to the HireSync Terms of Service and acknowledge the Privacy Policy.</p>
                </div>

                <button className='block w-[80%] mt-4 h-12 rounded-md bg-[#6366F1]' type='submit'>Create Account</button>

                <p className='mt-5 pl-55 text-lg'>Already have an account? <Link to="/fl/login" className='hover:underline font-bold'>Log In</Link> </p>


            </form>

        

      </div>

    </div>
  )
}

export default RegisterPage
