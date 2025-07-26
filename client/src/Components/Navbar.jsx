import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // --- STYLE HELPERS ---

 
  const linkClass = ({ isActive }) =>
    `py-2 px-3 block rounded-md text-sm font-medium transition duration-200 ${
      isActive ? "bg-gray-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`;


  const authButtonClass = ({ isActive }) =>
    `font-bold py-2 px-4 rounded-md transition duration-300 text-sm ${
      isActive
        ? "bg-blue-600 text-white cursor-default" 
        : "text-blue-600 border border-blue-600 hover:bg-blue-50" 
    }`;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold text-blue-600">
            MyApp
          </NavLink>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/about" className={linkClass}>
                    About
                  </NavLink>
                  <NavLink to="/contact" className={linkClass}>
                    Contact
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (

                <>
                  <NavLink to="/login" className={authButtonClass}>
                    Log In
                  </NavLink>
                  <NavLink to="/signup" className={authButtonClass}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left block py-2 px-3 rounded-md font-bold bg-red-100 text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            // 3. UPDATED: Show both actions in the mobile menu as well
            <>
              <NavLink
                to="/login"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
