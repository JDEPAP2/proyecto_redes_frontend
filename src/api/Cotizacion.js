import getAxiosInstance from 'utils/axiosInstance';

export const getCotizacion = async () => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get('/cotizacion');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getCotizacionById = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/${cotizacionId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getCotizacionesByEvento = async (eventoId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/evento/${eventoId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getServicesByCotizacion = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/${cotizacionId}/servicios`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createCotizacion = async (data) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.post('/cotizacion', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateCotizacion = async (cotizacionId, data) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.put(`/cotizacion/${cotizacionId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteCotizacion = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.delete(`/cotizacion/${cotizacionId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
