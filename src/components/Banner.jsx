import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Fetch movies when component mounts
  useEffect(() => {
    async function fetchTrendingMovies() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=54214450cfd78a5c89247ee674fb2b22&language=en-US&page=1`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched movies:", data.results); 
        
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 8)); // Display only first 8 trending movies
        } else {
          setError("No movies found in the API response");
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

  // Auto-scroll functionality
  const nextSlide = useCallback(() => {
    if (movies.length > 0) {
      setScrollIndex(prevIndex => {
        // If we're at the last slide, go back to first slide
        if (prevIndex >= movies.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }
  }, [movies.length]);

  // Set up and clear the timer
  useEffect(() => {
    // Don't start the timer if loading, has error, or is manually paused
    if (isLoading || error || isPaused || movies.length <= 1) {
      return;
    }

    // Set up the timer to change slides every 5 seconds
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    // Clean up the timer when component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isLoading, error, isPaused, movies.length, nextSlide]);

  // Manual scroll functions - these will also pause auto-scrolling temporarily
  const scrollLeft = () => {
    // Pause auto-scrolling temporarily
    setIsPaused(true);
    setScrollIndex((prev) => Math.max(prev - 1, 0));
    
    // Resume auto-scrolling after 10 seconds of inactivity
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const scrollRight = () => {
    // Pause auto-scrolling temporarily
    setIsPaused(true);
    setScrollIndex((prev) => Math.min(prev + 1, movies.length - 1));
    
    // Resume auto-scrolling after 10 seconds of inactivity
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // Mouse enter/leave handlers
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-gray-700 dark:text-gray-300">Loading trending movies...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-red-500 max-w-md text-center p-4">
          Error loading movies: {error}
        </div>
      </div>
    );
  }

  // No movies state
  if (movies.length === 0) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl text-gray-700 dark:text-gray-300">No trending movies available right now.</div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[65vh] md:h-[70vh] lg:h-[75vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scrollable Movies Container */}
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
            {/* Background Image */}
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

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 dark:bg-black/50"></div>

            {/* Movie Details Box */}
            <div className="absolute bottom-16 left-10 max-w-xl p-6 rounded-lg shadow-2xl backdrop-blur-md bg-white/80 dark:bg-black/75 transition-all duration-500">
              <h1 className="text-5xl font-extrabold text-red-500 dark:text-yellow-400">
                {movie.title}
              </h1>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
                {movie.overview ? (
                  `${movie.overview.substring(0, 180)}${movie.overview.length > 180 ? '...' : ''}`
                ) : (
                  "No description available"
                )}
              </p>
              <p className="mt-2 font-semibold text-lg text-yellow-600 dark:text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {movies.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollLeft}
            disabled={scrollIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={scrollRight}
            disabled={scrollIndex === movies.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <div 
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              scrollIndex === index ? "w-6 bg-white" : "bg-white/40"
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