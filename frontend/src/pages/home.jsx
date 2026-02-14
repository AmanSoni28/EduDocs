import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import {toast} from "react-hot-toast"
import axios from "axios";
import { serverUrl } from "../main.jsx";
import bg from "/Edu_home.png"
import Nav from "../Component/Nav.jsx";
import Footer from "../Component/Footer.jsx";

const Home = () => {
  const navigate = useNavigate();
  const {userData} = useSelector((state)=>state.user)

  return (
    <div className="min-h-screen">
     <div className="min-h-screen  py-8"
     style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
     >

      <Nav/>
    
      {/* Welcome Section */}
      <div className="text-center mb-8 mt-30">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {userData?.name || "User"}
        </h2>
        <p className="text-gray-500 mt-2">
          Manage your educational PDFs easily
        </p>
      </div>

      {/* Role Based Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* Academy Dashboard */}
        {userData?.role === "academy" && (
          <>
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">
                Upload PDF
              </h3>
              <p className="text-gray-500 mb-4">
                Upload subject PDFs for students
              </p>
              <button
                onClick={() => navigate("/upload")}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Go to Upload
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">
                All Uploads
              </h3>
              <p className="text-gray-500 mb-4">
                View All uploaded PDFs
              </p>
              <button
                onClick={() => navigate("/allpdfs")}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                View PDFs
              </button>
            </div>
          </>
        )}

        {/* Student Dashboard */}
        {userData?.role === "student" && (
          <>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              Search PDFs
            </h3>
            <p className="text-gray-500 mb-4">
              Find PDFs by subject, class, or school
            </p>
            <button
              onClick={() => navigate("/search")}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Search Now
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">
                All Uploads
              </h3>
              <p className="text-gray-500 mb-4">
                View All uploaded PDFs
              </p>
              <button
                onClick={() => navigate("/allpdfs")}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                View PDFs
              </button>
            </div>
            </>
          
        )}

      </div>
    </div>
      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;