import React, { useCallback, useEffect, useState } from 'react';
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

function Mapa() {
  const [currentDrawing, setCurrentDrawing] = useState(-1);

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
      const wfsFeatures = await WFS.get(
        GEOSERVER_WFS_URL,
        'agro',
        ['fazenda'],
        equalTo('cod_imovel', 'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E'),
      );
      imovelSource.addFeatures(wfsFeatures);
    }
    init();
  });

  async function salvar() {
    const talhaoIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      'agro',
      'talhao',
      drawTalhaoSource.getFeatures(),
    );
    const pragaIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      'agro',
      'praga',
      drawPragaSource.getFeatures(),
    );
    const anotacaoIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      'agro',
      'anotacao',
      drawAnotacaoSource.getFeatures(),
    );
    console.log(talhaoIDs);
    console.log(pragaIDs);
    console.log(anotacaoIDs);
  }

  function onSelected(element) {
    element.selected.forEach(item => {
      switch (item.getGeometry()?.getType()) {
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
  }

  function onDrawPragaEnd(event) {
    console.log('praga', event);
  }

  function onDrawAnotacaoEnd(event) {
    console.log('anotacao', event);
  }

  return (
    <div>
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
