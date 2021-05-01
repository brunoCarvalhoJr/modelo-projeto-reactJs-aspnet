import { getRealm } from '../store';
import { applyLocalChanges, applyRemoteChanges } from './impl';
import AsyncStorage from '@react-native-community/async-storage';

export default async function synchronize({
  usuario,
  callback,
  pullChanges,
  pushChanges,
}) {
  const REALM = await getRealm();

  try {
    REALM.beginTransaction();

    const dateSyncString = await AsyncStorage.getItem('@RNAuth:dateSync');

    const dateSync = new Date(dateSyncString);

    const localChanges = await applyLocalChanges(REALM, dateSync);

    await pushChanges({ changes: localChanges });

    const { changes } = await pullChanges({ changes: localChanges, REALM });

    await applyRemoteChanges(REALM, changes);

    REALM.commitTransaction();
    REALM.close();

    console.log('Sincronização realizada com sucesso');

    return { status: true, message: 'Sincronização realizada com sucesso' };
  } catch (error) {
    console.log('Rollback sync', error);
    REALM.cancelTransaction();
  } finally {
    callback();
  }
}
