import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import ProfilePic from "./ProfilePic"

const Navbar =()=>{
  const {authUser} = useAuthStore()
  return(
    <div className="h-10 w-full flex items-center justify-between bg-transparent p-9 fixed top-0 z-100">
      <Link to={"/"} className="text-3xl">ECHO</Link> 
      <div className="flex gap-3 text-2xl">
        {authUser&&<ProfilePic />}
        {/* {authUser&&<button onClick={out}>Logout</button>} */}
      </div>
    </div>
  )
}

export default Navbar