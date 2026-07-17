import api from './api';
import axios from 'axios';

export const submitEnquiry = async (data) => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const response = await axios.post(`${baseURL}/enquiries`, data);
  return response.data;
};

export const getEnquiries = async (params = {}) => {
  const response = await api.get('/enquiries', { params });
  return response.data;
};

export const getEnquiryById = async (id) => {
  const response = await api.get(`/enquiries/${id}`);
  return response.data;
};

export const updateEnquiryStatus = async (id, status, notes) => {
  const data = { status };
  if (notes !== undefined) data.notes = notes;
  
  const response = await api.put(`/enquiries/${id}`, data);
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await api.delete(`/enquiries/${id}`);
  return response.data;
};
