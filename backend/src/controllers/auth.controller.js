import { User } from "../models/user.model.js";
import getToken from "../config/token.js";
import bcrypt from 'bcryptjs'


const signUp= async (req,res)=>{
try {
    const {name,email,password,role}=req.body
    
    if([name,email,password,role].some((field) => field?.trim() === "")){                       
      return res.status(500).json({message:`All fields are required`}) 
   }

    if(password.length<8){
        return res.status(400).json({message: "Password must be at least 8 characters"})
    }
    
    const existingUser = await User.findOne({email})
    
    if(existingUser){
      return res.status(409).json({message:"User with this email already exists"})
    }

    const createdUser=await User.create({
        name,
        email,
        password,
        role
    })

    const user= await User.findById(createdUser._id).select("-password")

    const token = await getToken(user._id)

    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }

    return res.
    status(201).
    cookie("token",token,options)
    .json({user, message:"User Signup Successfully"})

} catch (error) {
    return res.status(500).json({message:`SighUp error :${error}`})
}
}


const logIn = async(req,res)=>{
try {
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const getUser = await User.findOne({email})

    if(!getUser){
        return res.status(400).json({message: "Email not found"})
    }

    const isPasswordCorrect =await bcrypt.compare(password,getUser.password)    

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password"})
    }

    const user= await User.findById(getUser._id).select("-password")
    
    const token = await getToken(user._id)

    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }

    return res.
    status(200).
    cookie("token",token,options)
    .json({user, message:"User LogIn Successfully"})

} catch (error) {
    return res.status(500).json({message:`LogIn error :${error}`})
}
}

const logOut = async(req,res)=>{
try {
    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    }
    return res.
    status(200)
    .clearCookie("token",options)
    .json({message:`LogOut Successfully`}) 
} catch (error) {
    return res.status(500).json({message:`LogOut error :${error}`})
}
}

const changePassword = async (req, res) => {
  try {
    const userId = req.userId; // from isAuth middleware
    const { oldPassword, newPassword } = req.body;

    // 1. Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    // 2. Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    // 4. Update password
    user.password = newPassword;
    await user.save(); 
    // pre("save") middleware will hash password automatically

    return res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: `Change password error: ${error.message}`,
    });
  }
};

export { signUp, logIn, logOut, changePassword }

