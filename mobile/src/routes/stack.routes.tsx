import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Propriedades from '../pages/Propriedades';
import Fazenda from '../pages/Fazenda';
import Talhao from '../pages/Talhao';
import OcorrenciaCategoria from '../pages/OcorrenciaCategoria';
import Ocorrencia from '../pages/Ocorrencia';
import Formulario from '../pages/Formulario';
import Compartilhar from '../pages/Compartilhar';

import {Button, Icon} from 'native-base';

const Stack = createStackNavigator();

const AppStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Propriedades"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Propriedades"
        component={Propriedades}
        options={({navigation}) => ({
          headerTitle: 'Propriedades',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="md-menu" type="Ionicons" style={{color: '#ffff'}} />
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="Fazenda"
        component={Fazenda}
        options={{headerTitle: 'Fazenda'}}
      />
      <Stack.Screen
        name="Talhao"
        component={Talhao}
        options={{headerTitle: 'Talhão'}}
      />
      <Stack.Screen
        name="OcorrenciaCategoria"
        component={OcorrenciaCategoria}
        options={{headerTitle: 'Selecione'}}
      />
      <Stack.Screen
        name="Ocorrencia"
        component={Ocorrencia}
        options={{headerTitle: 'Ocorrência'}}
      />
      <Stack.Screen
        name="Formulario"
        component={Formulario}
        options={{headerTitle: 'Formulário'}}
      />
      <Stack.Screen
        name="Compartilhar"
        component={Compartilhar}
        options={{headerTitle: 'Compartilhar'}}
      />
    </Stack.Navigator>
  );
};

export default AppStackRoutes;
