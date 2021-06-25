import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dashboard } from '../screens/Dashboard';
import { SelectCity } from '../screens/SelectCity';
import { Tips } from '../screens/Tips';
import { Feedback } from '../screens/Feedback';
import { AboutUs } from '../screens/AboutUs';


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

      <AppTab.Screen
        name='Cidades'
        component={SelectCity}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialCommunityIcons
              name='format-list-checkbox'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name='Dicas'
        component={Tips}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialCommunityIcons
              name='comment-check-outline'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name='Feedback'
        component={Feedback}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='feedback'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name='Sobre nós'
        component={AboutUs}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialCommunityIcons
              name='information-outline'
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