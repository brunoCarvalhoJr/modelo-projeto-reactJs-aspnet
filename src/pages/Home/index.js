import React, { useEffect } from 'react';

import { Form, Modal, Input, Button } from 'antd';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

import Mapa from './components/Mapa';

function Home() {
  useEffect(() => {});
  function salvar() {}
  return (
    <div>
      <Mapa car={'MG-3108008-AAEEAB404821459BB17C92EB0C235B5E'}></Mapa>
      <Button type="primary" onClick={salvar}>
        Salvar
      </Button>
    </div>
  );
}

export default Home;
