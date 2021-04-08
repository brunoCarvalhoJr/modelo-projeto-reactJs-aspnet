import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as turf from '@turf/turf';
import qs from 'querystring';
import L from 'leaflet';
import {
  SERVER,
  GEO_SERVER,
  ESTILO_TALHAO,
  ESTILO_IMOVEL,
  CENTROIDE_MAPA,
  ZOOM_MAXIMO_MAPA,
  ZOOM_MINIMO_MAPA,
  ZOOM_INICIAL_MAPA,
  GEO_SERVER_GEO_JSON,
} from './Constants';
import SideBar, { MapPainel } from './components/sidebar';
import { MapContainer } from './components/container';
import { Context } from './Context';
import { ToolBar } from './components/tools/ToolBar';
import { Zoom } from './components/tools/Zoom';
import IconeFazenda from 'assets/markers/farm-2.png';

import './map.css';

const car = 'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E';

const PageMapa = () => {
  const mapRef = useRef(null);
  const containerTopleft = useRef(null);
  const containerTopRight = useRef(null);
  const containerBottomLeft = useRef(null);
  const containerBottomRight = useRef(null);
  const [talhoes, setTalhoes] = useState([]);
  const [initialized, setInitialized] = useState(false);
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

      mapRef.current.addLayer(layersEdit);

      topleft(mapRef.current);
      topright(mapRef.current);
      bottomleft(mapRef.current);
      bottomright(mapRef.current);
      bindEvents(mapRef.current);
      addLayerEstado(mapRef.current);
      await addLayerImovel(mapRef.current);
      await addLayerTalhao();
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

  const _addLayerGEOJsonImovel = async style => {
    const { data } = await axios.get(`${SERVER}/fazenda`);
    var features = [];

    debugger;
    features.push(data.theGeom);
    const geoJSON = L.geoJSON(features, { style });

    const list = [];
    geoJSON.eachLayer(layer => {
      layers.addLayer(layer);
      list.push(layer);
    });
    return Promise.resolve({ layer: geoJSON, features, data });
  };

  const _addLayerGEOJsonTalhao = async fazenda => {
    const { data } = await axios.get(`${SERVER}/talhao/${fazenda}`);
    var features = [];

    data.forEach(talhao => {
      features.push(talhao.theGeom);
      const geoJSON = L.geoJSON(features, ESTILO_TALHAO);

      const list = [];
      geoJSON.eachLayer(layer => {
        layer.bindTooltip(talhao.nome);
        layers.addLayer(layer);
        list.push(layer);
      });
    });
  };

  const _addLayerGEOJsonLocalizacao = async fazenda => {
    const { data } = await axios.get(`${SERVER}/localizacao/${fazenda}`);
    data.forEach(localizacao => {
      const geoJSON = L.geoJSON(localizacao.theGeom, {
        style: ESTILO_TALHAO,
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon: marcadorMapa });
        },
      });
      geoJSON.eachLayer(layer => {
        layer.bindTooltip(localizacao.tipo);
        layers.addLayer(layer);
      });
    });
    // //const { features } = data;
    // const geoJSON = L.geoJSON(features, {
    //   style,
    //   pointToLayer: (feature, latlng) => {
    //     return L.marker(latlng, { icon: marcadorMapa });
    //   },
    // });

    // const list = [];
    // geoJSON.eachLayer(layer => {
    //   layer.bindTooltip(features[0].properties[property]);
    //   layers.addLayer(layer);
    //   list.push(layer);
    // });
    // setTalhoes(list);
    // return Promise.resolve({ layer: geoJSON, features });
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
  // END: methods internal

  const addLayerEstado = lmap => {
    const wmsOptions = {
      layers: 'agro:estado',
      format: 'image/png',
      transparent: true,
      tiled: true,
    };
    _addLayerWMS(lmap, wmsOptions);
  };

  const addLayerImovel = async lmap => {
    const { layer, data } = await _addLayerGEOJsonImovel(ESTILO_IMOVEL);
    await _addLayerGEOJsonTalhao(data.id, ESTILO_IMOVEL);
    await _addLayerGEOJsonLocalizacao(data.id);
    _zoomLayer(lmap, layer);
  };

  const addLayerTalhao = async () => {
    const queryTalhao = {
      typeName: 'agro:talhao',
      maxFeatures: 50,
      outputFormat: 'application/json',
    };
    // const { layer } = await _addLayerGEOJson(
    //   queryTalhao,
    //   ESTILO_TALHAO,
    //   'nome',
    // );
  };

  const bindEvents = lmap => {
    lmap.on(L.Draw.Event.CREATED, async ({ layer }) => {
      await addLayerEditing(layer);
    });
  };

  const addLayerEditing = async layer => {
    layer.on('edit', async ({ target }) => {
      await sendServer(target);
    });
    layersEdit.addLayer(layer);
    await sendServer(layer);
  };

  const sendServer = async layer => {
    const data = {
      Nome: 'T000',
      Numero: '2',
      ImovelId: 786,
      TheGeom: layer.toGeoJSON(),
    };
    const talhao = await axios.post(`${SERVER}/talhao`, data);
    // const talhaoLayer = L.geoJSON(talhao);
    //setTalhoes([...talhoes, talhaoLayer]);
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
    <div className="viewMap">
      <Context.Provider
        value={{
          map: mapRef.current,
          layersEdit,
        }}
      >
        <div className={`painel ${sidebarOpen ? '' : 'collapsed'}`}>
          <MapPainel onClickItem={onClickSideBar} talhoes={talhoes} />
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
