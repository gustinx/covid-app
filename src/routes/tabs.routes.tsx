import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Dashboard } from '../screens/Dashboard';


const AppTab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'below-icon',
      }}
      >
        <AppTab.Screen
          name='Home'
          component={Dashboard}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name='dashboard'
                size={size}
                color={color}
              />
            ))
          }}
        />
      </AppTab.Navigator>
  )
}

export default AppRoutes;