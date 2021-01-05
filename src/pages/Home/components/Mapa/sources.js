import { Vector as VectorSource } from 'ol/source';
import { XYZ as XYZSource, TileWMS as TileWMSSource } from 'ol/source';
import { GEOSERVER_WMS_URL, ARCGIS_WORLD_IMAGERY_URL } from './constants';

export const esriWorldImagery = new XYZSource({
  url: ARCGIS_WORLD_IMAGERY_URL,
});

export const estadoLayer = new TileWMSSource({
  url: GEOSERVER_WMS_URL,
  params: { LAYERS: 'agro:estado', TILED: true },
});

export const imovelSource = new VectorSource();
export const drawTalhaoSource = new VectorSource();
export const drawPragaSource = new VectorSource();
export const drawAnotacaoSource = new VectorSource();
