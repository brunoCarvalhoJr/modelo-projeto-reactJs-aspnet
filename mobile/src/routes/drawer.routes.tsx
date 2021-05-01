import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Configuracoes from '../pages/Configuracoes';
import AppStackRoutes from './stack.routes';

const Drawer = createDrawerNavigator();

const AppRoutes = ({}) => {
  return (
    <Drawer.Navigator initialRouteName="StackScreen">
      <Drawer.Screen
        name="Propriedades"
        component={AppStackRoutes}
        options={() => ({
          headerTitle: 'Propriedades',
        })}
      />
      <Drawer.Screen name="Configurações" component={Configuracoes} />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
