import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { createContext } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChat from '../components/NoChat'
import ChatContainer from '../components/ChatContainer'

const openContext=createContext()

function HomePage() {
  const {selectedUser}=useChatStore()
  const [open,setOpen] =useState(false)
  return (
    <openContext.Provider value={{open,setOpen}}>
    <div className='w-full h-[100%] relative overflow-hidden mt-18'>
      <button onClick={()=>(setOpen((prev)=>!prev))} className={` ${open?`left-77.5 md:left-102.5`:`left-2`} absolute duration-500 z-100 w-10 h-10 rounded-full text-3xl bottom-3`}>{open?"<":">"}</button>
      <SideBar />
      {selectedUser?<ChatContainer />:<NoChat />}
    </div>
    </openContext.Provider>
  )
}

export default HomePage
export {openContext}