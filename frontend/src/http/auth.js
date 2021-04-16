import api from '../http/api';

export function signIn(username, password) {
  return api.post('/Login', {
    username, password
  })
}
