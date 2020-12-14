import React, { useEffect, useRef, useState } from 'react';
import {
  faDrawPolygon,
  faBug,
  faTrashAlt,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Draw, Modify, Snap, Select } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

import Map, { Button, Toolbar } from '../../components/OpenLayers';
import { DEFAULT_OPTIONS } from '../../components/OpenLayers/utils/constants';
import {
  basemapLayer,
  estadoLayer,
} from '../../components/OpenLayers/utils/layers';
import {
  drawingStyle,
  imovelStyle,
} from '../../components/OpenLayers/utils/styles';

// Ferramentas e fontes para criação e edição de talhões
const drawTalhaoSource = new VectorSource();
const drawTalhaoLayer = new VectorLayer({
  source: drawTalhaoSource,
  style: drawingStyle,
});
const drawTalhao = new Draw({
  source: drawTalhaoSource,
  type: 'Polygon',
});
const modifyTalhao = new Modify({ source: drawTalhaoSource });
const snapTalhao = new Snap({ source: drawTalhaoSource });

// Ferramentas e fontes para criação e edição de pragas
const drawPragaSource = new VectorSource();
const drawPragaLayer = new VectorLayer({
  source: drawPragaSource,
  style: drawingStyle,
});
const drawPraga = new Draw({
  source: drawPragaSource,
  type: 'Point',
});
const modifyPraga = new Modify({ source: drawPragaSource });
const snapPraga = new Snap({ source: drawPragaSource });

// Ferramentas para seleção de polígonos para exclusão
const selectSingleClick = new Select({});

// Lista de camadas
const layers = [basemapLayer, estadoLayer, drawTalhaoLayer, drawPragaLayer];

// Lista de botões e suas ferramentas
const toolbarButtons = [
  {
    id: 0,
    icon: <FontAwesomeIcon icon={faDrawPolygon} />,
    tooltip: 'Desenhar talhão',
    tools: [drawTalhao, snapTalhao, modifyTalhao],
  },
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faBug} />,
    tooltip: 'Marcar praga',
    tools: [drawPraga, snapPraga, modifyPraga],
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faTrashAlt} />,
    tooltip: 'Excluir feição',
    tools: [selectSingleClick],
  },
];

// const features = drawTalhaoSource.getFeatures();
function App() {
  const [toolbarButtonsState, setToolbarButtonsState] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const selectedButton = toolbarButtons.filter(
      item => item.id === toolbarButtonsState,
    );
    const notSelectedButtons = toolbarButtons.filter(
      item => item.id !== toolbarButtonsState,
    );

    selectedButton.forEach(element => {
      element.tools.forEach(tool => {
        mapRef.current.addInteraction(tool);
      });
    });
    notSelectedButtons.forEach(element => {
      element.tools.forEach(tool => {
        mapRef.current.removeInteraction(tool);
      });
    });
  }, [mapRef, toolbarButtonsState]);

  selectSingleClick.on('select', function (element) {
    try {
      element.selected.forEach(item => {
        switch (item.getGeometry().getType()) {
          case 'Point':
            drawPragaSource.removeFeature(item);
            break;
          case 'Polygon':
            drawTalhaoSource.removeFeature(item);
            break;
          default:
            break;
        }
      });
    } catch (error) {}
  });

  return (
    <div>
      <Map
        ref={mapRef}
        height={'800px'}
        width={'100%'}
        options={DEFAULT_OPTIONS}
        layers={layers}
      >
        <Toolbar>
          {toolbarButtons.map(item => (
            <Button
              key={item.id}
              active={toolbarButtonsState === item.id}
              onClick={() =>
                toolbarButtonsState === item.id
                  ? setToolbarButtonsState(null)
                  : setToolbarButtonsState(item.id)
              }
              {...item}
            ></Button>
          ))}
        </Toolbar>
      </Map>
    </div>
  );
}

export default App;
