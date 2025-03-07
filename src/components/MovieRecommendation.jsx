import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";
import { FaRegSadCry } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const TMDB_API_KEY = "54214450cfd78a5c89247ee674fb2b22";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

function MovieRecommendation() {
  const { watchlist } = useContext(MovieContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      if (watchlist.length === 0) return;
      setLoading(true);
      setError(null);

      try {
        const genres = watchlist.map((movie) => movie.genre_ids || []).flat();
        const uniqueGenres = [...new Set(genres)];
        
        let mostCommonGenre = null;
        if (uniqueGenres.length > 0) {
          const genreCounts = {};
          genres.forEach((genre) => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
          mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
            genreCounts[a] > genreCounts[b] ? a : b
          );
        }

        let tmdbMovies = [];
        
        if (mostCommonGenre) {
          const response = await fetch(
            `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${mostCommonGenre}&page=1`
          );
          if (!response.ok) throw new Error("Failed to fetch from TMDb API");
          const data = await response.json();
          tmdbMovies = data.results.slice(0, 8);
        } else {
          const response = await fetch(
            `${TMDB_API_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=1`
          );
          if (!response.ok) throw new Error("Failed to fetch from TMDb API");
          const data = await response.json();
          tmdbMovies = data.results.slice(0, 8);
        }

        const formattedRecommendations = tmdbMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          fullPosterPath: movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
            : null,
          rating: movie.vote_average,
        }));

        setRecommendations(formattedRecommendations);
      } catch (err) {
        setError("Failed to get recommendations. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [watchlist]);

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <MdMovie className="text-6xl text-gray-500 mb-4" />
        <h2 className="text-2xl font-semibold">Your watchlist is empty!</h2>
        <p className="text-gray-400 mt-2">Add some movies to get recommendations.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Recommended Movies 🎬</h2>

      {loading && (
        <div className="flex justify-center items-center mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-md text-center flex items-center justify-center gap-2 w-full max-w-lg mx-auto shadow-md">
          <FaRegSadCry className="text-xl" /> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[250px] rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl bg-gray-100 dark:bg-gray-800"
              >
                {movie.fullPosterPath ? (
                  <img
                    src={movie.fullPosterPath}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${TMDB_IMAGE_BASE_URL}/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`;
                    }}
                  />
                ) : (
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
                    <MdMovie className="text-4xl text-gray-400" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate text-gray-900 dark:text-yellow-400 transition-all duration-300">
                    {movie.title}
                  </h3>
                  <p className="text-yellow-500 font-semibold">⭐ {movie.rating.toFixed(1)}/10</p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieRecommendation;
