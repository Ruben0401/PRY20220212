import React,{useState,useContext} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './components/DrawerContent'
import Principal from './screens/Principal'
import Messages from './screens/Message/Messages'
import MessageDetail from './screens/Message/MessageDetail'
import Diagnostics from './screens/Diagnostic/Diagnostics'
import DiagnosticDetail from './screens/Diagnostic/DiagnosticDetail'
import Cites from './screens/Cites'
import Tests from './screens/Test/Tests'
import TestDetail from './screens/Test/TestDetail'
import LocationAround from './screens/LocationAround'
import Notifications from './screens/Notifications';
import { color } from 'react-native-reanimated';
import MainPage from './screens/User/MainPage';
import {Contexts} from './context/Contexts'


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background:'white'
  },
};

export default function LoginLogic() {

      const Drawer = createDrawerNavigator();
      
      const {user, setuser,logged,setlogged} = useContext(Contexts)
     return (
      (!logged)?(
        <MainPage/>
      ):
      (
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator drawerContent={ props=> <DrawerContent {... props} /> } >
          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Principal" component={Principal} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Diagnosticos" component={Diagnostics} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="DiagnosticDetail" component={DiagnosticDetail} />
          
          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Mensajes" component={Messages} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="MessageDetail" component={MessageDetail} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Citas" component={Cites} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Pruebas" component={Tests} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="TestDetail" component={TestDetail} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} name="Revisar Alrededor" component={LocationAround} />

          <Drawer.Screen options={{title: "Disease Safety System",headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#4CACE1',
          }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} name="Notificaciones" component={Notifications} />

        </Drawer.Navigator>
      </NavigationContainer>
      )
     );
}

