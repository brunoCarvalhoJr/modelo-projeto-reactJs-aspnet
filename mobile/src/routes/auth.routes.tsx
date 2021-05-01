import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <AuthStack.Screen
      name="SignIn"
      options={{title: 'Monitoramento'}}
      component={SignIn}
    />
  </AuthStack.Navigator>
);
export default AuthRoutes;
