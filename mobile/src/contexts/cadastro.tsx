import React, {createContext, useState, useContext} from 'react';
import {Localizacao} from '../database/schemas/LocalizacaoSchema';

interface CadastroContextData {
  localizacao: Localizacao | null;
  selecioneLocalizacao(localizacao: Localizacao): void;
}

const CadastroContext = createContext<CadastroContextData>(
  {} as CadastroContextData,
);

const CadastroProvider: React.FC = ({children}) => {
  const [localizacao, setLocalizacao] = useState<Localizacao | null>(null);

  function selecioneLocalizacao(localizacao: Localizacao) {
    setLocalizacao(localizacao);
  }

  return (
    <CadastroContext.Provider value={{localizacao, selecioneLocalizacao}}>
      {children}
    </CadastroContext.Provider>
  );
};

function useCadastro() {
  const context = useContext(CadastroContext);

  if (!context) {
    throw new Error('Error CadastroContext.');
  }

  return context;
}

export {CadastroProvider, useCadastro};
