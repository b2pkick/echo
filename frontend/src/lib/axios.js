import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://echo-ix6i.onrender.com/api",
    withCredentials:true
})