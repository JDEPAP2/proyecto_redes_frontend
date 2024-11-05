import axiosInstance from 'utils/axiosInstance';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/usuario/loggear', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/usuario/registrar', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};


