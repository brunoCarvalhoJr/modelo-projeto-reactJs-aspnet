import axios from 'axios';
import httpStatus from 'http-status';

import * as ToastHelper from '../widgets/toast';
import { Messages } from '../config/constants';
import LocalStorage from '../database/localStorage';

const api = axios.create({
  baseURL: 'http://159.65.216.107',
});

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await LocalStorage.getToken('Token');
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

    switch (status) {
      case httpStatus.UNAUTHORIZED:
        ToastHelper.showError(Messages.USUARIO_NAO_AUTORIZADO);
        break;

      case httpStatus.FORBIDDEN:
        ToastHelper.showError(Messages.USUARIO_SEM_PERMISSAO);
        break;

      case httpStatus.UNPROCESSABLE_ENTITY:
        ToastHelper.showError(Messages.SENHA_USUARIO_INCORRETO);
        break;

      case httpStatus.INTERNAL_SERVER_ERROR:
        ToastHelper.showError(Messages.ERRO_PADRAO);
        break;

      default:
        ToastHelper.showError(Messages.ERRO_PADRAO);
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
