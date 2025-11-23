import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import UserDetails from './components/UserDetails';
import githubService from './services/githubService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Handle user search
  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);
    setUsers([]);
    
    try {
      const results = await githubService.searchUsers(searchTerm);
      setUsers(results);
      
      if (results.length === 0) {
        setError('No users found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle viewing user details
  const handleViewDetails = async (username) => {
    setDetailsLoading(true);
    setError(null);
    
    try {
      const userDetails = await githubService.getUserDetails(username);
      setSelectedUser(userDetails);
    } catch (err) {
      setError('Failed to load user details. Please try again.');
      console.error('Details error:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle closing details modal
  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg 
              className="text-blue-600 mr-3" 
              width="48" 
              height="48" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <h1 className="text-4xl font-bold text-gray-900">GitHub User Search</h1>
          </div>
          <p className="text-gray-600 text-lg">Discover and explore GitHub profiles</p>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching users...</p>
          </div>
        )}

        {/* User Results */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="text-center py-12">
            <svg 
              className="mx-auto text-gray-400 mb-4" 
              width="64" 
              height="64" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <p className="text-gray-500 text-lg">Start searching for GitHub users</p>
            <p className="text-gray-400 text-sm mt-2">Try searching for "octocat" or "torvalds"</p>
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <UserDetails user={selectedUser} onClose={handleCloseDetails} />
        )}

        {/* Details Loading Overlay */}
        {detailsLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading details...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;