import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import L from "leaflet";

import "./map.css";
import "./buttons.css";

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

const Zoom = () => {
  const mapContext = React.useContext(Context);
  const [text] = useState("Teste");

  const alertTeste = () => {
    mapContext.map.setZoom(20);
  };

  const alertTeste2 = () => {
    mapContext.map.setZoom(2);
  };

  return (
    <div className="buttons-group buttons-right">
      <Button
        type="default"
        icon={<i class="fas fa-search-plus"></i>}
        size={"large"}
        onClick={alertTeste}
      />
      <Button
        type="default"
        icon={<i class="fas fa-search-minus"></i>}
        size={"large"}
        onClick={alertTeste2}
      />
    </div>
  );
};

const Teste = () => {
  const mapContext = React.useContext(Context);
  const [text] = useState("Teste");

  const alertTeste = () => {
    mapContext.map.setZoom(20);
  };

  const alertTeste2 = () => {
    mapContext.map.setZoom(2);
  };

  return (
    <div className="buttons-group buttons-right">
      <Button
        type="default"
        icon={<i class="fas fa-draw-polygon"></i>}
        size={"large"}
        onClick={alertTeste}
      />
      <Button
        type="default"
        icon={<i class="fas fa-pastafarianism"></i>}
        size={"large"}
        onClick={alertTeste2}
      />
       <Button
        type="default"
        icon={<i class="fas fa-comment-alt"></i>}
        size={"large"}
        onClick={alertTeste2}
      />
    </div>
  );
};


const car = "MG-3108008-AAEEAB404821459BB17C92EB0C235B5E";

const MapTeste = () => {
  const mapRef = useRef(null);
  const painel = useRef(null);
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

  const topleft = (lmap) => {
    const container = L.control({
      position: "topleft",
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create("div", "leaflet-control topleft");
      return divContainer;
    };
    container.addTo(lmap);
    containerTopleft.current = container;
  };

  const topright = (lmap) => {
    const container = L.control({
      position: "topright",
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create("div", "leaflet-control topright");
      return divContainer;
    };
    container.addTo(lmap);
    containerTopRight.current = container;
  };

  const bottomleft = (lmap) => {
    const container = L.control({
      position: "bottomleft",
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create("div", "leaflet-control bottomleft");
      return divContainer;
    };
    container.addTo(lmap);
    containerBottomLeft.current = container;
  };

  const bottomright = (lmap) => {
    const container = L.control({
      position: "bottomright",
    });

    container.onAdd = function () {
      var divContainer = L.DomUtil.create("div", "leaflet-control bottomright");
      return divContainer;
    };
    container.addTo(lmap);
    containerBottomRight.current = container;
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
              <Zoom />
              <Teste />
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

export default MapTeste;
