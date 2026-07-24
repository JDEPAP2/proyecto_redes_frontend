import axios from 'axios';

var baseURLs = {
  usuario: process.env.REACT_APP_BASE_URL_USUARIO,
  servicio: process.env.REACT_APP_BASE_URL_SERVICIO,
  cotizacion: process.env.REACT_APP_BASE_URL_COTIZACION,
  evento: process.env.REACT_APP_BASE_URL_EVENTO,
};

const getAxiosInstance = (service) => {
  throw new Error("No hay servidores configurados. Usando base de datos simulada.");
};

export default getAxiosInstance;
