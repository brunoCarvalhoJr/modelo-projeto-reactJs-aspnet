import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input } from 'antd';
import {
  faDrawPolygon,
  faBug,
  faTrashAlt,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Draw, Modify, Snap, Select } from 'ol/interaction';
import { equalTo } from 'ol/format/filter';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

import Map, { Button, Toolbar } from '../../components/OpenLayers';
import { DEFAULT_OPTIONS } from '../../components/OpenLayers/utils/constants';
import {
  basemapLayer,
  estadoLayer,
} from '../../components/OpenLayers/utils/layers';
import {
  talhaoStyle,
  pragaStyle,
  anotacaoStyle,
  imovelStyle,
} from '../../components/OpenLayers/utils/styles';
import { getFeatures } from 'components/OpenLayers/utils/wfs';

const { TextArea } = Input;

// fontes para exibição de imóveis
const imovelSource = new VectorSource();
const imovelLayer = new VectorLayer({
  source: imovelSource,
  style: imovelStyle,
});

// Ferramentas e fontes para criação e edição de talhões
const drawTalhaoSource = new VectorSource();
const drawTalhaoLayer = new VectorLayer({
  source: drawTalhaoSource,
  style: talhaoStyle,
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
  style: pragaStyle,
});
const drawPraga = new Draw({
  source: drawPragaSource,
  type: 'Point',
});
const modifyPraga = new Modify({ source: drawPragaSource });
const snapPraga = new Snap({ source: drawPragaSource });

// Ferramentas e fontes para criação e edição de anotações
const drawAnotacaoSource = new VectorSource();
const drawAnotacaoLayer = new VectorLayer({
  source: drawAnotacaoSource,
  style: anotacaoStyle,
});
const drawAnotacao = new Draw({
  source: drawAnotacaoSource,
  type: 'Point',
});
const modifyAnotacao = new Modify({ source: drawAnotacaoSource });
const snapAnotacao = new Snap({ source: drawAnotacaoSource });

// Ferramentas para seleção de polígonos para exclusão
const selectSingleClick = new Select({});

// Lista de camadas
const layers = [
  basemapLayer,
  estadoLayer,
  imovelLayer,
  drawTalhaoLayer,
  drawPragaLayer,
  drawAnotacaoLayer,
];

// Lista de botões e suas ferramentas
const Buttons = [
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
    icon: <FontAwesomeIcon icon={faCommentAlt} />,
    tooltip: 'Marcar anotação',
    tools: [drawAnotacao, snapAnotacao, modifyAnotacao],
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faTrashAlt} />,
    tooltip: 'Excluir feição',
    tools: [selectSingleClick],
  },
];

const car = 'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E';
// const features = drawTalhaoSource.getFeatures();
function App() {
  const [ButtonsState, setButtonsState] = useState(null);
  const [isModalPragaVisible, setIsModalPragaVisible] = useState(false);
  const [isModalAnotacaoVisible, setIsModalAnotacaoVisible] = useState(false);
  const [currentPraga, setCurrentPraga] = useState(null);
  const [currentAnotacao, setCurrentAnotacao] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    async function init() {
      const features = await getFeatures(equalTo('cod_imovel', car));
      imovelSource.addFeatures(features);
      mapRef.current.getView().fit(imovelSource.getExtent(), {
        size: mapRef.current.getSize(),
        padding: [50, 50, 50, 50],
        duration: 2500,
      });
    }
    init();
  });

  useEffect(() => {
    const selectedButton = Buttons.filter(item => item.id === ButtonsState);
    const notSelectedButtons = Buttons.filter(item => item.id !== ButtonsState);

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
  }, [mapRef, ButtonsState]);

  drawPraga.on('drawend', function (element) {
    setIsModalPragaVisible(true);
    setCurrentPraga(element);
  });

  drawAnotacao.on('drawend', function (element) {
    setIsModalAnotacaoVisible(true);
    setCurrentAnotacao(element);
  });

  function handleOkPraga() {
    setIsModalPragaVisible(false);
    setCurrentPraga(null);
  }

  function handleOkAnotacao() {
    setIsModalAnotacaoVisible(false);
  }

  selectSingleClick.on('select', function (element) {
    try {
      element.selected.forEach(item => {
        switch (item.getGeometry().getType()) {
          case 'Point':
            try {
              drawPragaSource.removeFeature(item);
            } catch (error) {}
            try {
              drawAnotacaoSource.removeFeature(item);
            } catch (error) {}
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
      <Modal
        title="Dados da praga"
        visible={isModalPragaVisible}
        onOk={handleOkPraga}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Input placeholder="Raio" addonAfter="m2" />

        <TextArea rows={4} placeholder="Digite aqui suas considerações..." />
      </Modal>
      <Modal
        title="Anotações sobre o ponto"
        visible={isModalAnotacaoVisible}
        onOk={handleOkAnotacao}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Input placeholder="Raio" addonAfter="m2" />
        <TextArea rows={4} placeholder="Digite aqui suas anotações..." />
      </Modal>
      <Map
        ref={mapRef}
        height={'800px'}
        width={'100%'}
        options={DEFAULT_OPTIONS}
        layers={layers}
      >
        <Toolbar>
          {Buttons.map(item => (
            <Button
              key={item.id}
              active={ButtonsState === item.id}
              onClick={() =>
                ButtonsState === item.id
                  ? setButtonsState(null)
                  : setButtonsState(item.id)
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
