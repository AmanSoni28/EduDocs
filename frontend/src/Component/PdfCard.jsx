
import { FaFilePdf, FaEye, FaDownload } from "react-icons/fa";

const PdfCard = ({ pdf }) => {
  const handlePreview = () => {
  if (!pdf.fileUrl) return;
  
  // Don't modify the URL, just open it as-is first to test
  window.open(pdf.fileUrl, "_blank");
};

const handleDownload = () => {
  if (!pdf.fileUrl) return;
  
  console.log('Download URL:', pdf.fileUrl); // Debug
  
  const link = document.createElement("a");
  link.href = pdf.fileUrl; // Use original URL first for testing
  link.setAttribute("download", `${pdf.subject || 'document'}.pdf`); 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition duration-300 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Icon */}
        <div className="flex items-center gap-3 mb-3">
          <FaFilePdf className="text-red-500 text-2xl" />
          <h3 className="text-lg font-semibold text-gray-800">
            {pdf.subject}
          </h3>
        </div>

        {/* Details */}
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Class:</span> {pdf.className}</p>
          <p><span className="font-medium">School:</span> {pdf.school}</p>
          {pdf.uploadedBy && (
            <p>
              <span className="font-medium">Uploaded by:</span>{" "}
              {pdf.uploadedBy.name}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handlePreview}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <FaEye />
          Preview
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FaDownload />
          Download
        </button>
      </div>
    </div>
  );
};

export default PdfCard;