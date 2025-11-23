import React, { useState } from 'react';
import githubService from '../services/githubService';
import UserCard from './UserCard';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const perPage = 10;

  const doSearch = async (reset = true) => {
    setError('');
    setLoading(true);
    try {
      const p = reset ? 1 : page;
      const res = await githubService.searchUsers({
        username,
        location,
        minRepos: Number(minRepos) || 0,
        page: p,
        perPage,
        includeDetails: true // request full user details (location, public_repos, etc.)
      });

      setResults(reset ? res.users : [...results, ...res.users]);
      setTotalCount(res.totalCount);
      setPage(p);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (results.length >= totalCount) return;
    setLoading(true);
    setError('');
    try {
      const next = page + 1;
      const res = await githubService.searchUsers({
        username,
        location,
        minRepos: Number(minRepos) || 0,
        page: next,
        perPage,
        includeDetails: true
      });
      setResults(prev => [...prev, ...res.users]);
      setPage(next);
    } catch (err) {
      setError(err.message || 'Load more failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form
        className="grid gap-3 sm:grid-cols-3 items-end"
        onSubmit={(e) => { e.preventDefault(); doSearch(true); }}
        aria-label="Advanced user search"
      >
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. octocat" />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="City or country" />
        </div>
        <div>
          <label className="block text-sm font-medium">Min repos</label>
          <input value={minRepos} onChange={e => setMinRepos(e.target.value)} type="number" min="0" className="w-full mt-1 p-2 border rounded" />
        </div>

        <div className="sm:col-span-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
          {results.length > 0 && (
            <button type="button" onClick={() => { setUsername(''); setLocation(''); setMinRepos(0); setResults([]); setPage(1); setTotalCount(0); }} className="ml-3 px-3 py-2 border rounded">
              Clear
            </button>
          )}
        </div>
      </form>

      {error && <div className="mt-4 text-red-600" role="alert">{error}</div>}

      <div className="mt-4 space-y-3">
        {results.map(user => <UserCard key={user.id || user.login} user={user} />)}
      </div>

      {results.length > 0 && results.length < totalCount && (
        <div className="mt-4 text-center">
          <button onClick={loadMore} className="px-4 py-2 border rounded" disabled={loading}>
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
};

const performSearch = async (page = 1) => {
  try {
    if (page === 1) {
      setLoading(true);
      setUsers([]);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    // Build GitHub search query
    let query = "";

    if (username.trim()) query += `${username.trim()}+in:login`;
    if (location.trim()) query += `+location:${location.trim()}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const finalQuery = query || "type:user"; // fallback to all users

    // Call GitHub API through githubService
    const result = await githubService.searchUsers(finalQuery, page, PER_PAGE);

    // Save results
    if (page === 1) {
      setUsers(result.users);
    } else {
      setUsers(prev => [...prev, ...result.users]);
    }

    setTotalCount(result.totalCount);
    setHasMore(
      result.users.length === PER_PAGE &&
      page * PER_PAGE < result.totalCount
    );

    setCurrentPage(page);

  } catch (err) {
    setError(err.message || 'Failed to search users');
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};


export default Search;