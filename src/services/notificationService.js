import api from './api';

const notificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAsRead: async (ids) => {
    try {
      const response = await api.patch('/notifications/read', { ids });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllRead: async () => {
    try {
      const response = await api.patch('/notifications/read-all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationService;
