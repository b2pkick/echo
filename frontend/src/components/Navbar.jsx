import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import ProfilePic from "./ProfilePic"

const Navbar =()=>{

  const {authUser,logout} = useAuthStore()

  const out = async()=>{
    await logout()
  }

  return(
    <div className="h-10 w-full flex items-center justify-between bg-transparent fixed top-0 p-9">
      <Link to={"/"} className="text-3xl">ECHO</Link>
      <div className="flex gap-5 text-2xl">
        {authUser && <ProfilePic />}
        {authUser && <button onClick={out}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar