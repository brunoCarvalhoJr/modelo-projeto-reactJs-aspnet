import { Tile as TileLayer } from 'ol/layer';
import { XYZ as XYZSource, TileWMS as TileWMSSource } from 'ol/source';

import {
  ARCGIS_WORLD_IMAGERY_URL,
  GEOSERVER_WMS_URL,
  SIRGAS2000,
} from './constants';

export const basemapLayer = new TileLayer({
  source: new XYZSource({
    url: ARCGIS_WORLD_IMAGERY_URL,
  }),
});

export const estadoLayer = new TileLayer({
  title: 'Estados',
  source: new TileWMSSource({
    url: GEOSERVER_WMS_URL,
    params: { LAYERS: 'agro:estado', TILED: true },
  }),
});
