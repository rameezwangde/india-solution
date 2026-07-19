import api from './api';

export const getStockAlertsSummary = async () => {
  const response = await api.get('/inventory/stock-alerts/summary');
  return response.data;
};

export const getStockAlerts = async (params) => {
  const response = await api.get('/inventory/stock-alerts', { params });
  return response.data;
};

export const quickUpdateQuantity = async (productId, data) => {
  const response = await api.patch(`/inventory/stock-alerts/${productId}/quantity`, data);
  return response.data;
};

export const updateStockThresholds = async (productId, data) => {
  const response = await api.patch(`/inventory/stock-alerts/${productId}/stock-thresholds`, data);
  return response.data;
};

export const acknowledgeAlert = async (productId) => {
  const response = await api.patch(`/inventory/stock-alerts/${productId}/stock-alert/acknowledge`);
  return response.data;
};

export const unacknowledgeAlert = async (productId) => {
  const response = await api.patch(`/inventory/stock-alerts/${productId}/stock-alert/unacknowledge`);
  return response.data;
};
