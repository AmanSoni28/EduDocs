import PdfCard from "../Component/PdfCard.jsx";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";

const AllPdfs = () => {
  const {allPdfs}=useSelector((state)=>state.user)
  const navigate=useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
  
      <FaArrowLeft className=" w-4 h-4 " onClick={()=>navigate('/')}/>
      
      <h2 className="text-2xl font-bold mb-6 text-center">
        All PDFs
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allPdfs.map((pdf) => (
          <PdfCard key={pdf._id} pdf={pdf} />
        ))}
      </div>
    </div>
  );
};

export default AllPdfs;