import axios from 'axios';
import httpStatus from 'http-status';

import { Messages, ApiUrl } from '../config/constants';

const api = axios.create({
  baseURL: `${ApiUrl}`,
});

const locationPage = () => {
  localStorage.clear();
  window.location.href = '/#/login';
  window.location.reload();
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('Token');
    if (token != null) {
      config.headers['Authorization'] = token;
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
    const { status } = error.response;
    console.log('status', status)
    switch (status) {
      case httpStatus.UNAUTHORIZED:
        locationPage();
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


