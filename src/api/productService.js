import api from './api';

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    const products = response.data.products.map(p => ({
      id: p._id,
      name: p.name,
      code: p.productCode || '',
      category: p.category ? p.category.name : 'Uncategorized',
      categoryId: p.category ? p.category._id : null,
      size: p.size || '',
      price: p.price,
      quantity: p.quantity,
      image: p.image && p.image.url ? p.image.url : '', 
      status: p.status,
      isFeatured: p.isFeatured || false,
      department: p.department || '',
      description: p.description || ''
    }));
    return {
      products,
      pagination: response.data.pagination
    };
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const uploadProductImage = async (id, file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post(`/products/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteProductImage = async (id) => {
  const response = await api.delete(`/products/${id}/image`);
  return response.data;
};
