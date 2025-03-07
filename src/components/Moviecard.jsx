import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from './MovieContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookmark, FaCheck } from 'react-icons/fa';

function Moviecard({ movieObject }) {
  const { watchlist, handleAddToWatchlist, setWatchlist } = useContext(MovieContext);
  
  // State to trigger animation after refresh
  const [animate, setAnimate] = useState(false);

  // Run animation effect when component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Check if the movie is in the watchlist
  function doesContains() {
    return watchlist.some(movie => movie.id === movieObject.id);
  }

  // Remove movie from watchlist
  const handleRemoveOnTick = (movieId) => {
    let updatedWatchList = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchList);
    localStorage.setItem('movies', JSON.stringify(updatedWatchList));
  };

  return (
    <div className="space-y-1 m-3 hover:scale-105 transition duration-300 ease-in-out transform">
      
      {/* Movie Poster */}
      <div
        className="w-[180px] h-[36vh] bg-cover ml-3 rounded-lg relative hover:border border-gray-400 shadow-lg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObject.poster_path})`
        }}
      >
        {/* Animated Watchlist Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1.2, opacity: 1 } : {}}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          onClick={() => doesContains() ? handleRemoveOnTick(movieObject.id) : handleAddToWatchlist(movieObject)}
          title={doesContains() ? "Remove from Watchlist" : "Add to Watchlist"}
          className="absolute top-2 right-2 cursor-pointer p-2"
        >
          <AnimatePresence mode="wait">
            {doesContains() ? (
              <motion.div
                key={`watchlist-${movieObject.id}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <FaCheck className="text-yellow-400 text-[1.5rem]" />
              </motion.div>
            ) : (
              <motion.div
                key={`bookmark-${movieObject.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FaBookmark className="text-gray-400 hover:text-yellow-400 text-[1.5rem]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    {/* Movie Name & Rating - Adjusted Closer to the Card */}
        <div className="w-[180px] flex justify-center items-center px-2 pt-0 mb-6">
            <div className="relative w-[70%] overflow-hidden ml-2">
                <p
                    className="text-sm font-semibold dark:text-yellow-400 text-red-600 inline-block leading-tight"
                    style={{
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        animation: movieObject.title.length > 15 ? "marquee 10s linear infinite" : "none",
                        paddingRight: "10px" // Adjusted padding
                }}
            >
                {movieObject.title}
            </p>
            <br />
            <span className="text-xs text-gray-500 " >{movieObject.release_date?.split("-")[0]}</span> {/* Adjusted padding */}
        </div>

        {/* Rating */}
        <div className="text-xs font-medium dark:text-yellow-400 text-red-600">
          ⭐ {movieObject.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

    </div>
  );
}

export default Moviecard;

// we use props title and posterUrl to update the movie cards,
// instead of these getting props seperately we are passing the moviesObj as a prop directly
// we cant use the url we get from  the api directly so we add an absolute path to get the image
// aboslute path we needed => https://image.tmdb.org/t/p/original/

// we dont need to add the movie to watchlist when we click on tick button (doesContain function is true)