import React, { useState } from 'react';
import { Button } from 'antd';
import { Context } from '../../Context';
import './toolsConfig';

export const ToolBar = () => {
  const mapContext = React.useContext(Context);
  const [desenho, setDesenho] = useState('');

  const { ferramentas, ferramentaAtual, setFerramentaAtual } = mapContext.tools;

  const desenhar = tipo => {
    const ferramenta = ferramentas[tipo];

    if (ferramenta) {
      ferramenta.enable();
      setFerramentaAtual({ ativa: true });
    }
  };

  const desenharPoligono = () => {
    const desenho = 'POLIGONO';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const inserirPraga = () => {
    const desenho = 'CIRCLEMARKER';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const inseriAnotacao = () => {
    const desenho = 'CIRCLEMARKER';
    setDesenho(desenho);
    desenhar(desenho);
  };

  const cancelarDesenho = () => {
    const ferramenta = ferramentas[desenho];
    debugger;
    setDesenho('');
    ferramenta.disable();
    setFerramentaAtual({ ativa: false });
  };

  return (
    <>
      {!ferramentaAtual.ativa && (
        <>
          <div className="buttons-group buttons-right">
            <Button
              type="default"
              icon={<i class="fas fa-draw-polygon"></i>}
              size={'large'}
              onClick={desenharPoligono}
            />
            <Button
              type="default"
              icon={<i class="fas fa-pastafarianism"></i>}
              size={'large'}
              onClick={inserirPraga}
            />
            <Button
              type="default"
              icon={<i class="fas fa-comment-alt"></i>}
              size={'large'}
              onClick={inseriAnotacao}
            />
          </div>
          <div className="buttons-group buttons-right">
            <Button
              type="default"
              icon={<i class="fa fa-pencil"></i>}
              size={'large'}
              onClick={desenharPoligono}
            />
            <Button
              type="default"
              icon={<i class="fas fa-trash"></i>}
              size={'large'}
              onClick={inserirPraga}
            />
          </div>
        </>
      )}
      {ferramentaAtual.ativa && (
        <div className="buttons-group buttons-right">
          <Button
            type="default"
            icon={<i class="fas fa-trash"></i>}
            size={'large'}
            onClick={cancelarDesenho}
          />
        </div>
      )}
    </>
  );
};
