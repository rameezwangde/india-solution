import api from './api';

export const previewInventory = async (file) => {
  const formData = new FormData();
  formData.append('inventoryFile', file);
  const response = await api.post('/inventory-import/preview', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const executeInventory = async (file, duplicateMode, createMissingCategories) => {
  const formData = new FormData();
  formData.append('inventoryFile', file);
  formData.append('duplicateMode', duplicateMode);
  formData.append('createMissingCategories', createMissingCategories);
  
  const response = await api.post('/inventory-import/execute', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const downloadTemplate = async () => {
  const response = await api.get('/inventory-import/template', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Inventory_Template.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportInventory = async () => {
  const response = await api.get('/inventory-import/export', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'CRM_Inventory_Export.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
};
