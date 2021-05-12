const excludesProperties = [];

const getObjetId = (item) => {
  item.id;
};

const getObjectIdByList = (records) =>
  records.map((c) => {
    return { id: c.id };
  });

function createObjectByRecord(record) {
  const { properties } = record.objectSchema();
  const cloneObject = {};
  Object.entries(properties).forEach((entry) => {
    const [key, value] = entry;
    if (!excludesProperties.includes(key)) {
      cloneObject[key] = record[key];
      if (value.type === 'object') {
        cloneObject[key] = getObjetId(record[key]);
      }
      if (value.type === 'object') {
        const resultRecords = createObjectByRecord(record[key]);
        cloneObject[key] = resultRecords;
      }
      if (value.type === 'list') {
        const resultRecords = getObjectIdByList(record[key]);
        cloneObject[key] = resultRecords;
      }
    }
  });
  return cloneObject;
}

const getRecords = (records) => {
  const result = [];
  records.forEach((record) => {
    const cloneObject = createObjectByRecord(record);
    result.push(cloneObject);
  });
  return result;
};

const tabelasSync = ['Foto', 'Formulario', 'Localizacao', 'FormularioItem'];

export default function applyLocalChanges(REALM, dateSync) {
  return new Promise((resolve) => {
    let responses = {};
    const promises = [];

    //DELETA TODAS AS LOCALIZAÇÕES NÃO FINALIZADA
    const localizacoes = REALM.objects('Localizacao').filtered(`status = $0`, 'PENDENTE');
    [...localizacoes].forEach((localizacao) => {
      REALM.delete(localizacao);
    })

    tabelasSync.forEach(async (tableName) => {
      const query = `date >= $0`;
      const records = REALM.objects(tableName).filtered(query, dateSync);
      const normalizeRecords = getRecords(records);
      responses[tableName] = normalizeRecords;
    });
    Promise.all(promises).then(() => {
      resolve(responses);
    });
  });
}
