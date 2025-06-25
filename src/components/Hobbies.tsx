
import React, { useState } from 'react';
import { Book, Film, Lightbulb, X } from 'lucide-react';

const Hobbies = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  const recentMovies = [
    { title: "Dark", year: "2017", genre: "Thriller" },
    { title: "Spiderman - across the spider verse", year: "2023", genre: "Adventure" },
    { title: "Spider-Man: No Way Home", year: "2021", genre: "Action" },
    { title: "Salaar - Ceasefire", year: "2023", genre: "Action ,adventure fiction" },
    { title: "Interstellar", year: "2014", genre: "Drama" }
  ];

  const recentBooks = [
    { title: "Shiva Triology", author: "Amish Tripathi", category: "Fiction" },
    { title: "Revolution 2020", author: "chetan Bhagat", category: "Fiction" },
    { title: "", author: "Kyle Simpson", category: "JavaScript" },
    { title: "Atomic Habits", author: "James Clear", category: "Self-Help" },
    { title: "The DevOps Handbook", author: "Gene Kim", category: "Technology" }
  ];

  const learning = [
    
  ];

  const hobbies = [
    {
      id: 'movies',
      title: 'Movies',
      icon: Film,
      description: 'Exploring storytelling',
      color: 'text-red-400'
    },
    {
      id: 'learning',
      title: 'Learning',
      icon: Lightbulb,
      description: 'Expanding knowledge',
      color: 'text-yellow-400'
    },
    {
      id: 'books',
      title: 'Reading',
      icon: Book,
      description: 'Technical & fiction',
      color: 'text-blue-400'
    }
  ];

  const openPopup = (hobbyId: string) => {
    if (hobbyId === 'movies' || hobbyId === 'books') {
      setActivePopup(hobbyId);
    }
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleHobbyClick = (hobbyId: string) => {
    setExpandedHobby(expandedHobby === hobbyId ? null : hobbyId);
    if (hobbyId === 'movies' || hobbyId === 'books') {
      openPopup(hobbyId);
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 font-mono terminal-glow">
            ~/hobbies
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            <span className="text-green-400">$</span> ls -la interests/
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbies.map((hobby) => {
            const IconComponent = hobby.icon;
            const isExpanded = expandedHobby === hobby.id;
            return (
              <div
                key={hobby.id}
                onClick={() => handleHobbyClick(hobby.id)}
                className={`group relative p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 cursor-pointer glow-hover backdrop-blur-sm ${
                  isExpanded ? 'z-50 scale-105 shadow-2xl shadow-green-500/20' : 'z-10'
                }`}
                style={{
                  zIndex: isExpanded ? 50 : 10
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-green-500/20">
                    <IconComponent className={`w-6 h-6 ${hobby.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">{hobby.title}</h3>
                    <p className="text-gray-400 text-sm font-mono">{hobby.description}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-green-400 font-mono text-xs opacity-50">
                    {hobby.id === 'movies' || hobby.id === 'books' || hobby.id ==='learning' ? '[click]' : '[info]'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {activePopup === 'movies' && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
    <div className="bg-gray-900/95 rounded-lg border border-red-400/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-[10000]">
      <div className="p-6 z-[10001]">
        <div className="flex items-center justify-between mb-6 z-[10002]">
          <h3 className="text-xl font-bold text-red-400 font-mono flex items-center gap-3 z-[10003]">
            <Film className="w-5 h-5" />
            ~/movies/favourites
          </h3>
          <button
            onClick={closePopup}
            className="p-2 rounded hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="space-y-3">
          {recentMovies.map((movie, index) => (
            <div key={index} className="p-4 rounded bg-gray-800/50 border border-red-400/20 hover:border-red-400/40 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-mono font-semibold">{movie.title}</h4>
                  <p className="text-gray-400 font-mono text-sm">{movie.year}</p>
                </div>
                <span className="px-2 py-1 rounded text-xs bg-red-400/20 text-red-300 border border-red-400/30 font-mono">
                  {movie.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
        {activePopup === 'books' && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-gray-900/95 rounded-lg border border-blue-400/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-[10000]">
              <div className="p-6 z-[100001]">
                <div className="flex items-center justify-between mb-6 z-[10002]">
                  <h3 className="text-xl font-bold text-blue-400 font-mono flex items-center gap-3 z-[10003]">
                    <Book className="w-5 h-5" />
                    ~/books/favourites
                  </h3>
                  <button
                    onClick={closePopup}
                    className="p-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentBooks.map((book, index) => (
                    <div key={index} className="p-4 rounded bg-gray-800/50 border border-blue-400/20 hover:border-blue-400/40 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-mono font-semibold">{book.title}</h4>
                          <p className="text-gray-400 font-mono text-sm">by {book.author}</p>
                        </div>
                        <span className="px-2 py-1 rounded text-xs bg-blue-400/20 text-blue-300 border border-blue-400/30 font-mono">
                          {book.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hobbies;
