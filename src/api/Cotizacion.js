import getAxiosInstance from 'utils/axiosInstance';
import { mockDb } from 'utils/mockDb';

export const getCotizacion = async () => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get('/cotizacion');
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Utilizando cotizaciones simuladas (quemadas).", error);
    return mockDb.getQuotes();
  }
};

export const getCotizacionById = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/${cotizacionId}`);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Utilizando cotización simulada por ID.", error);
    return mockDb.getQuoteById(cotizacionId);
  }
};

export const getCotizacionesByEvento = async (eventoId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/evento/${eventoId}`);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Utilizando cotizaciones simuladas del evento.", error);
    return mockDb.getQuotesByEvent(eventoId);
  }
};

export const getServicesByCotizacion = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.get(`/cotizacion/${cotizacionId}/servicios`);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Cargando servicios simulados de la cotización.", error);
    // Buscamos la cotización y mapeamos los IDs de servicio a los servicios reales simulados
    const quote = mockDb.getQuoteById(cotizacionId);
    if (!quote) return [];
    const allServices = mockDb.getServices();
    return allServices.filter(s => quote.servicios && quote.servicios.includes(s.id));
  }
};

export const createCotizacion = async (data) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.post('/cotizacion', data);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Creando cotización simulada (quemada).", error);
    return mockDb.createQuote(data);
  }
};

export const updateCotizacion = async (cotizacionId, data) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.put(`/cotizacion/${cotizacionId}`, data);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Actualizando cotización simulada (quemada).", error);
    return mockDb.updateQuote(cotizacionId, data);
  }
};

export const deleteCotizacion = async (cotizacionId) => {
  try {
    const axiosCotizacion = getAxiosInstance('cotizacion');
    const response = await axiosCotizacion.delete(`/cotizacion/${cotizacionId}`);
    return response.data;
  } catch (error) {
    console.warn("Quote API offline. Eliminando cotización simulada (quemada).", error);
    return mockDb.deleteQuote(cotizacionId);
  }
};
