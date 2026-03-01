import { Camera } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import image from "./../assets/images/image.webp"
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

const ProfilePage = () => {

  const {isUpdatingProfile,update,authUser} = useAuthStore()

  const [file,setfile] = useState(null)
  const [preview,setpreview] = useState(null)

  
  useEffect(()=>{
    if(!file){
      setpreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setpreview(url)
    return ()=>URL.revokeObjectURL(url)
  },[file])
  
  const updation = async()=>{
    if(!file){
      toast.error("no image added",{
      icon:'💬',
      style:{
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        color:'white',
        borderRadius:'5px',
      }
      })
      return
    }
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async()=>{
      const pic = reader.result
      await update({profilePic:pic})
    }
  }

  const image1=preview||authUser.profilePic||image

  return (
    <div className='login h-screen flex justify-center items-center'>
      <div className='w-[300px] h-[400px] sm:w-[300px] sm:h-[475px] md:w-[670px] md:h-[670px] bg-white opacity-60 border-8 border-white rounded-2xl'>
        <div className='flex justify-center items-center h-[30%] bg-black rounded-t-xl'>
          <div className='rounded-full h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] md:h-[175px] md:w-[175px] bg-blue-950 relative'>
            <label htmlFor='image' className='absolute bottom-0 right-0'>
              <Camera className='h-[25px] w-[25px] md:h-[50px] md:w-[50px] p-1 md:p-3 text-white bg-black rounded-full'/>
            </label>
            <input accept='image/*' disabled={isUpdatingProfile} type='file' id='image' hidden onChange={(e)=>(setfile(e.target.files?.[0])||null)}></input>
            <img src={image1} className='h-full w-full rounded-full opacity-100'></img>
          </div>
        </div>
        <div className='bg-black h-[50%] flex flex-col justify-center items-center gap-4 md:gap-10'>
          <div className='flex flex-col gap-2 md:gap-5'>
          <p className='text-2xl md:text-5xl text-white'>Name:</p>
          <div className='w-40 md:w-96 h-7 md:h-14 border-black bg-white opacity-100 text-black flex items-center text-xl md:text-4xl p-2 rounded-xl'>
            {authUser.fullName}
          </div>
          </div>
          <div className='flex flex-col gap-2 md:gap-5'>
          <p className='text-2xl md:text-5xl text-white'>Email:</p>
          <div className='w-40 md:w-96 h-7 md:h-14 border-black bg-white opacity-100 text-black flex items-center text-xl md:text-4xl p-2 rounded-xl'>
            {authUser.email}
          </div>
          </div>
        </div>
        <div className='flex justify-center items-center h-[20%] bg-black rounded-b-xl'>
          <button className='h-7 md:h-14 text-xl md:text-4xl w-24 md:w-60 bg-white rounded-xl text-black opacity-100' disabled={isUpdatingProfile} onClick={updation}>
            {isUpdatingProfile?<>Updating...</>:<>Update</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage