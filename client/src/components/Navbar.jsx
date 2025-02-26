import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import useChatStore from "../store/useChatStore";

const Navbar = () => {
  const { authenticatedUser, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black backdrop-blur-md text-yellow-400 p-2 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="h-14 w-auto" />
        </div>

        {/* User Profile Section OR LinkedIn Link */}
        <div className="relative">
          {authenticatedUser ? (
            <>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none flex items-center transition-transform hover:scale-105"
              >
                {authenticatedUser?.profilePicture ? (
                  <img
                    src={authenticatedUser.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md cursor-pointer"
                  />
                ) : (
                  <FaUserCircle className="text-4xl cursor-pointer hover:text-yellow-300" />
                )}
              </button>

              {/* Profile Menu */}
              <div
                ref={menuRef}
                className={`absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-md text-white rounded-lg shadow-lg border border-yellow-400/20 transform transition-all duration-200 ${
                  menuOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-yellow-400/20">
                  <div className="flex items-center space-x-3">
                    {authenticatedUser?.profilePicture ? (
                      <img
                        src={authenticatedUser.profilePicture}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border border-yellow-400"
                      />
                    ) : (
                      <FaUserCircle className="text-4xl text-yellow-400" />
                    )}
                    <div>
                      <p className="text-yellow-300 font-semibold">
                        {authenticatedUser?.name || "User"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {authenticatedUser?.email || "example@email.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <ul className="py-2">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-yellow-400/10 hover:text-yellow-300 transition-all"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/settings"
                    className="block px-4 py-2 hover:bg-yellow-400/10 hover:text-yellow-300 transition-all"
                  >
                    Settings
                  </Link>
                  <li
                    onClick={logout}
                    className="block px-4 py-2 hover:bg-red-500/20 hover:text-red-400 cursor-pointer transition-all"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-all"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
