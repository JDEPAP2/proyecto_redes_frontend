import getAxiosInstance from 'utils/axiosInstance';

export const getCategorias = async () => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.get('/categoria');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getCategoriaById = async (categoriaId) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createCategoria = async (data) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.post('/categoria', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateCategoria = async (categoriaId, data) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.put(`/categoria/${categoriaId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteCategoria = async (categoriaId) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.delete(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
