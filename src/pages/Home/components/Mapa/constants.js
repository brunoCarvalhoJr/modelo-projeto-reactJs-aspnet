export const ARCGIS_WORLD_IMAGERY_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
export const GEOSERVER_URL = 'http://159.65.216.107:8088/geoserver/agro';
export const GEOSERVER_WMS_URL = `${GEOSERVER_URL}/wms`;
export const GEOSERVER_WFS_URL = `${GEOSERVER_URL}/wfs`;

export const options = {
  projection: 'EPSG:4326',
  center: [-43.990062, -19.873536],
  zoom: 6,
  minZoom: 5,
  maxZoom: 16,
};
