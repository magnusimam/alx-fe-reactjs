import React from 'react';

const UserProfile = ({ user = {} }) => {
  const {
    name = 'John Doe',
    bio = 'Software Developer | Open Source Enthusiast',
    location = 'San Francisco, CA',
    email = 'john@example.com',
    avatar = 'https://api.github.com/users/octocat/avatar_url',
    followers = 0,
    following = 0,
    publicRepos = 0,
    profileUrl = '#'
  } = user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      {/* Container with hover shadow effect and transition */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 sm:p-6 md:p-8">
        
        {/* Profile Image - Responsive sizing with hover scale and transition */}
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full border-4 border-indigo-200 object-cover hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
            loading="lazy"
          />
        </div>

        {/* Name - Responsive typography with hover color effect */}
        <h1 className="text-lg sm:text-xl md:text-xl font-bold text-gray-800 text-center mb-2 hover:text-blue-500 transition-colors duration-300 ease-in-out cursor-pointer">
          {name}
        </h1>

        {/* Bio - Responsive typography */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-4 sm:mb-6">
          {bio}
        </p>

        {/* Location and Email - Responsive typography with hover effects */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          <div className="flex items-center justify-center text-xs sm:text-sm md:text-base text-gray-700 hover:text-indigo-600 transition-colors duration-300 ease-in-out cursor-pointer">
            <span className="mr-2">📍</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-center text-xs sm:text-sm md:text-base text-gray-700">
            <span className="mr-2">✉️</span>
            <a href={`mailto:${email}`} className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300 ease-in-out">
              {email}
            </a>
          </div>
        </div>

        {/* Stats - Responsive grid layout with hover effects on individual stat items */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6">
          <div className="text-center hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-300 ease-in-out cursor-pointer">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              {publicRepos}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Repos</p>
          </div>
          <div className="text-center hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-300 ease-in-out cursor-pointer">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              {followers}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Followers</p>
          </div>
          <div className="text-center hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-300 ease-in-out cursor-pointer">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              {following}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Following</p>
          </div>
        </div>

        {/* Call-to-action button - Responsive with hover effects and transitions */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg text-center text-sm sm:text-base md:text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          View Full Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;