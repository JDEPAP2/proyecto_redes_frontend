import getAxiosInstance from 'utils/axiosInstance';

export const getReservas = async () => {
  try {
    const axiosReserva = getAxiosInstance('servicio');
    const response = await axiosReserva.get('/reserva-servicio');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getReservaById = async (reservaId) => {
  try {
    const axiosReserva = getAxiosInstance('servicio');
    const response = await axiosReserva.get(`/reserva-servicio/${reservaId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createReserva = async (data) => {
  try {
    const axiosReserva = getAxiosInstance('servicio');
    const response = await axiosReserva.post('/reserva-servicio', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateReserva = async (reservaId, data) => {
  try {
    const axiosReserva = getAxiosInstance('servicio');
    const response = await axiosReserva.put(`/reserva-servicio/${reservaId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteReserva = async (reservaId) => {
  try {
    const axiosReserva = getAxiosInstance('servicio');
    const response = await axiosReserva.delete(`/reserva-servicio/${reservaId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
