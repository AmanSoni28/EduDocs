import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../main.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserPdfs } from "../redux/userSlice.js";
import { setAllPdfs } from "../redux/userSlice.js"; 


const EditPdf = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {currentUserPdfs}=useSelector((state)=>state.user)  
  const dispatch=useDispatch()

  const [formData, setFormData] = useState({
    subject: "",
    className: "",
    school: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const pdf = currentUserPdfs?.find((p) => p._id === id);

  useEffect(() => {
  if (pdf) {
    setFormData({
      subject: pdf.subject,
      className: pdf.className,
      school: pdf.school,
    });
  }
}, [pdf]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("subject", formData.subject);
    data.append("className", formData.className);
    data.append("school", formData.school);

    if (file) {
      data.append("fileUrl", file);
    }

    try {
      setLoading(true);

      const res = await axios.patch(`${serverUrl}/api/pdf/update/${id}`, data, { withCredentials: true });
      
      toast.success(res.data.message);
      
      const updatedPdfs = currentUserPdfs?.map((p) => p._id === id ? res.data.pdf : p);
      dispatch(setCurrentUserPdfs(updatedPdfs));

      const updatedAllPdfs = currentUserPdfs?.map((p) => p._id === id ? res.data.pdf : p);
      dispatch(setAllPdfs(updatedAllPdfs));

      navigate("/my-uploads");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this PDF?");
  if (!confirmDelete) return;

  try {
    setDelLoading(true);

    const res = await axios.delete(
      `${serverUrl}/api/pdf/delete/${id}`,
      { withCredentials: true }
    );

    toast.success(res.data.message);

    // Update currentUserPdfs
    const updatedUserPdfs = currentUserPdfs.filter((p) => p._id !== id);
    dispatch(setCurrentUserPdfs(updatedUserPdfs));

    // Update allPdfs
    const updatedAllPdfs = updatedUserPdfs.filter((p) => p._id !== id);
    dispatch(setAllPdfs(updatedAllPdfs));

    navigate("/my-uploads");
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  } finally {
    setDelLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 relative">

        {/* Back */}
        <FaArrowLeft
          className="absolute left-5 top-5 cursor-pointer text-gray-600 hover:text-black"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit PDF
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Subject */}
          <div>
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Class */}
          <div>
            <label className="text-sm font-medium">Class</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* School */}
          <div>
            <label className="text-sm font-medium">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* File (optional) */}
          <div>
            <label className="text-sm font-medium">
              Replace PDF (optional)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
           <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
           >
            {loading ? "Updating..." : "Update PDF"}
           </button>

           <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
           >
            {delLoading ? "Deleting..." : "Delete PDF"}
           </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPdf;
