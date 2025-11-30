import React from 'react';
import UserProfile from './components/UserProfile';

function App() {
  const sampleUser = {
    name: 'Octocat',
    bio: 'There once was...',
    location: 'San Francisco',
    email: 'octocat@github.com',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    followers: 3938,
    following: 9,
    publicRepos: 2,
    profileUrl: 'https://github.com/octocat'
  };

  return <UserProfile user={sampleUser} />;
}

export default App;
