import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { url, urlpinecone } from './../config/config'

const LOCATION_TRACKING = 'background-location-task';

var l1;
var l2;
var contagiadoP;
var ContAlerta = 0;
var alertar;
var alertado;
let token;


const configTask = async () => {
    //await configNotification()
    let resf = await Location.requestForegroundPermissionsAsync();
    let resb = await Location.requestBackgroundPermissionsAsync();
    if (resb.status !== 'granted') {
        console.log('Permission to access location was denied');
    } else {
        console.log('Permission to access location granted');
        // token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
        await startLocationTask();

    }

};

const configNotification = async () => {


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    token = await registerForPushNotificationsAsync();
    console.log(token)
}

async function registerForPushNotificationsAsync() {
    let tok = null;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        tok = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo push token:", tok);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return tok;
}


const stopLocationTask = () => {

    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
        .then((tracking) => {
            if (tracking) {
                Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
            }
        })
}
const startLocationTask = async (user) => {
    await startLocationTrackingTask(user);
}
const startLocationTrackingTask = async (user) => {

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 0,
        foregroundService: {
            notificationTitle: 'Disease Safety System',
            notificationBody: 'Protegiendote'
        },
        data: "test"

        // if notificated timerNotification = timerNotification + timeInterval
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
    );
    console.log('tracking started?', hasStarted);
};

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    let result = await SecureStore.getItemAsync("USER_INFO")
    if (result) {
        console.log(result)
        result = JSON.parse(result)
    }
    // leer data del storage
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;


        l1 = lat;
        l2 = long;
        if (result !== null) {
            const resI = await fetch(`${url}/infectados/${result.dni_p}/p`)
            const dataI = await resI.json()
            if (resI.status === 200) {
                contagiadoP = true
            }
            else {
                contagiadoP = false
            }

            let dataPicone = {}

            dataPicone = {
                latitude: lat,
                longitude: long,
                userId: result.dni_p,
                contagiado: contagiadoP
            }

            const resPinecone = await fetch(`${urlpinecone}`,
                {

                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(dataPicone),
                })

            const dataPic = await resPinecone.json()
            if (resPinecone.status === 200 && dataPic.length > 0 && !contagiadoP) {
                if (!alertado) {
                    console.log('Alertar', dataPic);
                    alertado = true;
                    ContAlerta = 0;
                } else {
                    ContAlerta += 10000;
                    if (ContAlerta >= 60000) {
                        alertado = false;
                        ContAlerta = 0;
                    }
                }
            }
        }




        console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
        // last notificacion

        //post API
        //recibo y veo si esta congiado
        //   if(contagiado){
        //     if(lastNotificaion === null){
        //         // notificar
        //         lastNotificaion = new Date();
        //     }else if( Math.floor((lastNotificaion.getTime() - (new Date()).getTime())/(1000 * 60) ) >= 5)
        //     {
        //         // notificar
        //         lastNotificaion = new Date();
        //     }
        //   }

        // FUNCION DE GPT
        // function shouldNotify(lastNotification) {
        //     if (lastNotification === null) {
        //         return true;
        //     }

        //     const currentTime = new Date();
        //     const timeDifference = (currentTime.getTime() - lastNotification.getTime()) / (1000 * 60);

        //     return timeDifference >= 5;
        // }

        // if (contagiado) {
        //     if (shouldNotify(lastNotification)) {
        //         // Notificar
        //         lastNotification = new Date();
        //     }
        // }

    }
});
module.exports = {
    stopLocationTask,
    startLocationTask,
    configTask
}