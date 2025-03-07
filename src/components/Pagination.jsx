import React from "react";

function Pagination({ handlePrevious, handleNext, page }) {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-700 dark:bg-gray-800 text-white dark:text-yellow-400 rounded-full shadow-md hover:bg-gray-600 dark:hover:bg-yellow-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={page === 1}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <span className="mx-4 px-5 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md text-lg font-semibold">
        {page}
      </span>

      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-700 dark:bg-gray-800 text-white dark:text-yellow-400 rounded-full shadow-md hover:bg-gray-600 dark:hover:bg-yellow-500 hover:text-white transition-all duration-300"
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
