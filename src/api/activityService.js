import api from './api';

export const getActivities = async (params = {}) => {
  try {
    const response = await api.get('/inventory/activity', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductActivity = async (productId) => {
  try {
    const response = await api.get(`/inventory/activity/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentActivity = async (limit = 10) => {
  try {
    const response = await api.get('/inventory/activity/recent', { params: { limit } });
    return response.data;
  } catch (error) {
    throw error;
  }
};
