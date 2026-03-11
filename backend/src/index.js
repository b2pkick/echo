import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import {connectDB} from "./lib/db.js"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app,server } from "./lib/socket.js"

// const app = express()

const port = process.env.PORT||5001

// app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","https://echo-eight-xi.vercel.app/","*"],
    // credentials:true
}))
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb",extended:true}))

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectDB()
})