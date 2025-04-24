import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-900 px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Swift Logo"
          />
          <span className="text-2xl font-semibold text-white">Swift-Chat</span>
        </Link>

        {/* Hamburger Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 md:hidden hover:text-white"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden w-full md:flex md:w-auto gap-6" id="navbar-default">
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="text-white hover:text-indigo-400 py-2 px-3"
          >
            {isAuthenticated ? "Home" : "Login"}
          </Link>
          <Link
            to="#"
            className="text-white hover:text-indigo-400 py-2 px-3"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
