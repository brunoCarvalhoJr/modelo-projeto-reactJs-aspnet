import { AxiosResponse } from 'axios';
import api from '../http/api';

export function signIn(username: String, password: String): Promise<AxiosResponse> {
  return api.post('/Login', {
    username, password
  })
}
