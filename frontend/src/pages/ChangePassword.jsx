import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import bgImage from '/Edu_Upload.png'

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.patch(`${serverUrl}/api/auth/change-password`,{ oldPassword, newPassword },{ withCredentials: true });

      toast.success(res.data.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
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
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        {/* Back Button */}
        <FaArrowLeft
          className="absolute left-5 top-5 cursor-pointer text-gray-600 hover:text-black"
          onClick={() => navigate(-1)}
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Old Password */}
          <div>
            <label className="text-sm font-medium">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              placeholder="Enter old password"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              placeholder="Confirm new password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
