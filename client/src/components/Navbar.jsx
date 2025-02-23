import { FaUserCircle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import React, { useState } from "react";
import Logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authenticatedUser, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-yellow-400 p-4 shadow-lg relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <div className="relative">
          {authenticatedUser ? (
            <>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"
              >
                <FaUserCircle className="text-3xl cursor-pointer hover:text-yellow-300 transition-all" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 text-white rounded-lg shadow-lg overflow-hidden border border-yellow-500">
                  <ul className="py-2">
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                    >
                      Profile
                    </Link>
                    <li className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer">
                      Settings
                    </li>
                    <li
                      onClick={logout}
                      className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="https://www.linkedin.com/in/thesumitkpandey/">
              <FaLinkedin className="text-3xl cursor-pointer hover:text-blue-500 transition-all" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
