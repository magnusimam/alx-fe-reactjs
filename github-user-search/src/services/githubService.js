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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const PER_PAGE = 12;

  const performSearch = async (page = 1) => {
    if (!username.trim() && !location.trim() && !minRepos) {
      // optionally require at least one filter; adjust as needed
      // continue to allow broad searches by leaving comment out
    }

    try {
      if (page === 1) {
        setLoading(true);
        setUsers([]);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const searchParams = {
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos, 10) : 0,
        page,
        perPage: PER_PAGE
      };

      const result = await githubService.searchUsers(searchParams);

      if (page === 1) {
        setUsers(result.users);
      } else {
        setUsers(prev => [...prev, ...result.users]);
      }

      setTotalCount(result.totalCount);
      setHasMore(result.users.length === result.perPage && (page * result.perPage) < result.totalCount);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Failed to search users');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    await performSearch(1);
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;
    await performSearch(currentPage + 1);
  };

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
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Advanced GitHub User Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., octocat"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={loading || loadingMore}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={loading || loadingMore}
            />
          </div>

          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">Min. Repos</label>
            <input
              id="minRepos"
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g., 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={loading || loadingMore}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            disabled={loading || loadingMore}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="mt-2 md:mt-0 w-full md:w-auto bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition duration-200"
            disabled={loading || loadingMore}
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{user.login}</h3>
                <p className="text-sm text-gray-600">{user.html_url}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 mb-4">
              <p><strong>Followers:</strong> {user.followers}</p>
              <p><strong>Following:</strong> {user.following}</p>
              <p><strong>Public Repos:</strong> {user.public_repos}</p>
            </div>

            <a
              href={`https://github.com/${user.login}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            >
              View Repositories
            </a>
          </div>
        ))}
      </div>

      {loadingMore && (
        <div className="flex justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4.293 12.293a1 1 0 011.414 0L12 18.586l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"></path>
          </svg>
        </div>
      )}

      {hasMore && !loadingMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            disabled={loading || loadingMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;