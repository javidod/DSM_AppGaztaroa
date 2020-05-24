//export const baseUrl = "http://192.168.1.40:3001/";
export const baseUrl = "https://react-native-appgaztaroa.firebaseio.com/";

export const colorGaztaroaOscuro = '#015afc';
export const colorGaztaroaClaro = '#c2d3da';


// Aqui intenté realizar lo de las imagenes backend con peticiones URL, pero no funcionan demasiado bien, al final lo hice cambiando del archivo db.json las rutas.
// Config file
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDoZhhxZFLStJCxBXOGlr7nkX_BL9s-M0Y",
    authDomain: "react-native-appgaztaroa.firebaseapp.com",
    databaseURL: "https://react-native-appgaztaroa.firebaseio.com",
    projectId: "react-native-appgaztaroa",
    storageBucket: "react-native-appgaztaroa.appspot.com",
    messagingSenderId: "276429033850",
    appId: "1:276429033850:web:8a2f33cf80c7b30ce686c3",
    measurementId: "G-VF7S89S3N0"
  };

  // Cargo la config si esta ya no tiene una cargada, me daba problemas de duplicado 
  // solucion aqui: -> https://github.com/zeit/next.js/issues/1999
  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

