import getAxiosInstance from 'utils/axiosInstance';
import { mockDb } from 'utils/mockDb';

export const getAllEvents = async (userId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.get(`/evento/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.warn("Event API offline. Utilizando eventos simulados (quemados).", error);
    return mockDb.getEvents(userId);
  }
};

export const getEventById = async (eventId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.get(`/evento/${eventId}`);
    return response.data;
  } catch (error) {
    console.warn("Event API offline. Utilizando evento simulado (quemado) por ID.", error);
    return mockDb.getEventById(eventId);
  }
};

export const createEvent = async (eventData) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.post('/evento', eventData);
    return response.data;
  } catch (error) {
    console.warn("Event API offline. Evento creado simulado (quemado).", error);
    return mockDb.createEvent(eventData);
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.put(`/evento/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.warn("Event API offline. Evento editado simulado (quemado).", error);
    return mockDb.updateEvent(eventId, eventData);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const axiosEvento = getAxiosInstance('evento');
    const response = await axiosEvento.delete(`/evento/${eventId}`);
    return response.data;
  } catch (error) {
    console.warn("Event API offline. Evento eliminado simulado (quemado).", error);
    return mockDb.deleteEvent(eventId);
  }
};
