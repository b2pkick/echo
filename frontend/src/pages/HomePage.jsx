import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { createContext } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChat from '../components/NoChat'
import ChatContainer from '../components/ChatContainer'
import home from "./../assets/images/home.gif"

const openContext=createContext()

function HomePage() {
  const {selectedUser}=useChatStore()
  const [open,setOpen] =useState(false)
  return (
    <openContext.Provider value={{open,setOpen}}>
    <div className={`w-full h-[100%] relative overflow-hidden no-scrollbar pixelated-1`}>
      <SideBar />
      {selectedUser?<ChatContainer />:<NoChat />}
      <button onClick={()=>(setOpen((prev)=>!prev))} className={` ${open?`right-1 md:left-88`:`-left-1 md:left-2`} absolute duration-500 z-2000 w-10 h-10 rounded-full text-3xl bottom-4`}>{open?"<":">"}</button>
    </div>
    </openContext.Provider>
  )
}

export default HomePage
export {openContext}