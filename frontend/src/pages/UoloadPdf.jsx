import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import bgImage from '/Edu_Upload.png'
import { useDispatch, useSelector } from "react-redux";
import { setAllPdfs } from "../redux/userSlice.js";

const UploadPdf = () => {
  const [formData, setFormData] = useState({
    subject: "",
    className: "",
    school: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {allPdfs}=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error("Please select a PDF file");
    }

    const data = new FormData();
    data.append("subject", formData.subject);
    data.append("className", formData.className);
    data.append("school", formData.school);
    data.append("fileUrl", file);           // IMPORTANT: field name must be "file"

    try {
      setLoading(true);

      const res = await axios.post(`${serverUrl}/api/pdf/upload`, data, {withCredentials: true});
      toast.success(res.data.message);
      dispatch(setAllPdfs([res.data.pdf, ...allPdfs]));


      // Reset form
      setFormData({
        subject: "",
        className: "",
        school: ""
      });
      setFile(null);

      navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
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

    <div className="relative w-full max-w-[500px] bg-white shadow-2xl rounded-3xl p-4 md:p-6 border border-gray-100">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 text-gray-600 hover:text-black transition cursor-pointer">
        <FaArrowLeft className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold text-gray-800">
          Upload PDF
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add study material for students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Mathematics"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="e.g. 10th"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* School */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="School Name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload PDF
          </label>

          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-black transition">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full cursor-pointer"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Only PDF files allowed
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-70 cursor-pointer"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
    </div>
  </div>
);
};

export default UploadPdf;