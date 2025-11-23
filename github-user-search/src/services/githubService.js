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
      if (error.response && error.response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user data');
    }
  },

  /**
   * Advanced search for GitHub users with multiple criteria
   * @param {Object} searchParams - Search parameters
   * @param {string} searchParams.username - Username to search for
   * @param {string} searchParams.location - Location filter (optional)
   * @param {number} searchParams.minRepos - Minimum number of repositories (optional)
   * @param {number} searchParams.page - Page number for pagination (default: 1)
   * @param {number} searchParams.perPage - Results per page (default: 10)
   * @returns {Promise} - Search results with users array and total count
   */
  searchUsers: async ({ username = '', location = '', minRepos = 0, page = 1, perPage = 10 }) => {
    try {
      // Build query string based on provided parameters
      let query = '';
      
      // Add username to query if provided
      if (username.trim()) {
        query += username.trim();
      }
      
      // Add location filter if provided
      if (location.trim()) {
        query += ` location:${location.trim()}`;
      }
      
      // Add minimum repositories filter if provided
      if (minRepos > 0) {
        query += ` repos:>=${minRepos}`;
      }
      
      // If query is empty, search for all users (limited results)
      if (!query.trim()) {
        query = 'type:user';
      }
      
      // Make API request with query parameters
      const response = await axios.get(`${BASE_URL}/search/users`, {
        params: {
          q: query,
          page: page,
          per_page: perPage
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      return {
        users: response.data.items,
        totalCount: response.data.total_count,
        page: page,
        perPage: perPage
      };
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users');
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