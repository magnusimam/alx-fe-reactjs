import React from 'react';

const UserCard = ({ user }) => {
  // user.avatar_url, user.login, user.html_url, optional user.location, user.public_repos
  return (
    <div className="flex items-center gap-4 p-3 border rounded bg-white">
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
        <img
          src={`${user.avatar_url}&s=96`}
          alt={`${user.login} avatar`}
          width="72"
          height="72"
          loading="lazy"
          className="rounded-full"
        />
      </a>
      <div className="flex-1 min-w-0">
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold truncate block">
          {user.login}
        </a>
        {user.location && <div className="text-sm text-gray-500">{user.location}</div>}
        {typeof user.public_repos !== 'undefined' && (
          <div className="text-sm text-gray-500">Repos: {user.public_repos}</div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
