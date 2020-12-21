import axios from 'axios';
import { GML, WFS } from 'ol/format';
import { parse } from 'ol/xml';

import { GEOSERVER_WFS_URL } from './constants';

export async function getFeatures(namespace, types, filter) {
  const featureRequest = new WFS().writeGetFeature({
    featureNS: namespace,
    featurePrefix: namespace,
    featureTypes: types,
    filter,
  });
  const payload = new XMLSerializer().serializeToString(featureRequest);
  const response = await axios.post(GEOSERVER_WFS_URL, payload, {
    headers: { 'Content-Type': 'text/xml' },
  });

  const features = new GML().readFeatures(response.data);
  return features;
}

export async function insertFeatures(namespace, type, features) {
  if (features.length <= 0) {
    return [];
  }
  const formatGML = new GML({
    featureNS: namespace,
    featureType: type,
  });
  const node = new WFS().writeTransaction(features, null, null, formatGML);
  const payload = new XMLSerializer().serializeToString(node);
  const response = await axios.post(GEOSERVER_WFS_URL, payload, {
    headers: { 'Content-Type': 'text/xml' },
  });
  const document = parse(response.data);
  const elements = document.getElementsByTagName('ogc:FeatureId');
  const ids = Array.from(elements).map(item =>
    parseInt(item.getAttribute('fid').replace(`${type}.`, '')),
  );
  return ids;
}
