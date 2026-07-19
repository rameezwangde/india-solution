import api from './api';

export const generateExport = async (format, scope, filters, productIds) => {
  const response = await api.post('/export/generate', { 
    format, 
    scope, 
    filters, 
    productIds 
  }, {
    responseType: 'blob' // We need to handle the binary stream for file downloads
  });
  
  return response;
};
