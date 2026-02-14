import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { serverUrl } from "../main.jsx";
import toast from "react-hot-toast";
import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import bgImage from "/Edu_bg.png"

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const [loading, setLoading] = useState(false);
  const [show,setShow] = useState(false)

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, formData, {
        withCredentials: true
      });
      const data = result.data;
      dispatch(setUserData(data.user))
      toast.success(data.message || "Login successful!");
      
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative"
     style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    >
        
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        {/* Title */}
        <div className="flex justify-center mb-6">
          <div className="bg-black p-3 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Please enter your details to login</p>
        </div>      
    

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={show?"text":"password"}
              name="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              required
            />
            <span className="absolute top-8 right-4 text-gray-500 font-semibold cursor-pointer"
                onClick={()=>setShow((prev)=>!prev)}>{show?<IoIosEye className="size-6"/>:<IoMdEyeOff className="size-6"/>}
              </span>
          </div>


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Want to create a new account?{" "}
          <Link to="/signup" className="text-gray-600 font-bold hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


