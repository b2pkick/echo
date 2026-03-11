import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore"

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:true,
    isMessagesLoading:false,
    isSendingMessage:false,
    getUsers:async()=>{
        set({isUsersLoading:true})
        try{
            const res=await axiosInstance.get("/message/users")
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message||"booom",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message||"error in get messages",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage:async(messageData)=>{
        set({isSendingMessage:true})
        const {selectedUser,messages} = get()
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message||"booom",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }finally{
            set({isSendingMessage:false})
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser} =get()
        if(!selectedUser) return
        const socket=useAuthStore.getState().socket

        
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },
    unsubscribeFromMessage:()=>{
        const socket=useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
        console.log(selectedUser)
    },
}))