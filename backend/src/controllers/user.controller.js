import { uploadOnCloudinary } from "../config/cloudinary.js"
import { User } from "../models/user.model.js"

const getCurrentUser = async (req,res)=>{
try {
    const userId=req.userId

    const user=await User.findById(userId).select("-password")
    
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    return res.status(200).json(user)
} catch (error) {
    res.status(500).json({message: `getCurrent User Error ${error}`})
}
}

export {getCurrentUser} 