import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import avatar from "./../assets/images/image.webp"
import { useAuthStore } from '../store/useAuthStore'
import { useRef } from 'react'

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessage} =useChatStore()
  const {authUser}=useAuthStore()
  const messageEndRef=useRef(null)
  // useEffect(()=>{
  //   getMessages(selectedUser._id)
  // },[selectedUser._id,getMessages])

  // useEffect(()=>{
  //   getMessages()
  // },[getMessages])(

  useEffect(()=>{
    getMessages(selectedUser._id)
    subscribeToMessages()
    return ()=>unsubscribeFromMessage()
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessage])

  useEffect(()=>{
    if(messageEndRef.current&&messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  if(isMessagesLoading) return(
    <div className='flex h-full w-full items-center text-white flex-col justify-between px-15 pt-18'>
      <ChatHeader />
      <div className='flex justify-center items-center h-full text-7xl'>
        <div className='animate-bounce'>. </div>
        <div className='animate-bounce delay1'>. </div>
        <div className='animate-bounce delay2'>. </div>
      </div>
      <MessageInput />
    </div>
  )
  return (
    <div className='flex h-full w-full bg-transparent items-center text-white flex-col justify-between px-7 md:px-15 no-scrollbar pt-18'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto overflow-x-hidden w-full no-scrollbar'>
        {messages.map((curr)=>(
          <div key={curr._id} ref={messageEndRef} className={`w-full flex ${curr.senderId===selectedUser._id?"justify-start":"justify-end"} mt-5`}>
            {curr.senderId===selectedUser._id?<div className='flex justify-center gap-2 max-w-[70%]'>
              <img className='h-10 w-10 rounded-full object-cover flex-shrink-0' src={selectedUser.profilePic||avatar}/>
              <div className='flex flex-col justify-center items-start min-w-0 flex-1'>
              {curr.image&&<img src={curr.image} className='w-40 h-40 object-cover border-2 border-amber-50'/>}
              {curr.text&&<p className='break-words whitespace-pre-wrap max-w-40 md:max-w-130 bg-amber-50 opacity-50 text-black p-1 text-2xl'>{curr.text}</p>}
              </div>
            </div>:<div className='flex justify-center gap-2 max-w-[70%]'>
              <div className='flex flex-col justify-center items-end min-w-0 flex-1 gap-2'>
              {curr.image&&<img src={curr.image}  className='w-40 h-40 object-cover border-2 border-amber-50'/>}
              {curr.text&&<p className='break-words whitespace-pre-wrap max-w-40 md:max-w-130 bg-amber-50 opacity-50 text-black p-1 text-2xl'>{curr.text}</p>}
              </div>
              <img className='h-10 w-10 rounded-full object-cover flex-shrink-0' src={authUser.profilePic||avatar}/>
            </div>}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer