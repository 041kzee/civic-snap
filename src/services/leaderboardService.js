import api from './api';

const leaderboardService = {
  getLeaderboard: async (ward) => {
    try {
      const response = await api.get('/leaderboard', {
        params: { ward },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default leaderboardService;
