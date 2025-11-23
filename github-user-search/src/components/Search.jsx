import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  // Form state
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  
  // Results state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  /**
   * Handle advanced search form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset to first page on new search
    setCurrentPage(1);
    await performSearch(1);
  };

  /**
   * Perform search with given page number
   */
  const performSearch = async (page) => {
    setLoading(true);
    setError(null);
    
    // If it's a new search (page 1), clear previous results
    if (page === 1) {
      setUsers([]);
    }

    try {
      const searchParams = {
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : 0,
        page: page,
        perPage: 10
      };

      const result = await githubService.searchUsers(searchParams);
      
      if (result.users.length === 0 && page === 1) {
        setError('Looks like we cant find the user');
        setUsers([]);
        setTotalCount(0);
        setHasMore(false);
      } else {
        // For page 1, replace results; for other pages, append results
        if (page === 1) {
          setUsers(result.users);
        } else {
          setUsers(prevUsers => [...prevUsers, ...result.users]);
        }
        
        setTotalCount(result.totalCount);
        setHasMore(result.users.length === result.perPage && users.length + result.users.length < result.totalCount);
      }
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
      setTotalCount(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load more results (pagination)
   */
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await performSearch(nextPage);
  };

  /**
   * Clear all form fields and results
   */
  const handleClear = () => {
    setUsername('');
    setLocation('');
    setMinRepos('');
    setUsers([]);
    setError(null);
    setTotalCount(0);
    setCurrentPage(1);
    setHasMore(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Advanced Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced GitHub User Search</h2>
        
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username (e.g., octocat)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., San Francisco, Nigeria)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
          </div>

          {/* Minimum Repositories Field */}
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Repositories
            </label>
            <input
              id="minRepos"
              type="number"
              min="0"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Enter minimum number of repositories (e.g., 10)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
          </div>

          {/* Search Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Searching...' : 'Search Users'}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {totalCount > 0 && !loading && (
        <div className="mb-4 text-gray-600">
          Found <span className="font-bold text-gray-900">{totalCount.toLocaleString()}</span> users
          {totalCount > 10 && <span> (showing {users.length})</span>}
        </div>
      )}

      {/* Loading State */}
      {loading && users.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg 
            className="mx-auto h-12 w-12 text-red-500 mb-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <p className="text-red-700 font-medium text-lg">Looks like we cant find the user</p>
        </div>
      )}

      {/* Search Results Grid */}
      {users.length > 0 && !error && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
              >
                {/* User Avatar and Name */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      ID: {user.id}
                    </p>
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-2 mb-4 text-sm">
                  {user.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="truncate">{user.location}</span>
                    </div>
                  )}
                  
                  {user.public_repos !== undefined && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>{user.public_repos} repositories</span>
                    </div>
                  )}
                  
                  {user.followers !== undefined && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                      <span>{user.followers} followers</span>
                    </div>
                  )}
                </div>

                {/* View Profile Button */}
                
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Load More
              </button>
            </div>
          )}

          {/* Loading More Indicator */}
          {loading && users.length > 0 && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading more users...</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {users.length === 0 && !loading && !error && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400 mb-4" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Results Yet</h3>
          <p className="text-gray-500">Use the search form above to find GitHub users</p>
          <div className="mt-4 text-sm text-gray-400">
            <p>Try searching by:</p>
            <ul className="mt-2 space-y-1">
              <li>• Username (e.g., "octocat")</li>
              <li>• Location (e.g., "San Francisco")</li>
              <li>• Minimum repositories (e.g., 50)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;