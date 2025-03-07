import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../movieLogo.png";
import { Sun, Moon, Menu, X } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img
            className="w-[50px] h-[50px] rounded-full border-2 border-red-900 
            shadow-lg shadow-red-500/50 
            hover:shadow-red-500 hover:scale-110 transition-all duration-300"
            src={Logo}
            alt="Logo"
          />
          <h1 className="text-3xl font-bold font-serif text-red-500 dark:text-yellow-400">
            IMDb
          </h1>
        </div>

        {/* Navigation Links (Hidden on Small Screens) */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link to="/watchlist" className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300">
            Watchlist
          </Link>
          <Link to="/recommend" className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300">
            Recommendations
          </Link>
        </div>

        {/* Dark Mode & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-all bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800 dark:text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Appears when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <Link
            to="/"
            className="block text-lg py-2 hover:text-red-500 dark:hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="block text-lg py-2 hover:text-red-500 dark:hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Watchlist
          </Link>
          <Link
            to="/recommend"
            className="block text-lg py-2 hover:text-red-500 dark:hover:text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Recommendations
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
