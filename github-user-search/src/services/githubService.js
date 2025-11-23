import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const githubService = {
  searchUsers: async ({ username, location, minRepos, page, perPage }) => {
    // Build GitHub search query
    let query = '';

    if (username) query += `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos && minRepos > 0) query += `+repos:>=${minRepos}`;

    // Fallback for empty queries
    if (!query) query = 'type:user';

    const url = `${BASE_URL}/search/users?q=${query}&page=${page}&per_page=${perPage}`;

    try {
      const response = await axios.get(url);

      return {
        users: response.data.items,
        totalCount: response.data.total_count,
        perPage
      };
    } catch (error) {
      throw error;
    }
  },

  getUser: async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default githubService;
