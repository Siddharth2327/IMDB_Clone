import React, { useContext, useState, useEffect } from "react";
import genrearr from "../utilities/genre.js";
import { MovieContext } from "./MovieContext.jsx";

function Watchlist() {
  const { watchlist, setWatchlist } = useContext(MovieContext);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currgenre, setCurrGenre] = useState("All Genre");
  const [removing, setRemoving] = useState({}); // Track removing movies

  useEffect(() => {
    let temp = watchlist.map((movie) => genrearr[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenreList(["All Genre", ...temp]);
  }, [watchlist]);

  const sortAsc = () => {
    const sortedWatchList = [...watchlist].sort((a, b) => b.vote_average - a.vote_average);
    setWatchlist(sortedWatchList);
    localStorage.setItem("movies", JSON.stringify(sortedWatchList));
  };

  const sortDesc = () => {
    const sortedWatchList = [...watchlist].sort((a, b) => a.vote_average - b.vote_average);
    setWatchlist(sortedWatchList);
    localStorage.setItem("movies", JSON.stringify(sortedWatchList));
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
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="p-6 pb-2">
        {/* Genre Filters */}
        <div className="flex flex-wrap justify-center gap-7 my-4">
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

        {/* Search Bar */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search Movies"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="h-[3rem] w-[25rem] p-2 bg-gray-200 dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-[1.2rem] transition-colors duration-300"
          />
        </div>
      </div>

      {/* Movie Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[1.4rem] font-serif transition-colors duration-300">
            <tr>
              <th className="text-red-800 dark:text-yellow-400 px-6 py-4 text-center">Name</th>
              <th className="text-red-800 dark:text-yellow-400 px-6 py-4 text-center">
                <span onClick={() => sortAsc()} className="cursor-pointer">
                  &#x2191;
                </span>
                Ratings
                <span onClick={() => sortDesc()} className="cursor-pointer">
                  &#x2193;
                </span>
              </th>
              <th className="text-red-800 dark:text-yellow-400 px-6 py-4 text-center">Popularity</th>
              <th className="text-red-800 dark:text-yellow-400 px-6 py-4 text-center">Genre</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="text-[1.2rem]">
            {watchlist
              .filter((movieobj) => currgenre === "All Genre" || currgenre === genrearr[movieobj.genre_ids[0]])
              .filter((movieobj) => movieobj.title.toLowerCase().includes(search.toLowerCase()))
              .map((movieobj) => (
                <tr
                  key={movieobj.id}
                  className={`border-b-2 border-gray-300 dark:border-gray-700 transition-all duration-500 ${
                    removing[movieobj.id] ? "opacity-0 translate-x-10" : "opacity-100"
                  }`}
                >
                  <td className="px-6 py-4 flex items-center space-x-4 text-gray-900 dark:text-white">
                    <img className="h-[11rem] w-[8rem]" src={`https://image.tmdb.org/t/p/original${movieobj.poster_path}`} alt="Movie" />
                    <div>{movieobj.title}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{movieobj.vote_average}</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{movieobj.popularity}</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{genrearr[movieobj.genre_ids[0]]}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      onClick={() => handleRemove(movieobj.id)}
                      className="cursor-pointer text-red-500 dark:text-yellow-400 hover:text-red-800 dark:hover:text-yellow-600 transition-all duration-300"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;
