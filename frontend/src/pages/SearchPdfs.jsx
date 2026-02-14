import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import PdfCard from "../Component/PdfCard.jsx";
import toast from "react-hot-toast";

const SearchPdf = () => {
  const [filters, setFilters] = useState({
    subject: "",
    className: "",
    school: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const query = new URLSearchParams(filters).toString();
    //   console.log(query);

      const res = await axios.get(`${serverUrl}/api/pdf/search?${query}`,{ withCredentials: true });

      setResults(res.data.pdfs);

      if (res.data.pdfs.length === 0) {
        toast("No PDFs found");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      subject: "",
      className: "",
      school: ""
    });
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Search PDFs
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-lg rounded-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              name="subject"
              placeholder="Subject (e.g. Math)"
              value={filters.subject}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              name="className"
              placeholder="Class (e.g. 10)"
              value={filters.className}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              name="school"
              placeholder="School (e.g. DPS)"
              value={filters.school}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((pdf) => (
              <PdfCard key={pdf._id} pdf={pdf} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Search results will appear here
          </p>
        )}

      </div>
    </div>
  );
};

export default SearchPdf;
