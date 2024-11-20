import getAxiosInstance from 'utils/axiosInstance';

export const getAllEvents = async (userId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.get(`/evento/usuario/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getEventById = async (eventId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.get(`/evento/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createEvent = async (eventData) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.post('/evento', eventData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.put(`/evento/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.delete(`/evento/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
