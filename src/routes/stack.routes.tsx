import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../screens/Welcome';
import { Confirmation } from '../screens/Confirmation';
import AuthRoutes from './tabs.routes'

import colors from '../styles/colors';
import { CityDetails } from '../screens/CityDetails';

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
      component={AuthRoutes}
    />
    <stackRoutes.Screen
      name='CityDetails'
      component={CityDetails}
    />
  </stackRoutes.Navigator>
)

export default AppRoutes;