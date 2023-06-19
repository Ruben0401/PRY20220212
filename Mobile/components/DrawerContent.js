import React,{useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import {stopLocationTask} from './../common/task'
import * as SecureStore from 'expo-secure-store';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnTypo from 'react-native-vector-icons/Entypo'
import {Contexts} from './../context/Contexts'

export function DrawerContent(props) {
        const {user, setuser,logged,setlogged} = useContext(Contexts)

    return(
        <View style={{flex:1,backgroundColor:'#4CACE1'}} >
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption,styles.colorW]}>Disease Safety System</Paragraph>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image source={require('../screens/img/AvatarPaciente.png')} size={50} style={{backgroundColor:'white'}}/>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={[styles.title ,styles.colorW]}>{user.nombres}</Title>
                                <Caption style={[styles.caption,styles.colorW]}>DNI: {user.dni_p}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={[styles.drawerSection,styles.colorW]}  ></Drawer.Section>
                    <Drawer.Section showDivider={false} style={styles.drawerSection} >
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="home-outline" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            
                            label="Principal"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Principal')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="file-document-outline" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Diagnosticos"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Diagnosticos')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <IconEnTypo 
                                name="message" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Mensajes"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Mensajes')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="calendar" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Citas"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Citas')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="test-tube" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Pruebas"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Pruebas')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="map-marker-radius" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Localización"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Revisar Alrededor')}}
                        />
                        <DrawerItem pressColor='#39418E'
                            icon={() => (
                                <Icon 
                                name="bell" 
                                color={'white'}
                                size={25}
                                />
                            )}
                            label="Notificaciones"
                            labelStyle={styles.colorW}
                            onPress={() => {props.navigation.navigate('Notificaciones')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section showDivider={false} style={styles.bottomDrawerSection}>
                <DrawerItem pressColor='red'
                    icon={() => (
                        <Icon 
                        name="exit-to-app" 
                        color={'white'}
                        size={25}
                        />
                    )}
                    label="Cerrar Sesión"
                    labelStyle={styles.colorW}
                    onPress={ async() => {setlogged(false);stopLocationTask();await SecureStore.deleteItemAsync("USER_INFO") }  }
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    colorW:{
      color:'white',
    },
    alinearCentro:{
        alignItems:'center'
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 5,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });