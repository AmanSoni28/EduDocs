import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {

  const {userData}=useSelector((state)=>state.user)

  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-30">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">EduDocs</h2>
          <p className="mt-3 text-sm text-gray-400">
            EduDocs is a platform where academies upload study materials and
            students can search and access PDFs easily and quickly.
          </p>
        </div>

        {/* Quick Links */}
        <div >
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white transition">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition">
                Search PDFs
              </Link>
            </li>
            {userData?.role==='academy' &&
            <li>
              <Link to="/upload" className="hover:text-white transition">
                Upload PDF
              </Link>
            </li>}
            <li>
              <Link to="/change-password" className="hover:text-white transition">
                Change Password
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/AmanSoni28"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/aman-soni-89a726331/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:amansoni0228@email.com"
              className="hover:text-white transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} EduDocs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
