import { View, Text } from 'react-native'
import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react'
import Login from './Login'
import RegisterPage from './RegisterPage'

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#63C7FF',
      background:'white'
    },
  };
  const Tab = createMaterialTopTabNavigator();
const MainPage = () => {
    
  return (
    <NavigationContainer theme={MyTheme}>
    <Tab.Navigator >
      <Tab.Screen name="Inicio" component={Login} />
      <Tab.Screen name="Registrarse" component={RegisterPage} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainPage