import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://echo-production-cc43.up.railway.app/api",
    withCredentials:true
})