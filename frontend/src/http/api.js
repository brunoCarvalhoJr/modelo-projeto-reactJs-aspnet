import axios from 'axios';
import httpStatus from 'http-status';

import {Messages, ApiUrl} from '../config/constants';

console.log(ApiUrl);
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('Token');
    if (token != null) {
      config.headers['x-access-token'] = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const {status} = error.response;
    console.log('status', status)
    switch (status) {
      case httpStatus.UNAUTHORIZED:
        alert(Messages.USUARIO_NAO_AUTORIZADO);
        break;

      case httpStatus.FORBIDDEN:
        alert(Messages.USUARIO_SEM_PERMISSAO);
        break;

      case httpStatus.UNPROCESSABLE_ENTITY:
        alert(Messages.SENHA_USUARIO_INCORRETO);
        break;

      case httpStatus.INTERNAL_SERVER_ERROR:
        alert(Messages.ERRO_PADRAO);
        break;

      default:
        alert(Messages.ERRO_PADRAO);
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
