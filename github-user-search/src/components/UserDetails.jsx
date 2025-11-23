import React from 'react';

const UserDetails = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        {/* Header with Close Button */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>
        
        {/* User Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full border-2 border-gray-200"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{user.login}</h3>
            {user.name && <p className="text-lg text-gray-600">{user.name}</p>}
          </div>
        </div>
        
        {/* Bio Section */}
        {user.bio && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}
        
        {/* Additional Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {user.location && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
              <p className="text-gray-700">{user.location}</p>
            </div>
          )}
          {user.company && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Company</h4>
              <p className="text-gray-700">{user.company}</p>
            </div>
          )}
          {user.blog && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
              <a 
                href={user.blog} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline break-all"
              >
                {user.blog}
              </a>
            </div>
          )}
          {user.email && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
              <p className="text-gray-700">{user.email}</p>
            </div>
          )}
          {user.twitter_username && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Twitter</h4>
              <p className="text-gray-700">@{user.twitter_username}</p>
            </div>
          )}
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{user.public_repos}</p>
            <p className="text-sm text-gray-600">Repositories</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{user.followers}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{user.following}</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
        
        {/* Additional Stats */}
        {user.public_gists > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Public Gists</h4>
            <p className="text-gray-700">{user.public_gists}</p>
          </div>
        )}
        
        {user.created_at && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Member Since</h4>
            <p className="text-gray-700">
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
        
        {/* Visit GitHub Button */}
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-4 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition font-medium"
        >
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserDetails;
