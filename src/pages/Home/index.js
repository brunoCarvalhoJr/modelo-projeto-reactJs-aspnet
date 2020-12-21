import React, { useEffect } from 'react';

import { Button } from 'antd';

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
