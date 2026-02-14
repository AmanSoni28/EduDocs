import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setAllPdfs } from "../redux/userSlice.js"


const getAllPdfs=()=>{
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.user)
    useEffect(()=>{
     const fetchAllPdfs=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/pdf/getallpdfs`,{withCredentials:true})
            dispatch(setAllPdfs(result.data))
        } catch (error) {
            console.log("getAllPdfs error:",error);
            dispatch(setAllPdfs(null))
        }
     }
      fetchAllPdfs()
    },[userData])
}

export default getAllPdfs