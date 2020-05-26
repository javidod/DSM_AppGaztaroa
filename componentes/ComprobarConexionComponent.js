import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView, Text, Platform } from 'react-native';

// React Native Offline Notice Banner

const ComprobarConexion = () => {
    const [isInternetReachable, setIsInternetReachable] = useState(false);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    // Si hay conexion devuelve nulo
    //!isInternetReachable  //Si ponemos esto en negado se muestra un safeArea que nos dice que no existe conexión cuando si la hay
    // esto lo hago porque obviamente no va a funcionar en local cuando usamos Expo
    if (isInternetReachable){       // Si hay conexion
        return null;
    }
    // Si no hay conexión devolveremos un safearea rojo arriba para alertar al usuario
    return (
        <SafeAreaView style={{ backgroundColor: 'red' }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: Platform.OS === 'android' ? 12 : 16,
                    padding: 10,
                    textAlign: 'center',
                    fontWeight: '500',
                    letterSpacing: 2,
                }}>
                No Internet Connection
        </Text>
        </SafeAreaView>
    );
}

export default ComprobarConexion;