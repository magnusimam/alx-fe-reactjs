// GitHub API Service for fetching user data

const githubService = {
  // Search for GitHub users by username
  searchUsers: async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      return data.items; // Returns array of users
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },
  
  // Get detailed information about a specific user
  getUserDetails: async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }
};

export default githubService;