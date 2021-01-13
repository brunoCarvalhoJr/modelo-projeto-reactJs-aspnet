import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { equalTo } from 'ol/format/filter';
import { Map, WFS } from 'ol-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDrawPolygon,
  faBug,
  faTrashAlt,
  faCommentAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

import { GEOSERVER_WFS_URL, options } from './constants';
import {
  drawAnotacaoSource,
  drawPragaSource,
  drawTalhaoSource,
  imovelSource,
  esriWorldImagery,
  estadoLayer,
} from './sources';
import { anotacaoStyle, imovelStyle, pragaStyle, talhaoStyle } from './styles';
import 'ol-kit/dist/index.css';

function Mapa({id}) {
  const [isModalPragaVisible, setIsModalPragaVisible] = useState(false);
  const [isModalAnotacaoVisible, setIsModalAnotacaoVisible] = useState(false);
  const [currentPraga, setCurrentPraga] = useState(null);
  const [currentAnotacao, setCurrentAnotacao] = useState(null);
  const [currentDrawing, setCurrentDrawing] = useState(-1);

  const formPragaRef = useRef(null);
  const formAnotacaoRef = useRef(null);

  const changeCurrentDrawing = useCallback(
    current => {
      if (currentDrawing === current) {
        setCurrentDrawing(-1);
      } else {
        setCurrentDrawing(current);
      }
    },
    [currentDrawing],
  );

  useEffect(() => {
    async function init() {
      const wfsFeatures = await WFS.getFeatures(
        GEOSERVER_WFS_URL,
        'agro',
        ['fazenda'],
        equalTo('id', id),
      );

      imovelSource.addFeatures(wfsFeatures);

    }
    init();
  });

  async function salvar() {
    const responseTalhao = await WFS.upsertFeatures(
      GEOSERVER_WFS_URL,
      'agro',
      'talhao',
      drawTalhaoSource.getFeatures(),
      'CRS:84',
    );
    const responsePraga = await WFS.upsertFeatures(
      GEOSERVER_WFS_URL,
      'agro',
      'praga',
      drawPragaSource.getFeatures(),
      'CRS:84',
    );
    const responseAnotacao = await WFS.upsertFeatures(
      GEOSERVER_WFS_URL,
      'agro',
      'anotacao',
      drawAnotacaoSource.getFeatures(),
      'CRS:84',
    );
    console.log('Salvo talhão: ', responseTalhao);
    console.log('Salvo praga: ', responsePraga);
    console.log('Salvo anotação: ', responseAnotacao);
  }

  function onSelected(event) {
    event.selected.forEach(async item => {
      try {
        drawTalhaoSource.removeFeature(item);
        if (item.getId()) {
          const responseTalhao = await WFS.deleteFeatures(
            GEOSERVER_WFS_URL,
            'agro',
            'talhao',
            [item],
            'CRS:84',
          );
          console.log('Excluído talhão: ', responseTalhao);
        }
      } catch {}
      try {
        drawPragaSource.removeFeature(item);
        if (item.getId()) {
          const responsePraga = await WFS.deleteFeatures(
            GEOSERVER_WFS_URL,
            'agro',
            'praga',
            [item],
            'CRS:84',
          );
          console.log('Excluído praga: ', responsePraga);
        }
      } catch {}
      try {
        drawAnotacaoSource.removeFeature(item);
        if (item.getId()) {
          const responseAnotacao = await WFS.deleteFeatures(
            GEOSERVER_WFS_URL,
            'agro',
            'anotacao',
            [item],
            'CRS:84',
          );
          console.log('Excluído anotação: ', responseAnotacao);
        }
      } catch {}
    });
  }

  function onDrawTalhaoEnd(event) {
    event.feature.setProperties({"id_imovel_car": id})
  }

  function onDrawPragaEnd(event) {
    event.feature.setProperties({"id_imovel_car": id})
    setIsModalPragaVisible(true);
    setCurrentPraga(event.feature);
  }

  function onDrawAnotacaoEnd(event) {
    event.feature.setProperties({"id_imovel_car": id})
    setIsModalAnotacaoVisible(true);
    setCurrentAnotacao(event.feature);
  }

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
      <Map height={'700px'} width={'100%'}>
        <Map.Toolbar>
          <Map.Toolbar.Button
            active={currentDrawing === 0}
            onClick={() => {
              changeCurrentDrawing(0);
            }}
            tooltip={'Desenhar talhão'}
            icon={<FontAwesomeIcon icon={faDrawPolygon} />}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 1}
            onClick={() => {
              changeCurrentDrawing(1);
            }}
            tooltip={'Demarcar praga'}
            icon={<FontAwesomeIcon icon={faBug} />}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 2}
            onClick={() => {
              changeCurrentDrawing(2);
            }}
            tooltip={'Demarcar anotação'}
            icon={<FontAwesomeIcon icon={faCommentAlt} />}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 3}
            onClick={() => {
              changeCurrentDrawing(3);
            }}
            tooltip={'Excluir geometrias'}
            icon={<FontAwesomeIcon icon={faTrashAlt} />}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={false}
            onClick={salvar}
            tooltip={'Salvar'}
            icon={<FontAwesomeIcon icon={faSave} />}
          ></Map.Toolbar.Button>
        </Map.Toolbar>

        <Map.View options={options}></Map.View>

        <Map.Layer.Tile source={esriWorldImagery}></Map.Layer.Tile>
        <Map.Layer.Tile source={estadoLayer}></Map.Layer.Tile>

        <Map.Layer.Vector
          source={imovelSource}
          style={imovelStyle}
          fit={true}
        ></Map.Layer.Vector>

        <Map.Layer.Vector
          source={drawTalhaoSource}
          style={talhaoStyle}
        ></Map.Layer.Vector>
        <Map.Layer.Vector
          source={drawPragaSource}
          style={pragaStyle}
        ></Map.Layer.Vector>
        <Map.Layer.Vector
          source={drawAnotacaoSource}
          style={anotacaoStyle}
        ></Map.Layer.Vector>

        {currentDrawing === 0 && (
          <>
            <Map.Interaction.Draw
              source={drawTalhaoSource}
              type={'Polygon'}
              onDrawEnd={onDrawTalhaoEnd}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawTalhaoSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 1 && (
          <>
            <Map.Interaction.Draw
              source={drawPragaSource}
              type={'Point'}
              onDrawEnd={onDrawPragaEnd}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawPragaSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 2 && (
          <>
            <Map.Interaction.Draw
              source={drawAnotacaoSource}
              type={'Point'}
              onDrawEnd={onDrawAnotacaoEnd}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawAnotacaoSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 3 && (
          <Map.Interaction.Select
            onSelected={onSelected}
          ></Map.Interaction.Select>
        )}
      </Map>
    </div>
  );
}

export default Mapa;
