import axios from 'axios';

var baseURLs = {
  usuario: process.env.REACT_APP_BASE_URL_USUARIO,
  servicio: process.env.REACT_APP_BASE_URL_SERVICIO,
  cotizacion: process.env.REACT_APP_BASE_URL_COTIZACION,
  evento: process.env.REACT_APP_BASE_URL_EVENTO,
};

const getAxiosInstance = (service) => {
  if (!baseURLs[service]) {
    throw new Error(`Service ${service} is not defined`);
  }
  return axios.create({
    baseURL: baseURLs[service],
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export default getAxiosInstance;
