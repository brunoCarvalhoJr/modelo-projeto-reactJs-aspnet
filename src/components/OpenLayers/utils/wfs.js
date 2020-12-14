import axios from 'axios';
import { GML, WFS } from 'ol/format';
import { Vector } from 'ol/source';

import { GEOSERVER_WFS_URL } from './constants';

export async function getFeatures(filter) {
  const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:4326',
    featureNS: 'agro',
    featurePrefix: 'agro',
    featureTypes: ['fazenda'],
    filter,
  });

  const response = await axios.post(
    GEOSERVER_WFS_URL,
    new XMLSerializer().serializeToString(featureRequest),
    {
      headers: { 'Content-Type': 'text/xml' },
    },
  );

  const features = new GML().readFeatures(response.data);
  return features;
}
