import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search GitHub users... (e.g., octocat)"
          className="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          disabled={loading}
        />
        
        {/* Search Icon */}
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          width="20" 
          height="20" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" strokeWidth="2"/>
        </svg>
        
        {/* Search Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;