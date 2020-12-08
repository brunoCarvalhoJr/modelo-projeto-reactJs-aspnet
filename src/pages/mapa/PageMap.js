import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'querystring';
import L from 'leaflet';
import {
  GEO_SERVER,
  GEO_SERVER_GEO_JSON,
  CENTROIDE_MAPA,
  ZOOM_INICIAL_MAPA,
  ZOOM_MAXIMO_MAPA,
  ZOOM_MINIMO_MAPA,
} from './Constants';
import SideBar, { MapPainel } from './components/sidebar';
import { MapContainer } from './components/container';
import { Context } from './Context';
import { ToolBar } from './components/tools/ToolBar';
import { Zoom } from './components/tools/Zoom';
import iconPadrao from 'assets/markers/algae.png';

import './map.css';

const car = 'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E';

const PageMapa = () => {
  const mapRef = useRef(null);
  const containerTopleft = useRef(null);
  const containerTopRight = useRef(null);
  const containerBottomLeft = useRef(null);
  const containerBottomRight = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [layerEstado] = useState(new L.featureGroup());
  const [layerImovel] = useState(new L.featureGroup());
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [ferramentas, setFerramentas] = useState({});
  const [ferramentaAtual, setFerramentaAtual] = useState({
    tipo: '',
    ativa: false,
  });

  const onClickSideBar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const load = async () => {
      if (initialized) return;
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

      topleft(mapRef.current);
      topright(mapRef.current);
      bottomleft(mapRef.current);
      bottomright(mapRef.current);
      _addControlLayer(mapRef.current);
      _configurarFerramentasDesenho(mapRef.current);
      await adicionarGeometrias(mapRef.current);
      setInitialized(true);
    };
    load();
  }, []);

  const _addControlLayer = lmap => {
    const layerEstados = L.tileLayer.wms(GEO_SERVER, {
      layers: 'agro:estado',
      format: 'image/png',
      transparent: true,
      tiled: true,
    });

    layerEstado.layer = layerEstados;

    layerEstado.addLayer(layerEstados);

    lmap.addLayer(layerEstado);
  };

  const centralizarEm = (lmap, geometria, options = {}) => {
    const zoom = options.maxZoom || 13;
    if (geometria.getBounds) {
      lmap.fitBounds(geometria.getBounds());
    } else if (geometria.getLatLng) {
      lmap.setView(geometria.getLatLng(), zoom);
    } else if (geometria instanceof L.LatLng || geometria instanceof Array) {
      lmap.setView(geometria, zoom);
    }
  };

  const gerarEstiloMarcador = icone => {
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

  const adicionarGeometrias = async lmap => {
    const fazendaFeature = {
      typeName: 'agro:fazenda',
      maxFeatures: 50,
      outputFormat: 'application/json',
      CQL_FILTER: `cod_imovel='${car}'`,
    };

    const { data } = await axios.get(GEO_SERVER_GEO_JSON, {
      params: { ...fazendaFeature },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });

    const { features } = data;
    const geoJSONFazenda = L.geoJSON(data);
    geoJSONFazenda.bindTooltip(features[0].properties.cod_imovel);
    geoJSONFazenda.on('mouseover', function (e) {
      //this.openTooltip();
    });
    geoJSONFazenda.on('mouseout', function (e) {
      //this.closeTooltip();
    });
    layerImovel.addLayer(geoJSONFazenda);
    lmap.addLayer(layerImovel);
    centralizarEm(lmap, layerImovel);
  };

  const ESTILO_PADRAO_DESENHO = {
    color: '#0066D5',
    fillColor: '#0066D5',
    fillOpacity: 0.4,
    dashArray: '10,10',
    weight: 2,
  };

  const _configurarFerramentasDesenho = lmap => {
    const POLIGONO = new L.Draw.Polygon(lmap, {
      shapeOptions: ESTILO_PADRAO_DESENHO,
    });
    const padrao = L.icon(gerarEstiloMarcador(iconPadrao));
    const CIRCLEMARKER = new L.Draw.Marker(lmap, {
      icon: padrao,
    });
    setFerramentas({
      ...ferramentas,
      ...{ POLIGONO: POLIGONO, CIRCLEMARKER: CIRCLEMARKER },
    });

    setFerramentaAtual({ ...ferramentaAtual, ativa: false });

    lmap.on('draw:created', e => {
      mapRef.current.addLayer(e.layer);
    });
  };

  function _addControl(lmap, containerCurrent, position) {
    const container = L.control({
      position: position,
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create('div', `leaflet-control ${position}`);
      return divContainer;
    };
    container.addTo(lmap);
    containerCurrent.current = container;
  }

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
    <div className="viewMap">
      <Context.Provider
        value={{
          map: mapRef.current,
          tools: {
            ferramentas,
            ferramentaAtual,
            setFerramentaAtual,
          },
        }}
      >
        <div className={`painel ${sidebarOpen ? '' : 'collapsed'}`}>
          <MapPainel onClickItem={onClickSideBar} />
        </div>
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
      </Context.Provider>
    </div>
  );
};

export default PageMapa;
