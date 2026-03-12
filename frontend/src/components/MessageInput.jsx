import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import avatar from "./../assets/images/image.webp"
import {Image,Send} from "lucide-react"
import toast from 'react-hot-toast'

const MessageInput = () => {
    const [text,setText] = useState("")
    const [imagePreview,setImagePreview]=useState(null)
    const fileInputRef=useRef(null)
    const {sendMessage,isSendingMessage}=useChatStore()

    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(!file) return        
        console.log(file)
        if(!file.type.startsWith("image/")){
            toast.error("provide image file",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
            return
        }
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setImagePreview(reader.result)
        }
    }
    
    const removeImage=()=>{
        setImagePreview(null)
        if(fileInputRef.current) fileInputRef.current.value=""
    }
    const handleSendMessage=async(e)=>{
        e.preventDefault()
        if(!text.trim()&&!imagePreview) return
        try {
            await sendMessage({
                text:text.trim(),
                image:imagePreview
            })
            setText("")
            setImagePreview(null)
            if(fileInputRef.current) fileInputRef.current.value=""
        } catch (error) {
            console.log("failed to send message",error)
        }   
    }
  return (
    <div className='w-full py-4'>
        {imagePreview&&(
            <div className='mb-10 w-30 h-30'>
                <div className='relative'>
                <img src={imagePreview} className='w-30 h-30 object-cover border-2 border-amber-50' />
                <button className='absolute right-2 top-0 text-3xl text-amber-50' onClick={removeImage}>X</button>
                </div>
            </div>
        )}
        <form onSubmit={handleSendMessage}>
            <div className='flex-1 flex gap-2 w-full'>
                <input type='text' placeholder='type a message ...' className=' p-2 bg-amber-50 opacity-50 text-black w-full outline-none' value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange}></input>
                <button type='button' className='flex justify-center items-center h-10 w-10 bg-amber-50 opacity-50 text-black' onClick={()=>(fileInputRef.current?.click())} disabled={isSendingMessage}><Image /></button>
                <button type='submit' className='h-10 w-10 flex justify-center items-center bg-amber-50 opacity-50 text-black' disabled={(!text.trim()&&!imagePreview)||isSendingMessage}><Send /></button>
            </div>
        </form>
    </div>
  )
}

export default MessageInput