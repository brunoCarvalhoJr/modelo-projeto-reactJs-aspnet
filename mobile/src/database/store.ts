import Realm from 'realm';

import {Alternativa} from './schemas/AlternativaSchema';
import {Fazenda} from './schemas/FazendaSchema';
import {FormularioItem} from './schemas/FormularioItemSchema';
import {Formulario} from './schemas/FormularioSchema';
import {Foto} from './schemas/FotoSchema';
import {Localizacao} from './schemas/LocalizacaoSchema';
import {Login} from './schemas/LoginSchema';
import {OcorrenciaCategoria} from './schemas/OcorrenciaCategoriaSchema';
import {Ocorrencia} from './schemas/OcorrenciaSchema';
import {Pergunta} from './schemas/PerguntaSchema';
import {Talhao} from './schemas/TalhaoSchema';
import {FeatureCollection, Polygon} from 'geojson';

export const getRealm = () =>
  Realm.open({
    schema: [
      Alternativa.schema,
      Fazenda.schema,
      FormularioItem.schema,
      Formulario.schema,
      Foto.schema,
      Localizacao.schema,
      Login.schema,
      OcorrenciaCategoria.schema,
      Ocorrencia.schema,
      Pergunta.schema,
      Talhao.schema,
    ],
  });

export const getPoint = (longitude: number, latitude: number) => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Point',
    coordinates: [longitude, latitude],
  },
});

const getPolygon = (coordinates: number[][][]) => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: coordinates,
  },
});

export const geoJsonToGeometry = (
  geojson: string,
): {longitude: any; latitude: any}[] => {
  const feature = JSON.parse(geojson);
  const retorno: {longitude: any; latitude: any}[] = [];
  feature.geometry.coordinates[0].forEach((coordinates: any[]) => {
    const coordinate = Array.isArray(coordinates[0])
      ? coordinates[0]
      : coordinates;
    retorno.push({longitude: coordinate[0], latitude: coordinate[1]});
  });
  return retorno;
};

export const geoJsonToGeometryPoint = (
  geojson: string,
): {longitude: any; latitude: any} => {
  const feature = JSON.parse(geojson);
  return {
    longitude: feature.geometry.coordinates[0],
    latitude: feature.geometry.coordinates[1],
  };
};

export const getGeoJson = (geojson: string): FeatureCollection<Polygon> => {
  return {
    type: 'FeatureCollection',
    features: [JSON.parse(geojson)],
  };
};

const fazendaCoordenadas = [
  [
    [-44.954423904418945, -21.23086212608112],
    [-44.95824337005615, -21.23382229111734],
    [-44.96000289916992, -21.237542414259934],
    [-44.96180534362793, -21.240462445162578],
    [-44.959144592285156, -21.24034244503225],
    [-44.95528221130371, -21.240982444598473],
    [-44.954166412353516, -21.23986244353409],
    [-44.950776100158684, -21.23914243835628],
    [-44.94914531707764, -21.238182425982302],
    [-44.94858741760254, -21.235742366395215],
    [-44.94760036468506, -21.232742237786326],
    [-44.94751453399658, -21.2301020741205],
    [-44.95099067687988, -21.229182005980306],
    [-44.95236396789551, -21.228901984102787],
    [-44.954423904418945, -21.23086212608112],
  ],
];

const talhaoCoordenadas = [
  [
    [-44.959681034088135, -21.237302409147734],
    [-44.96159076690674, -21.240362445060764],
    [-44.96000289916992, -21.240242444849034],
    [-44.95903730392456, -21.24014244459796],
    [-44.95768547058105, -21.24048244517481],
    [-44.957170486450195, -21.239482441239588],
    [-44.9566125869751, -21.237822419730335],
    [-44.95631217956543, -21.237042403168623],
    [-44.95923042297363, -21.236342384791957],
    [-44.959681034088135, -21.237302409147734],
  ],
];

const talhaoCoordenadas2 = [
  [
    [-44.953715801239014, -21.230322089564552],
    [-44.947707653045654, -21.232642232448132],
    [-44.94762182235718, -21.230202081181204],
    [-44.95234251022339, -21.229001991977217],
    [-44.953715801239014, -21.230322089564552],
  ],
];

const talhaoCoordenadas3 = [
  [
    [-44.95088338851929, -21.23910243796551],
    [-44.952449798583984, -21.236622392541456],
    [-44.95328664779663, -21.236822397751244],
    [-44.95401620864868, -21.23974244291533],
    [-44.95088338851929, -21.23910243796551],
  ],
];

export const initialize = () => {
  getRealm().then((instanceDB) => {
    if (!instanceDB.objects<Fazenda>(Fazenda.schema.name).isEmpty()) {
      return;
    }
    instanceDB.write(() => {
      const geoJsonFazenda = getPolygon(fazendaCoordenadas);
      const geoJsonTalhao = getPolygon(talhaoCoordenadas);
      const geoJsonTalhao2 = getPolygon(talhaoCoordenadas2);
      const geoJsonTalhao3 = getPolygon(talhaoCoordenadas3);

      const fazenda = new Fazenda(
        'Fazenda',
        'CODIGO',
        20,
        JSON.stringify(geoJsonFazenda),
      );

      const talhao = new Talhao(
        'Talhão 01',
        '01',
        20,
        JSON.stringify(geoJsonTalhao),
      );

      fazenda.talhoes.push(talhao);

      const talhao2 = new Talhao(
        'Talhão 2',
        '02',
        20,
        JSON.stringify(geoJsonTalhao2),
      );

      fazenda.talhoes.push(talhao2);

      const talhao3 = new Talhao(
        'Talhão 3',
        '03',
        20,
        JSON.stringify(geoJsonTalhao3),
      );

      fazenda.talhoes.push(talhao3);

      instanceDB.create<Fazenda>(Fazenda.schema.name, fazenda);

      const ocorrenciaCategoria = new OcorrenciaCategoria(
        OcorrenciaCategoria.CODIGO.ANOTACAO.nome,
        OcorrenciaCategoria.CODIGO.ANOTACAO.tipo,
        OcorrenciaCategoria.CODIGO.ANOTACAO.ordem,
        OcorrenciaCategoria.CODIGO.ANOTACAO.icone,
      );

      const ocorrenciaAnotacao = new Ocorrencia(
        Ocorrencia.CODIGO.ANOTACAO.nome,
      );

      ocorrenciaCategoria.ocorrencias.push(ocorrenciaAnotacao);

      instanceDB.create<OcorrenciaCategoria>(
        OcorrenciaCategoria.schema.name,
        ocorrenciaCategoria,
      );

      const ocorrenciaDoenca = new OcorrenciaCategoria(
        OcorrenciaCategoria.CODIGO.DOENCA.nome,
        OcorrenciaCategoria.CODIGO.DOENCA.tipo,
        OcorrenciaCategoria.CODIGO.DOENCA.ordem,
        OcorrenciaCategoria.CODIGO.DOENCA.icone,
      );

      const ocorrenciaCercospora = new Ocorrencia(
        Ocorrencia.CODIGO.CERCOSPORA.nome,
      );

      const ocorrenciaFerrugem = new Ocorrencia(
        Ocorrencia.CODIGO.FERRUGEM.nome,
      );

      ocorrenciaDoenca.ocorrencias.push(ocorrenciaFerrugem);
      ocorrenciaDoenca.ocorrencias.push(ocorrenciaCercospora);

      instanceDB.create<OcorrenciaCategoria>(
        OcorrenciaCategoria.schema.name,
        ocorrenciaDoenca,
      );
    });
  });
};
