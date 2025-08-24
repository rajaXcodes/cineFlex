import React, { useState } from "react";
import { Search, Star, Award } from "lucide-react";
import recommendations from "../assets/recommendations";
import MovieCard from "./movie";

interface Movie {
  movieId: string;
  title: string;
  year: string;
  genre: string;
  overview?: string;
}

const CineFlex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const movieDatabase = recommendations as Record<
    string,
    { movie: Movie; recommendations: Movie[] }
  >;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = value.toLowerCase();
    const matches = Object.keys(movieDatabase)
      .filter((key) =>
        movieDatabase[key].movie.title.toLowerCase().includes(lower)
      )
      .slice(0, 6);

    setSuggestions(matches);
  };

  // inside handleSearch
  const handleSearch = async (searchKey?: string) => {
    const key = (searchKey || searchTerm).toLowerCase().trim();
    if (!key) return;

    setIsSearching(true);
    setIsLoading(true);

    const matchedEntry = Object.values(movieDatabase).find(
      (entry) => entry.movie.title.toLowerCase() === key
    );

    if (matchedEntry) {
      setSearchResults([...matchedEntry.recommendations]);
      setSearchTerm(matchedEntry.movie.title); // ✅ fill input with exact title
    } else {
      setSearchResults([]);
    }

    setSuggestions([]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4 animate-pulse">
              CineFlex
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover your next favorite movie with personalized
              recommendations
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-gray-900 rounded-full p-2 flex items-center shadow-2xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for movies e.g Jawan"
                  className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-400 focus:outline-none text-lg"
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  <Search
                    className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`}
                  />
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-20">
                  {suggestions.map((key) => (
                    <li
                      key={key}
                      onClick={() => {
                        const title = movieDatabase[key].movie.title;
                        setSearchTerm(title); // ✅ update input with clicked title
                        handleSearch(title); // ✅ run search
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-800 transition"
                    >
                      {movieDatabase[key].movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Results */}
        {isSearching && (
          <main className="container mx-auto px-6 pb-12">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                <p className="text-gray-400">
                  Finding amazing movies for you...
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Movies & Recommendations
                </h2>
                <div className="flex flex-col gap-2">
                  {searchResults.map((movie) => (
                    <MovieCard key={movie.movieId} movieId={movie.movieId} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-xl text-gray-400">
                  No movies found. Try searching for "Jawan"
                </p>
              </div>
            )}
          </main>
        )}

        {/* Welcome Section */}
        {!isSearching && (
          <div className="container mx-auto px-6 text-center py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-8xl mb-8 animate-bounce">🎬</div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to Your Personal Cinema
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Search for any movie and discover personalized recommendations
                tailored just for you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                  <Search className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                  <p className="text-gray-400">
                    Find movies instantly with our intelligent search system
                  </p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Expert Ratings</h3>
                  <p className="text-gray-400">
                    Get IMDB ratings and detailed movie information
                  </p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                  <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Recommendations
                  </h3>
                  <p className="text-gray-400">
                    Discover similar movies you'll love
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CineFlex;
