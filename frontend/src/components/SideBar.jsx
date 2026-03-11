import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { openContext } from '../pages/HomePage'
import avatar from "./../assets/images/image.webp"

const SideBar = () => {
    const {open,setOpen} = useContext(openContext)
    
    const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading} =useChatStore();

    // const onlineUser=[]

    useEffect(()=>{
        getUsers()
        console.log(users)
    },[getUsers])

    if(isUsersLoading) return(
      <div className='flex justify-center items-center h-screen text-7xl'>
      <div className='animate-bounce'>. </div>
      <div className='animate-bounce delay1'>. </div>
      <div className='animate-bounce delay2'>. </div>
    </div>
    )
    // console.log(selectedUser)

  return (
    <div className = {`${open?"translate-x-0":"-translate-x-full"} overflow-y-auto h-full w-75 md:w-100 flex flex-col absolute transition-all duration-500 left-0 bg-black text-white items-center text-4xl border-2 border-l-0 z-1000`}>
        <div className=''>
            contacts
        </div>
        <div className='w-full flex-1 h-full overflow-y-auto flex flex-col items-center'>
          {users.map((user)=>(
            <button key={user._id} onClick={()=>{setSelectedUser(user)}} className={`flex justify-center items-center gap-2 ${selectedUser?._id===user._id?"text-yellow-300":"text-blue-200"}`}>
              <img src={user.profilePic||avatar} className='w-6 h-6 rounded-full'></img>
              {user.fullName}
            </button>
          ))}
        </div>
    </div>
  )
}

export default SideBar