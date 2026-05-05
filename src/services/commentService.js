import api from './api';

const commentService = {
  getComments: async (issueId) => {
    try {
      const response = await api.get(`/comments/${issueId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addComment: async (issueId, text) => {
    try {
      const response = await api.post('/comments', { issueId, text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (issueId, commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default commentService;
