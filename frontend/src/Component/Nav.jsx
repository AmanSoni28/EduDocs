import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main.jsx";
import { setUserData } from "../redux/userSlice.js";
import {toast} from "react-hot-toast"
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

const Nav = () => {
    const {userData}=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [show,setShow]=useState(false)
    const [showHamburger,setShowHamburger]=useState(false)

    const handleLogOut=async ()=>{
    try {
        const resutl = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
        // console.log(resutl.data);
        dispatch(setUserData(null))
        toast.success(resutl?.data?.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || "LogOut Error")
    }
  }

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
       <div className=" w-[60px] lg:w-[8%] lg:ml-[50px]  bg-black rounded-xl flex justify-center items-center border-2 border-white py-2">
         <img src="/logos.png"  alt="logo" className="w-[80px]"/>
       </div>
       
       <div className="w-[30%] hidden lg:flex items-center justify-center gap-4 ">  
    
        {!userData &&<FaUserCircle onClick={()=>setShow(prev=>!prev)}
        className=" size-12  border-2 border-white rounded-full fill-white cursor-pointer"/>}

        {userData && !(userData?.photoUrl) &&
        <div onClick={()=>setShow(prev=>!prev)}
        className="size-12 border-2 border-white rounded-full bg-black p-2 flex items-center justify-center cursor-pointer text-3xl text-white">
            {userData?.name.slice(0, 1).toUpperCase()}
        </div>}

        {!userData? <span onClick={()=>navigate("/login")} 
        className="px-[20px] py-[10px] border-2 bg-black  border-white text-white font-semibold rounded-[10px] cursor-pointer hover:scale-105 transition-all duration-200 active:scale-95">Login</span>:
        <span onClick={handleLogOut} 
        className="px-[20px] py-[10px] bg-white   text-black font-semibold rounded-[10px] cursor-pointer hover:scale-105 transition-all duration-200 active:scale-95">LogOut</span>}

        {show && <div className="absolute top-[110%] right[15% flex items-center flex-col justify-center gap-2 text-[16px] rounded-2xl bg-[white] px-[10px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
          <span 
            className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" 
            onClick={()=>navigate('/profile')}>
              My Profile
          </span>
          {userData?.role==='academy' &&
          <span 
            className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600"
            onClick={()=>navigate('/my-uploads')}>
              My Uploads
          </span>}
        </div>}
       </div>

       <RxHamburgerMenu onClick={()=>setShowHamburger(prev=>!prev)}
       className="w-[35px] h-[35px] fill-white text-white cursor-pointer lg:hidden "/>

       <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHamburger ? "translate-x-[0] transition duration-600 " : "translate-x-[-100%] transition duration-600"}`}>
         <GiSplitCross 
         onClick={()=>setShowHamburger(prev=>!prev)}
         className="top-[22px] right-[22px] absolute w-[30px] h-[30px] fill-white bg-black cursor-pointer"/>

         {!userData &&<FaUserCircle className=" text-5xl size-15 border-2 border-white rounded-full cursor-pointer"/>}

         {userData && !(userData?.photoUrl) && 
         <div onClick={()=>setShow(prev=>!prev)}
         className="size-15 border-2 border-white rounded-full bg-black p-2 flex items-center justify-center cursor-pointer text-3xl text-white">
         {userData.name.slice(0, 1).toUpperCase()}
         </div>}
         
         <span 
          className="w-[60vw] h-[7vh] border-2 bg-black  border-white text-white font-semibold rounded-[10px] cursor-pointer flex items-center justify-center" onClick={()=>navigate('/profile')}>My Profile</span>
         
         {userData?.role==='academy' &&
         <span 
           className="w-[60vw] h-[7vh] border-2 bg-black  border-white text-white font-semibold rounded-[10px] cursor-pointer flex items-center justify-center"  onClick={()=>navigate('/my-uploads')}>My Uploads</span>
           }

         {!userData? <span onClick={()=>navigate("/login")} 
         className="w-[60vw] h-[7vh] border-2 bg-black  border-white text-white font-semibold rounded-[10px] cursor-pointer flex items-center justify-center hover:scale-105 transition-all duration-200 active:scale-95">Login</span>:
         <span onClick={handleLogOut} 
         className="w-[60vw] h-[7vh] border-2 bg-black  border-white text-white font-semibold rounded-[10px] cursor-pointer flex items-center justify-center hover:scale-105 transition-all duration-200 active:scale-95">LogOut</span>}
        </div>

      </div>
    </div>
  );                                    
};

export default Nav;