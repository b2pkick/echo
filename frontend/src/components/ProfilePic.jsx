import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import avatar from "./../assets/images/image.webp"
import { Link } from 'react-router-dom'

const ProfilePic = () => {

  const {authUser} = useAuthStore()

  return (
    <Link to={"/profile"}>
    <img src={authUser.profilePic||avatar} className='h-[50px] w-[50px] rounded-full'></img>
    </Link>
  )
}

export default ProfilePic