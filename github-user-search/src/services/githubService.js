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
  searchUsers: async ({ username = '', location = '', minRepos = 0, page = 1, perPage = 10 } = {}) => {
    try {
      const queryParts = [];

      if (username && username.trim()) {
        queryParts.push(username.trim());
      }

      if (location && location.trim()) {
        const loc = location.trim().includes(' ') ? `"${location.trim()}"` : location.trim();
        queryParts.push(`location:${loc}`);
      }

      if (Number.isFinite(minRepos) && minRepos > 0) {
        queryParts.push(`repos:>=${minRepos}`);
      }

      if (queryParts.length === 0) {
        queryParts.push('type:user');
      }

      const q = encodeURIComponent(queryParts.join(' '));
      const url = `${BASE_URL}/search/users?q=${q}&page=${page}&per_page=${perPage}`;

      const response = await axios.get(url, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      });

      return {
        users: response.data.items,
        totalCount: response.data.total_count,
        page,
        perPage
      };
    } catch (error) {
      console.error('githubService.searchUsers error:', error?.response?.data || error.message || error);
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