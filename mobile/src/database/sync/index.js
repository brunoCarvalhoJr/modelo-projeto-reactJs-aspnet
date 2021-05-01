/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../http/api';
import syncDatabase from './synchronize';
import DateTimeNowUTC from '../datetime';
const URL_SYNC = '/v1/sincronizacao';

export default function Sincronizacao(usuario, callback) {
  return syncDatabase({
    usuario,
    callback,
    pullChanges: async () => {
      try {
        const dateSync = await AsyncStorage.getItem('@RNAuth:dateSync');
        const { data } = await api.get(`${URL_SYNC}/${usuario}/${dateSync}`);
        await AsyncStorage.setItem(
          '@RNAuth:dateSync',
          DateTimeNowUTC().toJSON(),
        );
        return { changes: data };
      } catch (error) {
        console.log('Erro ao realizar sync pull', error);
      }
    },
    pushChanges: async ({ changes }) => {
      try {
        await api.post(`${URL_SYNC}/${usuario}`, changes);
      } catch (error) {
        console.log('Erro ao realizar sync push', error);
      }
    },
  });
}
