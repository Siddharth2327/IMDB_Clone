import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=54214450cfd78a5c89247ee674fb2b22&language=en-US&page=1`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Fetched movies:", data.results);

        if (data.results?.length > 0) {
          setMovies(data.results.slice(0, 8)); 
        } else {
          setError("No movies found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  const nextSlide = useCallback(() => {
    if (movies.length > 0) {
      setScrollIndex((prevIndex) => (prevIndex >= movies.length - 1 ? 0 : prevIndex + 1));
    }
  }, [movies.length]);

  useEffect(() => {
    if (isLoading || error || isPaused || movies.length <= 1) return;

    timerRef.current = setInterval(nextSlide, 3000);

    return () => clearInterval(timerRef.current);
  }, [isLoading, error, isPaused, movies.length, nextSlide]);

  const scrollLeft = () => {
    setIsPaused(true);
    setScrollIndex((prev) => Math.max(prev - 1, 0));
    clearTimeout(timerRef.current);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const scrollRight = () => {
    setIsPaused(true);
    setScrollIndex((prev) => Math.min(prev + 1, movies.length - 1));
    clearTimeout(timerRef.current);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-gray-700 dark:text-gray-300">Loading trending movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-red-500 max-w-md text-center p-4">Error: {error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-gray-700 dark:text-gray-300">No trending movies available.</div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${scrollIndex * 100}vw)`,
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-screen h-full flex-shrink-0 bg-gray-200 dark:bg-gray-800"
          >
            {movie.backdrop_path ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              ></div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                <p className="text-gray-600 dark:text-gray-400">No image available</p>
              </div>
            )}

            <div className="absolute inset-0 bg-black/60 dark:bg-black/50"></div>

            <div className="absolute bottom-10 left-6 sm:left-10 max-w-[90%] sm:max-w-lg p-4 sm:p-6 rounded-lg shadow-2xl backdrop-blur-md bg-white/80 dark:bg-black/75 transition-all duration-500">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-500 dark:text-yellow-400">
                {movie.title}
              </h1>
              <p className="mt-2 sm:mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-lg">
                {movie.overview
                  ? `${movie.overview.substring(0, 150)}${movie.overview.length > 150 ? "..." : ""}`
                  : "No description available"}
              </p>
              <p className="mt-2 font-semibold text-lg text-yellow-600 dark:text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>
          </div>
        ))}
      </div>

      {movies.length > 1 && (
        <>
          <button
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollLeft}
            disabled={scrollIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollRight}
            disabled={scrollIndex === movies.length - 1}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-all ${
              scrollIndex === index ? "w-4 sm:w-6 bg-white" : "bg-white/40"
            }`}
            onClick={() => {
              setIsPaused(true);
              setScrollIndex(index);
              setTimeout(() => setIsPaused(false), 10000);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
