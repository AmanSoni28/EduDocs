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

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
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
      const result = await axios.post(`${serverUrl}/api/auth/signup`, formData, {
        withCredentials: true
      });
      const data = result.data;

      dispatch(setUserData(data.user))

      toast.success(data.message || "Signup successful!");
      
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Please try again.");
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
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

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

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="student">Student</option>
              <option value="academy">Academy</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;