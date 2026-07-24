import getAxiosInstance from 'utils/axiosInstance';
import { mockDb } from 'utils/mockDb';

export const getAllServices = async () => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.get('/servicio');
    return response.data;
  } catch (error) {
    console.warn("Service API offline. Utilizando servicios simulados (quemados).", error);
    return mockDb.getServices();
  }
};

export const getServicesByCategory = async (categoryId) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.get(`/servicio/categoria/${categoryId}`);
    return response.data;
  } catch (error) {
    console.warn("Service API offline. Utilizando servicios por categoría simulados.", error);
    return mockDb.getServicesByCategory(categoryId);
  }
};

export const createService = async (serviceData) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.post('/servicio', serviceData);
    return response.data;
  } catch (error) {
    console.warn("Service API offline. Servicio creado simulado (quemado).", error);
    return mockDb.createService(serviceData);
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.put(`/servicio/${serviceId}`, serviceData);
    return response.data;
  } catch (error) {
    console.warn("Service API offline. Servicio editado simulado (quemado).", error);
    return mockDb.updateService(serviceId, serviceData);
  }
};

export const deleteService = async (serviceId) => {
  try {
    const axiosServicio = getAxiosInstance('servicio');
    const response = await axiosServicio.delete(`/servicio/${serviceId}`);
    return response.data;
  } catch (error) {
    console.warn("Service API offline. Servicio eliminado simulado (quemado).", error);
    return mockDb.deleteService(serviceId);
  }
};
