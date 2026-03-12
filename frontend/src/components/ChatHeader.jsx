import React from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatHeader = () => {
    const {selectedUser,setSelectedUser} = useChatStore()
  return (
    <div className='w-full h-10 flex justify-between px-4 text-3xl'>
        <div></div>
        <div>{selectedUser.fullName}</div>
        <button onClick={()=>(setSelectedUser(null))}>X</button>
    </div>
  )
}

export default ChatHeader