import React, { useEffect, useState } from "react";

interface Rating {
  Source: string;
  Value: string;
}

interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  imdbRating: string;
  BoxOffice: string;
  Response: string;
}

const MovieCard: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=f2d27b97`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-[300px] flex justify-center items-center bg-gray-900 rounded-xl shadow-md">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="text-red-500 text-center p-8 bg-gray-800 rounded-xl shadow-md">
        Failed to load movie data.
      </div>
    );
  }

  return (
    <div className="max-w-full text-white flex items-center justify-center m-2">
      <div className=" max-w-5xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-purple-900/30 group">
        {/* Poster */}
        <div className="col-span-1 flex justify-center items-start relative overflow-hidden">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded-lg w-full max-w-xs object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
          />
          {/* IMDb badge */}
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
              ⭐ {movie.imdbRating}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-3xl font-bold">
            {movie.Title}{" "}
            <span className="text-gray-400 text-xl">({movie.Year})</span>
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">{movie.Plot}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-gray-400">Genre:</span>{" "}
              {movie.Genre}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Runtime:</span>{" "}
              {movie.Runtime}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Released:</span>{" "}
              {movie.Released}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Director:</span>{" "}
              {movie.Director}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Writer:</span>{" "}
              {movie.Writer}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Actors:</span>{" "}
              {movie.Actors}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Language:</span>{" "}
              {movie.Language}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Country:</span>{" "}
              {movie.Country}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Box Office:</span>{" "}
              {movie.BoxOffice}
            </div>
            <div>
              <span className="font-semibold text-gray-400">Awards:</span>{" "}
              {movie.Awards}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-300 mb-1">Ratings:</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              {movie.Ratings.map((rating, index) => (
                <li key={index}>
                  <span className="text-purple-300">{rating.Source}:</span>{" "}
                  {rating.Value}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`https://www.imdb.com/title/${movieId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View on IMDB
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
