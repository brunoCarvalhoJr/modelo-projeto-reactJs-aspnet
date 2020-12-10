import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import L from 'leaflet';
import { Context } from '../../Context';
import './toolsConfig';
import { ESTILO_PADRAO_DESENHO } from '../../Constants';
import iconPadrao from 'assets/markers/algae.png';

const _estiloMarcador = icone => {
  return {
    iconUrl: icone,
    shadowAnchor: [20, 40],
    shadowSize: [40, 40],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [1, -25],
    tooltipAnchor: [16, -25],
  };
};

export const ToolBar = () => {
  const [desenho, setDesenho] = useState('');
  const [ferramentas, setFerramentas] = useState({});
  const [ferramentaAtual, setFerramentaAtual] = useState({
    tipo: '',
    status: 'AGUARDANDO',
  });
  const mapContext = React.useContext(Context);
  const { map, layersEdit } = mapContext;

  const bindEvents = () => {
    map.on(L.Draw.Event.CREATED, () => {
      setFerramentaAtual({ status: 'AGUARDANDO' });
    });
  };

  const ferramentasDesenho = () => {
    const POLIGONO = new L.Draw.Polygon(map, {
      shapeOptions: ESTILO_PADRAO_DESENHO,
    });
    const CIRCLEMARKER = new L.Draw.Marker(map, {
      icon: L.icon(_estiloMarcador(iconPadrao)),
    });
    setFerramentas({
      ...{ POLIGONO: POLIGONO, CIRCLEMARKER: CIRCLEMARKER },
    });
  };

  useEffect(() => {
    ferramentasDesenho();
    bindEvents();
  }, []);

  const desenhar = tipo => {
    const ferramenta = ferramentas[tipo];

    if (ferramenta) {
      ferramenta.enable();
      setFerramentaAtual({ status: 'INSERINDO' });
    }
  };

  const desenharPoligono = () => {
    const desenho = 'POLIGONO';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const desenharMarcadorPraga = () => {
    const desenho = 'CIRCLEMARKER';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const desenharMarcadorAnotacao = () => {
    const desenho = 'CIRCLEMARKER';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const cancelarDesenho = () => {
    const ferramenta = ferramentas[desenho];
    setDesenho('');
    ferramenta.disable();
    setFerramentaAtual({ status: 'AGUARDANDO' });
  };

  const editarGeometria = () => {
    layersEdit.eachLayer((layerEdit)=> {
      layerEdit.editing.enable();
    });
    setFerramentaAtual({ status: 'EDITANDO' });
  };

  const excluirGeometria = () => {
    setFerramentaAtual({ status: 'EDITANDO' });
  };

  const salvar = () => {
    layersEdit.eachLayer((layerEdit)=> {
      layerEdit.editing.disable();
    });
    setFerramentaAtual({ status: 'AGUARDANDO' });
  };

  return (
    <>
      {ferramentaAtual.status === 'AGUARDANDO' && (
        <>
          <div className="buttons-group buttons-right">
            <Button
              type="default"
              icon={<i class="fas fa-draw-polygon"></i>}
              size={'large'}
              onClick={desenharPoligono}
            />
            <Button
              type="default"
              icon={<i class="fas fa-pastafarianism"></i>}
              size={'large'}
              onClick={desenharMarcadorPraga}
            />
            <Button
              type="default"
              icon={<i class="fas fa-comment-alt"></i>}
              size={'large'}
              onClick={desenharMarcadorAnotacao}
            />
          </div>
          <div className="buttons-group buttons-right">
            <Button
              type="default"
              icon={<i class="fa fa-pencil"></i>}
              size={'large'}
              onClick={editarGeometria}
            />
          </div>
        </>
      )}
      {ferramentaAtual.status === 'EDITANDO' && (
        <div className="buttons-group buttons-right">
          <Button
            type="default"
            icon={<i class="fas fa-save"></i>}
            size={'large'}
            onClick={salvar}
          />
        </div>
      )}
      {ferramentaAtual.status === 'INSERINDO' && (
        <div className="buttons-group buttons-right">
          <Button
            type="default"
            icon={<i class="fas fa-redo"></i>}
            size={'large'}
            onClick={cancelarDesenho}
          />
        </div>
      )}
    </>
  );
};
