import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../movieLogo.png";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

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
    <div className="text-gray-900 dark:text-white shadow-lg py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo & Title */}
      <div className="flex items-center space-x-4">
      <img
        className="w-[60px] h-[60px] rounded-full border-2 border-red-900 
                shadow-lg shadow-red-500/50 
                hover:shadow-red-500 hover:scale-110 transition-all duration-300"
        src={Logo}
        alt="Logo"
      />

        <h1 className="text-3xl font-bold font-serif text-red-500 dark:text-yellow-400">
          IMDb
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-xl">
        <Link
          to="/"
          className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300 font-medium"
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300 font-medium"
        >
          Watchlist
        </Link>
        <Link
          to="/recommend"
          className="hover:text-red-500 dark:hover:text-yellow-400 transition duration-300 font-medium"
        >
          Recommendations
        </Link>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full transition-all bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-300" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  );
}

export default Navbar;
