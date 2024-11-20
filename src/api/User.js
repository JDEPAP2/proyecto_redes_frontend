import getAxiosInstance from 'utils/axiosInstance';

export const getUserById = async (userId) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');

    const response = await axiosUsuario.get(`/usuario/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');

    const response = await axiosUsuario.put(`/usuario/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
