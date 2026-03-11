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
    <div className='flex h-full w-full bg-black items-center text-white flex-col justify-between'>
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
    <div className='flex h-full w-full bg-black items-center text-white flex-col justify-between'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto w-full'>
        
        {messages && messages.map((curr)=>(
          <div key={curr._id} ref={messageEndRef} className={`w-full flex h-10 bg-yellow-400 ${curr.senderId===selectedUser._id?"justify-start":"justify-end"}`}>
            {curr.senderId===selectedUser._id?<div className='flex items-center'>
              <img className='h-10 w-10' src={selectedUser.profilePic||avatar}/>
              {curr.text&&<p>{curr.text}</p>}
              {curr.image&&<img src={curr.image} className='w-10 h-10'/>}
            </div>:<div className='flex h-10 items-center'>
              {curr.text&&<p>{curr.text}</p>}
              {curr.image&&<img src={curr.image}  className='w-10 h-10'/>}
              <img className='h-10 w-10' src={authUser.profilePic||avatar}/>
            </div>}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer