import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeClosed, Key, Mail, MessageCircle, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import {toast} from "react-hot-toast"

const SignUpPage = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signup,isSigningUp} = useAuthStore()

  const validateForm = ()=>{
    let name=formData.fullName.trim()
    let email=formData.email.trim()
    let password=formData.password.trim()
    if(!name){
      toast.error(`enter your name`,{
        icon:'💬',
        style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px',
          }
      })
      return false;
    }
    if(!email){
      toast.error(`enter your email`,{
        icon:'💬',
        style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px',
          }
      })
      return false;
    }
    if(!/\S+@\S+\.\S+/.test(email)){
      toast.error(`enter valid email format`,{
        icon:'💬',
        style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px',
          }
      })
      return false;
    }
      if(!password){
        toast.error(`enter your password`,{
          icon:'💬',
          style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px',
          }
        })
        return false;
      }
      if(password.length<6){
        toast.error(`password must be atleast 6 characters`,{
          icon:'💬',
          style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px',
          }
        })
        return false;
      }
    return true
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    let isOk = validateForm()
    if(!isOk) return
    await signup(formData)
  }
  
  return (
    <>
      <div className='flex flex-col justify-around items-center w-full text-black pixelated h-screen overflow-hidden no-scrollbar'>
        <div className='flex flex-col justify-center items-center text-shadow-black w-full'>
        <h2 className='text-7xl md:text-9xl text-white'>Echo</h2>
        <h2 className='text-3xl md:text-5xl text-white'>get connected to us</h2>
        </div>
      <div className='bg-transparent md:w-[500px] h-[400px] text-4xl flex flex-col justify-center gap-6'>
        <form onSubmit={handleSubmit} className='gap-2 flex flex-col'>
          <div className='ml-2 text-2xl md:text-3xl'>
            <label className='text-white '>
              username
            </label>
          </div>
          <div className='flex w-full bg-white opacity-50 justify-center items-center border-white gap-3 p-1'>
            <User />
            <input className='w-full outline-none text-2xl' type='text' value={formData.fullName} spellCheck="false" onChange={(e)=>{
              setFormData(prev=>({...prev,fullName:e.target.value}))
            }}></input>
          </div>
          <div className='ml-2 text-2xl md:text-3xl'>
            <label className='text-white'>
              email
            </label>
          </div>
          <div className='flex w-full bg-white opacity-50 justify-center items-center border-white border- gap-3 p-1'>
            <Mail />
            <input className='w-full outline-none text-2xl' type='email' value={formData.email} spellCheck="false" onChange={(e)=>{
              setFormData(prev=>({...prev,email:e.target.value}))
            }}></input>
          </div>
          <div className='ml-2 text-2xl md:text-3xl'>
            <label className='text-white'>
              password
            </label>
          </div>
          <div className='flex w-full bg-white opacity-50 justify-center items-center border-white border- gap-3 p-1'>
            <Key />
            <input className='w-full outline-none text-2xl' type={showPassword?"text":"password"} value={formData.password} spellCheck="false" onChange={(e)=>{
              setFormData(prev=>({...prev,password:e.target.value}))
            }}></input>
            <button type='button' onClick={()=>setShowPassword((prev)=>(!prev))}>
              {showPassword ? <Eye />:<EyeClosed />}
            </button>
          </div>
      <div className='w-full flex  justify-center items-center h-20'>
        <button onClick={handleSubmit} disabled={isSigningUp} type='submit' className='px-3 md:px-8 py-1 md:py-2 bg-white opacity-50 text-2xl md:text-4xl' >{isSigningUp?<>Loading...</>:<>SignUp</>}</button>
      </div>
        </form>
      </div>
      <div className='flex gap-7 text-xl sm:text-2xl'>
        <h2 className=' text-white'>Already Have A Account??</h2>
        <Link to={"/login"} className=' text-white'>Loginnnnn</Link>
      </div>
      </div>
      </>
  )
}

export default SignUpPage