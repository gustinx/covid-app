import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../screens/Welcome';
import { Confirmation } from '../screens/Confirmation';
import { Dashboard } from '../screens/Dashboard';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRoutes.Screen
      name='Welcome'
      component={Welcome}
    />
    <stackRoutes.Screen
      name='Confirmation'
      component={Confirmation}
    />
    <stackRoutes.Screen
      name='Dashboard'
      component={Dashboard}
    />
  </stackRoutes.Navigator>
)

export default AppRoutes;