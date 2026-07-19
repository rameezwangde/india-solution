import api from './api';

export const getBackupHistory = async () => {
  const response = await api.get('/admin/backups');
  return response.data;
};

export const generateBackup = async () => {
  const response = await api.post('/admin/backups/generate', {}, {
    responseType: 'blob'
  });
  return response;
};

export const previewRestore = async (file) => {
  const formData = new FormData();
  formData.append('backup', file);
  
  const response = await api.post('/admin/backups/preview', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const executeRestore = async (file, mode, confirmation) => {
  const formData = new FormData();
  formData.append('backup', file);
  formData.append('mode', mode);
  formData.append('confirmation', confirmation);

  const response = await api.post('/admin/backups/restore', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
