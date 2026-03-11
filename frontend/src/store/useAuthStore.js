import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("error in checkauth: ",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success(`account created successfully`,{
            icon:'💬',
            style:{
            backgroundColor:'rgba(0, 0, 0, 0.3)',
            color:'white',
            borderRadius:'5px'
            }
            })
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message||"signup failed",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
            set({authUser:null})
        }finally{
            set({isSigningUp:false})
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success(`logged out successfully`,{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message||"logout failed",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success(`user loginned`,{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message||"login failed",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }finally{
            set({isLoggingIn:false})
        }
    },
    update:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success(`profile updated`,{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        } catch (error) {
            toast.error(error.response.data.message||"updation failed",{
            icon:'💬',
            style:{
                backgroundColor:'rgba(0, 0, 0, 0.3)',
                color:'white',
                borderRadius:'5px',
            }
            })
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser||get().socket?.connected) return
        const socket =io("echo-production-cc43.up.railway.app",{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
}))