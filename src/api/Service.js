import getAxiosInstance from 'utils/axiosInstance';

export const getAllServices = async () => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.get('/servicio');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getServicesByCategory = async (categoryId) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.get(`/servicio/categoria/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createService = async (serviceData) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.post('/servicio', serviceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.put(`/servicio/${serviceId}`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteService = async (serviceId) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.delete(`/servicio/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
