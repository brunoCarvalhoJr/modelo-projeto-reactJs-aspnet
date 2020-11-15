import React, { useState } from 'react';
import { Button } from 'antd';
import { Context } from '../../Context';

export const Zoom = ({ initialValue, min, max }) => {
  const [zoom, setZoom] = useState(initialValue);
  const { map } = React.useContext(Context);

  const zoomIn = () => {
    if (zoom <= max) {
      const current = zoom + 1;
      setZoom(current);
      map.setZoom(current);
    }
  };

  const zoomOut = () => {
    if (zoom >= min) {
      const current = zoom - 1;
      setZoom(current);
      map.setZoom(current);
    }
  };

  return (
    <div className="buttons-group buttons-right">
      <Button
        type="default"
        icon={<i class="fas fa-search-plus"></i>}
        size={'large'}
        onClick={zoomIn}
      />
      <Button
        type="default"
        icon={<i class="fas fa-search-minus"></i>}
        size={'large'}
        onClick={zoomOut}
      />
    </div>
  );
};
