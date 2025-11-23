import React from 'react';

const UserCard = ({ user, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* User Avatar and Basic Info */}
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{user.login}</h3>
          {user.name && <p className="text-gray-600">{user.name}</p>}
          {user.location && (
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {user.location}
            </div>
          )}
        </div>
      </div>
      
      {/* Bio */}
      {user.bio && (
        <p className="mt-4 text-gray-700 text-sm">{user.bio}</p>
      )}
      
      {/* Stats */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex space-x-4">
          {user.followers !== undefined && (
            <div className="flex items-center">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <span>{user.followers} followers</span>
            </div>
          )}
          {user.public_repos !== undefined && (
            <div className="flex items-center">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
              </svg>
              <span>{user.public_repos} repos</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition text-center flex items-center justify-center text-sm"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-2">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
          </svg>
          View Profile
        </a>
        <button
          onClick={() => onViewDetails(user.login)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm"
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default UserCard;
