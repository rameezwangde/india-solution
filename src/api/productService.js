import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/products?limit=100');
    return response.data.products.map(p => ({
      id: p._id,
      name: p.name,
      code: p.productCode || '',
      category: p.category ? p.category.name : 'Uncategorized',
      size: p.size || '',
      price: `₹${p.price.toLocaleString()}`,
      quantity: p.quantity,
      image: p.image && p.image.url ? p.image.url : 'https://placehold.co/600x400/1e293b/a8a29e?text=No+Image',
      status: p.status
    }));
  } catch (error) {
    throw error;
  }
};
