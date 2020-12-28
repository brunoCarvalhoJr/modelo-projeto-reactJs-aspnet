import React, { useEffect, useRef, useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
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

import Map from 'components/OpenLayers';
import { DEFAULT_OPTIONS } from 'components/OpenLayers/utils/constants';
import { basemapLayer, estadoLayer } from 'components/OpenLayers/utils/layers';
import {
  talhaoStyle,
  pragaStyle,
  anotacaoStyle,
  imovelStyle,
} from 'components/OpenLayers/utils/styles';
import { getFeatures, insertFeatures } from 'components/OpenLayers/utils/wfs';

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
const buttons = [
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

function Mapa({ car }) {
  const [buttonsState, setButtonsState] = useState(null);
  const [isModalPragaVisible, setIsModalPragaVisible] = useState(false);
  const [isModalAnotacaoVisible, setIsModalAnotacaoVisible] = useState(false);
  const [currentPraga, setCurrentPraga] = useState(null);
  const [currentAnotacao, setCurrentAnotacao] = useState(null);

  const mapRef = useRef(null);
  const formPragaRef = useRef(null);
  const formAnotacaoRef = useRef(null);

  useEffect(() => {
    async function init() {
      const features = await getFeatures(
        'agro',
        ['fazenda'],
        equalTo('cod_imovel', car),
      );
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
    const selectedButton = buttons.filter(item => item.id === buttonsState);
    const notSelectedButtons = buttons.filter(item => item.id !== buttonsState);

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
  }, [mapRef, buttonsState]);

  drawPraga.on('drawend', function (element) {
    setIsModalPragaVisible(true);
    setCurrentPraga(element.feature);
  });

  drawAnotacao.on('drawend', function (element) {
    setIsModalAnotacaoVisible(true);
    setCurrentAnotacao(element.feature);
  });

  function handleSalvarPraga(values) {
    currentPraga.setProperties(values);
    setIsModalPragaVisible(false);
    setCurrentPraga(null);
    formPragaRef.current.resetFields();
  }

  function handleSalvarAnotacao(values) {
    currentAnotacao.setProperties(values);
    setIsModalAnotacaoVisible(false);
    setCurrentAnotacao(null);
    formAnotacaoRef.current.resetFields();
  }

  async function salvar() {
    const talhaoIDs = await insertFeatures(
      'agro',
      'talhao',
      drawTalhaoSource.getFeatures(),
    );
    const pragaIDs = await insertFeatures(
      'agro',
      'praga',
      drawPragaSource.getFeatures(),
    );
    const anotacaoIDs = await insertFeatures(
      'agro',
      'anotacao',
      drawAnotacaoSource.getFeatures(),
    );
    console.log(talhaoIDs);
    console.log(pragaIDs);
    console.log(anotacaoIDs);
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
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <Form
          name="praga"
          initialValues={{ remember: false }}
          onFinish={handleSalvarPraga}
          ref={formPragaRef}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Raio"
            name="raio"
            rules={[
              {
                required: true,
                message: 'Por favor digite o raio da área afetada pela praga.',
              },
            ]}
          >
            <Input addonAfter="metros" />
          </Form.Item>
          <Form.Item
            name={'conteudo'}
            label="Considerações sobre a praga"
            labelCol={{ span: 24 }}
          >
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Anotações sobre o ponto"
        visible={isModalAnotacaoVisible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <Form
          name="anotacao"
          initialValues={{ remember: false }}
          onFinish={handleSalvarAnotacao}
          ref={formAnotacaoRef}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Raio"
            name="raio"
            rules={[
              {
                required: true,
                message: 'Por favor digite o raio da área da anotação.',
              },
            ]}
          >
            <Input addonAfter="metros" />
          </Form.Item>
          <Form.Item
            name={'conteudo'}
            label="Considerações"
            labelCol={{ span: 24 }}
          >
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Map
        ref={mapRef}
        height={'700px'}
        width={'100%'}
        options={DEFAULT_OPTIONS}
        layers={layers}
      >
        <Map.Toolbar>
          {buttons.map(item => (
            <Map.Toolbar.Button
              key={item.id}
              active={buttonsState === item.id}
              onClick={() =>
                buttonsState === item.id
                  ? setButtonsState(null)
                  : setButtonsState(item.id)
              }
              {...item}
            ></Map.Toolbar.Button>
          ))}
        </Map.Toolbar>
      </Map>
      <Button type="primary" onClick={salvar}>
        Salvar
      </Button>
    </div>
  );
}

export default Mapa;
