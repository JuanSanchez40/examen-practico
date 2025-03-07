import axios from 'axios';

/**
 * Patrones Singleton y Proxy
 */
const api = axios.create({
  baseURL: 'https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=[criterio]&page=[numeropagina]&sortBy=best_match',
  timeout: 10000,
  'Content-Type': 'application/json',
  'x-rapidapi-key': 'fce0e15738msh6a87c0c9db9505cp14b74fjsn54bc768f3bc7',
  'x-rapidapi-host': 'axesso-walmart-data-service.p.rapidapi.com',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default api;