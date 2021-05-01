import RNFS from 'react-native-fs';
import { subscribe, unzipAssets } from 'react-native-zip-archive';
import LocalStorage from '../database/localStorage';

const extrairMapa = (progressCallback) =>
  new Promise((resolve, reject) => {
    // Função para o retorno de progresso da extração
    const progressoExtracao = subscribe(({ progress }) => {
      if (progressCallback) progressCallback(progress);
    });

    // Extrai o arquivo .zip
    unzipAssets('mapa.zip', `${RNFS.DocumentDirectoryPath}/mapa`)
      .then(() => {
        // Seta variável para confirmar que foi extraído até o final
        LocalStorage.setItem('MAPA_EXTRAIDO', true);
        console.log('MAPA_EXTRAIDO');
        progressoExtracao.remove();
        resolve();
      })
      .catch((err) => {
        progressoExtracao.remove();
        console.log(err);
        reject(err);
      });
  });

export { extrairMapa };

const extrairMapaWithCallback = (callback, progress) => {
  extrairMapa(progress)
    .then(() => callback())
    .catch(() => {
      callback();
    });
};

export default class FileUtils {
  static async extrairMapaAssets(progressExtracao, callback) {
    const extraido = await LocalStorage.getItem('MAPA_EXTRAIDO');

    // Verifica se a extração foi concluída com sucesso.
    if (extraido) {
      callback();
    } else {
      extrairMapaWithCallback(callback, progressExtracao);
    }
  }
}
