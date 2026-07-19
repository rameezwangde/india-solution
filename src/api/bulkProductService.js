import api from './api';

export const bulkUpdateDepartment = async (productIds, newDepartment) => {
  const response = await api.post('/products/bulk/update-department', { productIds, newDepartment });
  return response.data;
};

export const bulkUpdateCategory = async (productIds, newCategoryId) => {
  const response = await api.post('/products/bulk/update-category', { productIds, newCategoryId });
  return response.data;
};

export const bulkActivate = async (productIds) => {
  const response = await api.post('/products/bulk/activate', { productIds });
  return response.data;
};

export const bulkDeactivate = async (productIds) => {
  const response = await api.post('/products/bulk/deactivate', { productIds });
  return response.data;
};

export const bulkDelete = async (productIds) => {
  const response = await api.post('/products/bulk/delete', { productIds });
  return response.data;
};

export const bulkUpdateThresholds = async (productIds, lowStockThreshold, criticalStockThreshold) => {
  const response = await api.post('/products/bulk/update-thresholds', { 
    productIds, 
    lowStockThreshold, 
    criticalStockThreshold 
  });
  return response.data;
};
