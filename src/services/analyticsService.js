import api from './api';

const analyticsService = {
  getSummary: async () => {
    try {
      const response = await api.get('/analytics/summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getResolutionStats: async () => {
    try {
      const response = await api.get('/analytics/resolution');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getIssuesByCategory: async () => {
    try {
      const response = await api.get('/analytics/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getWardBreakdown: async () => {
    try {
      const response = await api.get('/analytics/wards');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDepartmentPerformance: async () => {
    try {
      const response = await api.get('/analytics/performance');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default analyticsService;
