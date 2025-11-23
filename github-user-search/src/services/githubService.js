import axios from 'axios';

// Base URL for GitHub API
const BASE_URL = 'https://api.github.com';

const githubService = {
  /**
   * Fetch a single user's data by username
   * @param {string} username - GitHub username to search for
   * @returns {Promise} - User data from GitHub API
   */
  fetchUserData: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      return response.data;
    } catch (error) {
      // Handle different error scenarios
      if (error.response && error.response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user data');
    }
  },

  /**
   * Search for GitHub users by username (returns multiple results)
   * @param {string} username - Search term
   * @returns {Promise} - Array of users matching the search
   */
  searchUsers: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/users?q=${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      return response.data.items;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },
  
  /**
   * Get detailed information about a specific user
   * @param {string} username - GitHub username
   * @returns {Promise} - Detailed user data
   */
  getUserDetails: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }
};

export default githubService;