import React, { useEffect, useRef, useState } from 'react';
import api from '../../http/api';
import L from 'leaflet';
import { Modal, Card } from 'antd';
import {
  GEO_SERVER,
  ESTILO_TALHAO,
  ESTILO_IMOVEL,
  CENTROIDE_MAPA,
  ZOOM_MAXIMO_MAPA,
  ZOOM_MINIMO_MAPA,
  ZOOM_INICIAL_MAPA,
} from './Constants';
import SideBar from './components/sidebar';
import { MapContainer } from './components/container';
import MapModal from './components/modal';
import TalhaoModal from './components/talhao';
import { Context } from './Context';
import { ToolBar } from './components/tools/ToolBar';
import { Zoom } from './components/tools/Zoom';
import IconeFazenda from 'assets/markers/field.png';
import IconeComment from 'assets/markers/comment-map-icon.png';
import IconeOcorrencia from 'assets/markers/skull.png';
import { withRouter } from 'react-router-dom';

import './map.css';

const PageMapa = ({ match }) => {
  const mapRef = useRef(null);
  const containerTopleft = useRef(null);
  const containerTopRight = useRef(null);
  const containerBottomLeft = useRef(null);
  const containerBottomRight = useRef(null);
  const [fazenda, setFazenda] = useState();
  const [cadastroTalhao, setCadastroTalhao] = useState();
  const [talhaoLayer, setTalhaoLayer] = useState();
  const [initialized, setInitialized] = useState(false);
  const [detalhe, setDetalhe] = useState();
  const [layers] = useState(new L.featureGroup());
  const [layersEdit] = useState(new L.featureGroup());
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const marcadorMapa = new L.icon({
    iconUrl: IconeFazenda,
    shadowAnchor: [20, 40],
    shadowSize: [40, 40],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [1, -25],
    tooltipAnchor: [16, -25],
  });

  const marcadorAnotacao = new L.icon({
    iconUrl: IconeComment,
    shadowAnchor: [20, 40],
    shadowSize: [40, 40],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [1, -25],
    tooltipAnchor: [16, -25],
  });

  const marcadorOcorrencia = new L.icon({
    iconUrl: IconeOcorrencia,
    shadowAnchor: [20, 40],
    shadowSize: [40, 40],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [1, -25],
    tooltipAnchor: [16, -25],
  });

  const onClickSideBar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTalhaoModalVisible, setIsTalhaoModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showTalhaoModal = () => {
    setIsTalhaoModalVisible(true);
  };

  const setValues = (dadosTalhao) => {
    setCadastroTalhao(dadosTalhao);
  };

  const handleTalhaoOk = async () => {
    const fazenda = localStorage.getItem('@RNAuth:fazenda');
    const data = {
      Nome: cadastroTalhao.nome,
      Numero: cadastroTalhao.numero,
      FazendaId: fazenda,
      TheGeom: cadastroTalhao.layer.toGeoJSON(),
    };
    await api.post(`/talhao`, data);
    layersEdit.addLayer(cadastroTalhao.layer);
    setIsTalhaoModalVisible(false);
    window.location.reload();
  };

  const handleTalhaoCancel = () => {
    setIsTalhaoModalVisible(false);
    setCadastroTalhao({})
    setTalhaoLayer({})
  };

  useEffect(() => {
    const load = async () => {
      if (initialized) return;
      const {
        params: { fazenda }
      } = match;
      const googleSat = L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        },
      );

      mapRef.current = L.map('map', {
        zoomControl: false,
        layers: [googleSat],
      })
        .setView(CENTROIDE_MAPA, ZOOM_INICIAL_MAPA)
        .setMaxZoom(ZOOM_MAXIMO_MAPA)
        .setMinZoom(ZOOM_MINIMO_MAPA);

      mapRef.current.addLayer(layersEdit);

      topleft(mapRef.current);
      topright(mapRef.current);
      bottomleft(mapRef.current);
      bottomright(mapRef.current);
      bindEvents(mapRef.current);
      addLayerEstado(mapRef.current);
      await addLayerImovel(fazenda, mapRef.current);
      setInitialized(true);
    };
    load();
  }, []);

  // methods internal
  const _addLayerWMS = (lmap, wmsOptions) => {
    const layer = L.tileLayer.wms(GEO_SERVER, wmsOptions);
    layers.layer = layer;
    layers.addLayer(layer);
    lmap.addLayer(layers);
  };

  const _addLayerGEOJsonImovel = async (fazendaId) => {
    const { data } = await api.get(`/fazenda/${fazendaId}`);


    const geoJSONImovel = L.geoJSON(data.theGeom, ESTILO_IMOVEL);

    geoJSONImovel.eachLayer(layer => {
      layers.addLayer(layer);
    });

    data.talhoes.forEach(talhao => {
      const geoJSON = L.geoJSON(talhao.theGeom, ESTILO_TALHAO);
      const geoJSONCentro = L.geoJSON(talhao.centro, {
        style: ESTILO_TALHAO,
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon: marcadorMapa });
        },
      });
      geoJSONCentro.eachLayer(layer => { layers.addLayer(layer); });

      geoJSON.eachLayer(layer => {
        layer.bindTooltip(talhao.nome);
        layers.addLayer(layer);
        talhao.pontos.forEach(localizacao => {
          localizacao.theGeom.properties = {
            id: localizacao.id,
          };
          const geoJSON = L.geoJSON(localizacao.theGeom, {
            style: ESTILO_TALHAO,
            pointToLayer: (feature, latlng) => {
              if (localizacao.tipo === 'ANOTACAO')
                return L.marker(latlng, { icon: marcadorAnotacao });
              return L.marker(latlng, { icon: marcadorOcorrencia });
            },
          });
          geoJSON.eachLayer(layer => {
            var props = (layer.feature.properties =
              layer.feature.properties || {});
            props.id = localizacao.id;
            layer.bindTooltip(localizacao.tipo);
            layer.on('click', function (event) {
              var feature = event.sourceTarget.feature;
              detalheLocalizacao(feature.properties.id);
            });
            layers.addLayer(layer);
          });
        });
      });
    });

    return Promise.resolve({ layer: geoJSONImovel, data });
  };

  const detalheLocalizacao = async localizacao => {
    const { data } = await api.get(
      `/localizacao/${localizacao}/detalhe`,
    );
    setDetalhe(data)
    showModal();
  };

  const _zoomLayer = (lmap, geometria, options = {}) => {
    const zoom = options.maxZoom || 13;
    if (geometria.getBounds) {
      lmap.fitBounds(geometria.getBounds());
    } else if (geometria.getLatLng) {
      lmap.setView(geometria.getLatLng(), zoom);
    } else if (geometria instanceof L.LatLng || geometria instanceof Array) {
      lmap.setView(geometria, zoom);
    }
  };

  const _addControl = (lmap, containerCurrent, position) => {
    const container = L.control({
      position: position,
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create('div', `leaflet-control ${position}`);
      return divContainer;
    };
    container.addTo(lmap);
    containerCurrent.current = container;
  };

  const addLayerEstado = lmap => {
    const wmsOptions = {
      layers: 'agro:estado',
      format: 'image/png',
      transparent: true,
      tiled: true,
    };
    _addLayerWMS(lmap, wmsOptions);
  };

  const addLayerImovel = async (fazendaId, lmap) => {
    const { layer, data } = await _addLayerGEOJsonImovel(fazendaId);
    setFazenda(data);
    localStorage.setItem('@RNAuth:fazenda', data.id);
    _zoomLayer(lmap, layer);
  };

  const bindEvents = lmap => {
    lmap.on(L.Draw.Event.CREATED, async ({ layer }) => {
      await addLayerEditing(layer);
      setTalhaoLayer(layer);
      setValues({
        'nome': 'Talh??o',
        'layer': layer
      });
      showTalhaoModal();
    });
  };

  const addLayerEditing = async layer => {
    layer.on('edit', async ({ target }) => {
      setTalhaoLayer(target);
      setValues({
        'nome': 'Talh??o',
        'layer': layer
      });
      showTalhaoModal();
    });
  };

  const topleft = lmap => {
    _addControl(lmap, containerTopleft, 'topleft');
  };

  const topright = lmap => {
    _addControl(lmap, containerTopRight, 'topright');
  };

  const bottomleft = lmap => {
    _addControl(lmap, containerBottomLeft, 'bottomleft');
  };

  const bottomright = lmap => {
    _addControl(lmap, containerBottomRight, 'bottomright');
  };

  return (
    <>
      <Card title={fazenda && fazenda.nome}>
        <div className="viewMap">
          <Context.Provider
            value={{
              map: mapRef.current,
              layersEdit,
            }}
          >
            <div id="map">
              {initialized && containerTopleft && (
                <MapContainer container={containerTopleft}>
                  <SideBar onClickItem={onClickSideBar} />
                </MapContainer>
              )}
              {initialized && containerTopRight && (
                <MapContainer container={containerTopRight}>
                  <Zoom
                    initialValue={ZOOM_INICIAL_MAPA}
                    max={ZOOM_MAXIMO_MAPA}
                    min={ZOOM_MINIMO_MAPA}
                  />
                  <ToolBar />
                </MapContainer>
              )}
              {initialized && containerBottomLeft && (
                <MapContainer container={containerBottomLeft}></MapContainer>
              )}
              {initialized && containerBottomRight && (
                <MapContainer container={containerBottomRight}></MapContainer>
              )}
            </div>
            <Modal
              width={720}
              title="Detalhes"
              destroyOnClose={true}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <MapModal detalhe={detalhe} />
            </Modal>
            <Modal
              width={720}
              title="Dados Talh??o"
              destroyOnClose={true}
              visible={isTalhaoModalVisible}
              onOk={handleTalhaoOk}
              onCancel={handleTalhaoCancel}
            >
              <TalhaoModal layer={talhaoLayer} setValues={setValues} />
            </Modal>
          </Context.Provider>
        </div>
      </Card>
    </>
  );
};

export default withRouter(PageMapa);
