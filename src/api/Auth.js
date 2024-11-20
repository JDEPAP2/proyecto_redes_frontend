import getAxiosInstance from 'utils/axiosInstance';

export const login = async (credentials) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');

    const response = await axiosUsuario.post('/usuario/loggear', credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const register = async (userData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');

    const response = await axiosUsuario.post('/usuario/registrar', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updatePassword = async (userId, passwordData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');

    const response = await axiosUsuario.put(`/usuario/${userId}/clave`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
