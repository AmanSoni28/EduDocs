import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";


const MyUploads = () => {
  const navigate = useNavigate();

  // Redux state
  const { currentUserPdfs } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <FaArrowLeft className="size-6" onClick={()=>navigate('/')}/>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Uploaded PDFs
        </h2>

        {currentUserPdfs?.length === 0 ? (
          <p className="text-center text-gray-500">
            No uploads found
          </p>
        ) : (
          <div className="space-y-3">

            {currentUserPdfs?.map((pdf) => (
              <div
                key={pdf._id}
                className="flex items-center justify-between border rounded-lg px-5 py-4 hover:shadow-md transition bg-gray-50"
              >
                {/* Left Side Info */}
                <div className="flex-1 grid md:grid-cols-3 gap-2 text-sm">

                  <div>
                    <p className="font-semibold text-gray-700">Subject</p>
                    <p className="text-gray-600">{pdf.subject}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">Class</p>
                    <p className="text-gray-600">{pdf.className}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">School</p>
                    <p className="text-gray-600">{pdf.school}</p>
                  </div>

                </div>

                {/* Right Side Edit Arrow */}
                <button
                  onClick={() => navigate(`/edit-pdf/${pdf._id}`)}
                  className="ml-4 p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  <FaEdit />
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyUploads;