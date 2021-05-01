import _ from 'lodash';

const prepareApplyAllRemoteChanges = async (REALM, recordsToApply) =>
  recordsToApply.map((item) => {
    const {tableName, changes} = item;
    if (tableName === 'default') {
      return null;
    }
    return changes.map((change) => REALM.create(tableName, change, 'all'));
  });

function getAllRecordsToApply(remoteChanges) {
  const changes = [];
  Object.keys(remoteChanges).forEach((key) => {
    changes.push({
      tableName: _.upperFirst(key),
      changes: remoteChanges[key],
    });
  });
  return {changes};
}

export default async function applyRemoteChanges(REALM, remoteChanges) {
  const {changes} = getAllRecordsToApply(remoteChanges);
  return prepareApplyAllRemoteChanges(REALM, changes);
}
