import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"echo-production-cc43.up.railway.app/api",
    withCredentials:true
})