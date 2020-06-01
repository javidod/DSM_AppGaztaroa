import React, { Component } from 'react';
import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import PruebaEsfuerzo from './PruebaEsfuerzoComponent';
import VistaFavoritos from './VistaFavoritosComponent';
import Imagenes from './ImagenesComponent';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import CerrarSesion from './CerrarSesion';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
    login: state.login
  }
}

const mapDispatchToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes somos',
        }}
      />
    </Stack.Navigator>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },

      }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
          headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}

function PruebaEsfuerzoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="PruebaEsfuerzo"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="PruebaEsfuerzo"
        component={PruebaEsfuerzo}
        options={{
          title: 'Prueba de Esfuerzo',
        }}
      />
    </Stack.Navigator>
  );
}

function VistaFavoritosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="VistaFavoritos"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="VistaFavoritos"
        component={VistaFavoritos}
        options={{
          title: 'Excursiones favoritas',
        }}
      />
    </Stack.Navigator>
  );
}

function ImagenesNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Imagenes"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
      }}
    >
      <Stack.Screen
        name="Imagenes"
        component={Imagenes}
        options={{
          title: 'Imágenes',
        }}
      />
    </Stack.Navigator>
  );
}

function LoginNavegador() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="Inicio"
        component={DrawerNavegador}
      />
    </Stack.Navigator>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-appgaztaroa.appspot.com/o/imagenes%2Flogo.png?alt=media&token=5187d381-ccaa-4e37-8873-c17c2b5654e6' }} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavegador(props) {
  console.log(props.user);
  let login_logout = '';
  if (props.user) {
    // Hay usuario -> Ponemos la pantalla de Cerrar Sesión
    console.log('Hay usuario');
    login_logout =
                    <Drawer.Screen name="Cerrar Sesión" component={CerrarSesion}
                      options={{
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='user'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                          />
                        )
                      }}
                    />
  } else {
    // No hay usuario -> Ponemos la pantalla de Login
    console.log('No hay usuario');
    login_logout =
                    <Drawer.Screen name="Login" component={LoginNavegador}
                      options={{
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='user'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                          />
                        )
                      }}
                    />
  }
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colorGaztaroaClaro,
      }}
      initialRouteName="Campo base"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      
       <Drawer.Screen name="Campo base" component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
        
      <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Calendario" component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='calendar'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Contacto" component={ContactoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='address-card'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Prueba de Esfuerzo" component={PruebaEsfuerzoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='heartbeat'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Excursiones Favoritas" component={VistaFavoritosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='thumbs-up'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Imágenes" component={ImagenesNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='image'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      {login_logout}
    </Drawer.Navigator>
  );
}

class Campobase extends Component {

  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador user={this.props.login.user} />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);