import React, { useEffect, forwardRef } from 'react';
import { Map, View } from 'ol';
import './index.css';

function MapView({ options, children, height, layers, width }, ref) {
  useEffect(() => {
    const map = new Map({ target: 'map' });
    const view = new View(options);

    map.setView(view);
    layers.forEach(layer => {
      map.addLayer(layer);
    });

    ref.current = map;
  }, [layers, ref, options]);

  return (
    <div id="map" style={{ height, width }}>
      {children}
    </div>
  );
}

export default forwardRef(MapView);
