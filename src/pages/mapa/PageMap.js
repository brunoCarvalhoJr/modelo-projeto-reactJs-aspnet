import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  GEO_SERVER,
  CENTROIDE_MAPA,
  ZOOM_INICIAL_MAPA,
  ZOOM_MAXIMO_MAPA,
  ZOOM_MINIMO_MAPA,
} from "./Constants";
import SideBar, { MapPainel } from "./components/sidebar";
import { MapContainer } from "./components/container";
import { Context } from "./Context";
import { ToolBar } from "./components/tools/ToolBar";
import { Zoom } from "./components/tools/Zoom";

import "./map.css";

const car = "MG-3108008-AAEEAB404821459BB17C92EB0C235B5E";

const PageMapa = () => {
  const mapRef = useRef(null);
  const containerTopleft = useRef(null);
  const containerTopRight = useRef(null);
  const containerBottomLeft = useRef(null);
  const containerBottomRight = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [layerEstado] = useState(new L.featureGroup());
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const onClickSideBar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (initialized) return;

    const googleSat = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    mapRef.current = L.map("map", {
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
    addControlLayer(mapRef.current);
    setInitialized(true);
  }, []);

  const addControlLayer = (lmap) => {
    const layerEstados = L.tileLayer.wms(GEO_SERVER, {
      layers: "agro:estado",
      format: "image/png",
      transparent: true,
      tiled: true,
    });

    const layerCar = L.tileLayer.wms(GEO_SERVER, {
      layers: "agro:fazenda",
      format: "image/png",
      transparent: true,
      tiled: true,
      cql_filter: `cod_imovel = '${car}'`,
    });

    layerEstado.layer = layerEstados;

    layerEstado.addLayer(layerEstados);

    lmap.addLayer(layerEstado);
    lmap.addLayer(layerCar);
  };

  function addControl(lmap, containerCurrent, position) {
    const container = L.control({
      position: position,
    });
  
    container.onAdd = function () {
      var divContainer = L.DomUtil.create("div", `leaflet-control ${position}`);
      return divContainer;
    };
    container.addTo(lmap);
    containerCurrent.current = container;
  }

  const topleft = (lmap) => {
    addControl(lmap, containerTopleft, 'topleft');
  };

  const topright = (lmap) => {
    addControl(lmap, containerTopRight, 'topright');
  };

  const bottomleft = (lmap) => {
    addControl(lmap, containerBottomLeft, 'bottomleft');
  };


  const bottomright = (lmap) => {
    addControl(lmap, containerBottomRight, 'bottomright');
  };

  return (
    <div className="viewMap">
      <Context.Provider value={{ map: mapRef.current }}>
        <div className={`painel ${sidebarOpen ? '' : 'collapsed'}`}>
          <MapPainel onClickItem={onClickSideBar}/>
        </div>
        <div id="map">
          {initialized && containerTopleft && (
            <MapContainer container={containerTopleft}>
              <SideBar onClickItem={onClickSideBar} />
            </MapContainer>
          )}
          {initialized && containerTopRight && (
            <MapContainer container={containerTopRight}>
              <Zoom initialValue={ZOOM_INICIAL_MAPA} max={ZOOM_MAXIMO_MAPA} min={ZOOM_MINIMO_MAPA} />
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

