import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as turf from '@turf/turf';
import qs from 'querystring';
import L from 'leaflet';
import {
  GEO_SERVER,
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

import './map.css';

const car = 'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E';

const PageMapa = () => {
  const mapRef = useRef(null);
  const containerTopleft = useRef(null);
  const containerTopRight = useRef(null);
  const containerBottomLeft = useRef(null);
  const containerBottomRight = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [layers] = useState(new L.featureGroup());
  const [layersEdit] = useState(new L.featureGroup());
  const [sidebarOpen, setSideBarOpen] = useState(false);

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

  const _addLayerGEOJSON = async (lmap, query, property) => {
    const { data } = await axios.get(GEO_SERVER_GEO_JSON, {
      params: { ...query },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });

    const { features } = data;
    const geoJSON = L.geoJSON(data);
    geoJSON.bindTooltip(features[0].properties[property]);
    layers.addLayer(geoJSON);
    _zoomLayer(lmap, geoJSON);
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
    const queryImovel = {
      typeName: 'agro:fazenda',
      maxFeatures: 50,
      outputFormat: 'application/json',
      CQL_FILTER: `cod_imovel='${car}'`,
    };
    await _addLayerGEOJSON(lmap, queryImovel, 'cod_imovel');
  };

  const bindEvents = lmap => {
    lmap.on(L.Draw.Event.CREATED, async ({ layer }) => {
      await addLayerEditing(layer);
    });
  };

  const addLayerEditing = async layer => {
    layer.on('edit',  async ({ target }) => {
      await sendServer(target);
    });
    layersEdit.addLayer(layer);
    await sendServer(layer);
  };

  const sendServer = async (layer) => {
    await axios.post('/', layer.toGeoJSON());
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
          layersEdit,
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
