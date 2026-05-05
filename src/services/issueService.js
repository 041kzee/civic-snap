import api from './api';

const issueService = {
  getIssues: async (filters = {}) => {
    try {
      const { status, category, ward, page = 1, limit = 20 } = filters;
      const response = await api.get('/issues', {
        params: { status, category, ward, page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getIssueById: async (id) => {
    try {
      const response = await api.get(`/issues/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createIssue: async (formData) => {
    try {
      const response = await api.post('/issues', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateIssueStatus: async (id, status, department) => {
    try {
      const response = await api.patch(`/issues/${id}/status`, { status, department });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  upvoteIssue: async (id) => {
    try {
      const response = await api.patch(`/issues/${id}/upvote`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getIssuesNearby: async (lat, lng, radius) => {
    try {
      const response = await api.get('/issues/nearby', {
        params: { lat, lng, radius },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default issueService;
