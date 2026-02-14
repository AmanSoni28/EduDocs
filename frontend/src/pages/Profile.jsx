import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import bgImage from '/Edu_Upload.png'


const Profile = () => {
  const {userData}=useSelector((state)=>state.user)
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative"
         style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        >
      <div className="bg-white p-8 rounded-2xl max-w-xl shadow-md w-full relative">
        <div className="flex flex-col items-center text-center "> 
         <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center text-[40px] bg-gray-200 cursor-pointer mx-auto">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
           <h2 className="text-2xl mt-4 font-bold text-gray-800">{userData?.name || "User Name"}</h2>
            <p className="text-gray-500 text-sm">{userData?.role}</p>
        </div>

        <div className="flex flex-col mt-6 ">
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-800 mb-2">Email: </span>
            <span className="text-gray-600">{userData?.email}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-gray-800 mb-2">Password: </span>
            <span className="text-gray-600">xxxxxxxxxx</span>
          </div>

  
  
        </div>

        <div className="flex justify-center items-center gap-4 my-6 ">
          <button onClick={()=>navigate('/change-password')}
          className=" bg-black text-white font-bold px-5 py-2 rounded-xl active:bg-[#4b4b4b] cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95">Change Password</button>
        </div>

        <div className="absolute top-8 left-6 text-gray-500 hover:text-gray-800 cursor-pointer" onClick={()=>navigate('/')}>
          <FaArrowLeft className="size-6"/>
        </div>
      </div>
    </div>  
  );
};

export default Profile
