import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Root, StyleProvider} from 'native-base';
import {AuthProvider} from './contexts/auth';
import {CadastroProvider} from './contexts/cadastro';

import getTheme from './theme/components';
import variables from './theme/variables/material';
import Routes from './routes';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#FFFFFF',
    background: 'rgb(242, 242, 242)',
    card: '#465881',
    text: '#FFFFFF',
    border: 'rgb(199, 199, 204)',
    notification: '#FFFFFF',
  },
};

const App: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Root>
        <StyleProvider style={getTheme(variables)}>
          <AuthProvider>
            <CadastroProvider>
              <Routes />
            </CadastroProvider>
          </AuthProvider>
        </StyleProvider>
      </Root>
    </NavigationContainer>
  );
};

export default App;
