import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

proj4.defs(
  'EPSG:4674',
  '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs',
);
register(proj4);
export const SIRGAS2000 = getProjection('EPSG:4674');

export const ARCGIS_WORLD_IMAGERY_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
export const GEOSERVER_URL = 'http://159.65.216.107:8088/geoserver/agro';
export const GEOSERVER_WMS_URL = `${GEOSERVER_URL}/wms`;
export const GEOSERVER_WFS_URL = `${GEOSERVER_URL}/wfs`;

export const DEFAULT_OPTIONS = {
  projection: 'EPSG:4326',
  center: [-43.990062, -19.873536],
  zoom: 6,
  minZoom: 5,
  maxZoom: 16,
};
