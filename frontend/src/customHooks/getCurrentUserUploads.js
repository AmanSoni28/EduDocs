import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setAllPdfs } from "../redux/userSlice.js"
import { setCurrentUserPdfs } from "../redux/userSlice.js"


const getCurrentUserUploads=()=>{
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.user)
    const {allPdfs}=useSelector((state)=>state.user)
    useEffect(()=>{
     const fetchUserUploads=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/pdf/my-uploads`,{withCredentials:true})
            dispatch(setCurrentUserPdfs(result.data))
        } catch (error) {
            console.log("getCurrentUserUploads error:",error);
            dispatch(setCurrentUserPdfs(null))
        }
     }
      fetchUserUploads()
    },[userData,allPdfs])
}

export default getCurrentUserUploads