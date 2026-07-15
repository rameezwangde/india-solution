import api from './api';

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data.categories.map(c => c.name);
  } catch (error) {
    throw error;
  }
};
