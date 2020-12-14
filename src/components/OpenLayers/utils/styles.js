import {
  Fill as FillStyle,
  Stroke as StrokeStyle,
  Icon as IconStyle,
  Style,
} from 'ol/style';

import marker from '../assets/marker.png';

export const drawingStyle = new Style({
  fill: new FillStyle({
    color: 'rgba(51, 136, 255, 0.2)',
  }),
  stroke: new StrokeStyle({
    color: '#3388ff',
    width: 2,
  }),
  image: new IconStyle({
    anchor: [0.5, 41],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: marker,
  }),
});

export const imovelStyle = new Style({
  stroke: new StrokeStyle({
    color: '#ffff00',
    width: 5,
    lineDash: [10, 10],
  }),
});
