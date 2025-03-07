import React, { useContext, useState, useEffect } from "react";
import genrearr from "../utilities/genre.js";
import { MovieContext } from "./MovieContext.jsx";

function Watchlist() {
  const { watchlist, setWatchlist } = useContext(MovieContext);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currgenre, setCurrGenre] = useState("All Genre");
  const [removing, setRemoving] = useState({}); // Track removing movies
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order

  useEffect(() => {
    let temp = watchlist.map((movie) => genrearr[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenreList(["All Genre", ...temp]);
  }, [watchlist]);

  const toggleSort = () => {
    const sortedWatchList = [...watchlist].sort((a, b) => 
      sortOrder === "desc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average
    );
    setWatchlist(sortedWatchList);
    localStorage.setItem("movies", JSON.stringify(sortedWatchList));
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleRemove = (movieId) => {
    setRemoving((prev) => ({ ...prev, [movieId]: true })); // Trigger fade-out animation
    setTimeout(() => {
      const updatedWatchList = watchlist.filter((movies) => movies.id !== movieId);
      setWatchlist(updatedWatchList);
      localStorage.setItem("movies", JSON.stringify(updatedWatchList));
    }, 500); // Remove after animation ends
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* Genre Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setCurrGenre(genre)}
            className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
              currgenre === genre
                ? "bg-red-500 text-white dark:bg-yellow-400 dark:text-gray-900"
                : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search & Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Movies"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full md:w-1/2 h-10 p-2 bg-gray-200 dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md transition-colors duration-300"
        />

        <button 
          onClick={toggleSort} 
          className="mt-3 md:mt-0 px-4 py-2 bg-red-500 dark:bg-yellow-400 hover:bg-blue-600 text-white dark:text-gray-800 rounded-md transition">
          Sort by Ratings {sortOrder === "desc" ? "⬇️" : "⬆️"}
        </button>
      </div>

      {/* Movies Grid for Small Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist
          .filter((movie) => currgenre === "All Genre" || currgenre === genrearr[movie.genre_ids[0]])
          .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie) => (
            <div
              key={movie.id}
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-500 transform ${
                removing[movie.id] ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-red-500 dark:text-yellow-400">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">⭐ {movie.vote_average} | 🎭 {genrearr[movie.genre_ids[0]]}</p>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-3 block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Watchlist;
