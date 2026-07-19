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
      pagination: {
        page: response.data.page,
        totalPages: response.data.pages,
        totalProducts: response.data.total,
        hasNextPage: response.data.page < response.data.pages,
        hasPreviousPage: response.data.page > 1
      }
    };
  } catch (error) {
    throw error;
  }
};

export const clearInventory = async () => {
  const response = await api.delete('/products/clear-inventory');
  return response.data;
};

export const clearTestData = async () => {
  const response = await api.delete('/products/clear-test-data');
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get('/products/departments');
  return response.data;
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
