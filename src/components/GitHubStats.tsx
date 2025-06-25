import React, { useState, useEffect } from 'react';
import { Github, Star, Search, User, Calendar } from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

const GitHubStats = () => {
  const [username, setUsername] = useState("raptor7197");
  const [inputUsername, setInputUsername] = useState("raptor7197");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (user: string) => {
    if (!user.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userResponse = await fetch(`https://api.github.com/users/${user}`);
      if (!userResponse.ok) {
        throw new Error('User not found');
      }
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=7`);
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const reposData = await reposResponse.json();
      setRepositories(reposData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUserData(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, [username]);

  const handleSearch = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  // const totalcommits= repositories.reduce((sum,repo ))=> sum+repo.commits,0);


  return (
    <>
    <section className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-green-400 font-mono terminal-glow">
            ~/github-stats
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm">
            <span className="text-green-400">$</span> git log --oneline --graph
          </p>
        </div>

        <div className="">
          {/* <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-mono text-xs sm:text-sm ml-4"></span>
          </div> */}
          
          <div className="flex gap-2">
            
            {/* <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded text-green-400 font-mono text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50"
            >
             
            </button> */}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-400 font-mono text-sm">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="text-green-400 font-mono">Loading...</div>
          </div>
        ) : userData ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="group relative p-3 sm:p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 glow-hover backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-2 sm:mb-4 flex justify-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-green-500/20">
                      <Github className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl  text-white font-sans mb-1 sm:mb-2">
                     Repositories 
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">
                     {userData.public_repos}
                  </div>
                </div>
              </div>

              <div className="group relative p-3 sm:p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 glow-hover backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-2 sm:mb-4 flex justify-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-green-500/20">
                      <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono mb-1 sm:mb-2">
                    {totalStars}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">
                    Total Stars
                  </div>
                </div>
              </div>

              <div className="group relative p-3 sm:p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 glow-hover backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-2 sm:mb-4 flex justify-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-green-500/20">
                      <User className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-sans text-white  mb-1 sm:mb-2">
                    Followers
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">
                     {userData.followers}
                  </div>
                </div>
              </div>

              <div className="group relative p-3 sm:p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 glow-hover backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-2 sm:mb-4 flex justify-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-green-500/20">
                      <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono mb-1 sm:mb-2">
                    Since
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">
                     {formatDate(userData.created_at)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 sm:p-6 glow-hover backdrop-blur-sm mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-mono text-xs sm:text-sm ml-4">~/github/{userData.login}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={userData.avatar_url}
                    alt="GitHub Avatar"
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-green-500/30"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono mb-2">
                    {userData.name || `@${userData.login}`}
                  </h3>
                  {userData.bio && (
                    <p className="text-gray-400 font-mono text-xs sm:text-sm mb-4">
                      {userData.bio}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    <a
                      href={`https://github.com/${userData.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-xs sm:text-sm hover:bg-green-500/30 transition-colors"
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 sm:p-6 glow-hover backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-mono text-xs sm:text-sm ml-4">~/recent-repositories</span>
              </div>
              
              <h4 className="text-green-400 font-mono text-xs sm:text-sm mb-4">
                <span className="text-gray-500">$</span> git log --oneline -7
              </h4>
              
              <div className="space-y-3">
                {repositories.map((repo, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-green-500/20">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1 gap-1">
                      <span className="text-blue-400 font-mono text-xs font-semibold">{repo.name}</span>
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <span className="text-yellow-400 font-mono text-[10px] sm:text-xs">{repo.language}</span>
                        )}
                        <span className="text-gray-400 font-mono text-[10px] sm:text-xs">
                          ⭐ {repo.stargazers_count}
                        </span>
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-white font-mono text-xs break-words mb-1">{repo.description}</p>
                    )}
                    <p className="text-gray-400 font-mono text-[10px] sm:text-xs">
                      Updated: {formatDate(repo.updated_at)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      
      </div>
  </section>
  </>
  );
};

export default GitHubStats;