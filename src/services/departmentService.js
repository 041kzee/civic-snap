import api from './api';

const departmentService = {
  getDepartments: async () => {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDepartment: async (data) => {
    try {
      const response = await api.post('/departments', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDepartment: async (id, data) => {
    try {
      const response = await api.put(`/departments/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  assignDepartment: async (issueId, departmentId) => {
    try {
      const response = await api.patch(`/departments/reassign/${issueId}`, { departmentId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default departmentService;
