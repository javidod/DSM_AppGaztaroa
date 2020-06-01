import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { login } from './login';

//import storage from 'redux-persist/lib/storage' // Importamos el motor que queremos que use - DA ERROR, MARAVILLOSO
//import AsyncStorage from '@react-native-community/async-storage';

import { AsyncStorage } from 'react-native'; // Importamos el motor que usamos

import { persistStore, persistReducer } from 'redux-persist'

// Seteamos la configuracion
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, //motor que queremos que persista, en mi caso storage
    // WHITELIST - Lo que queremos que persista y en el 
    whitelist: ['favoritos','login'] // only favoritos will be persisted - which reducer want to store
  };

// Creamos el reducer
const reducer = combineReducers({
        excursiones,
        comentarios,
        cabeceras,
        actividades,
        favoritos,
        login
        });

// Creamos el reducer que persiste con la config que hemos puesto antes
const pReducer = persistReducer(persistConfig, reducer);

// Definimos el middleware
const middleware = applyMiddleware(thunk); // Sin SPAM en el terminal
//const middleware = applyMiddleware(thunk, logger); // Con SPAM en el terminal

// Creamos la store con el nuevo persistreducer y el middleware deseado
const store = createStore(pReducer, middleware);

// Definimos dicha store como una persisStore
const persistor = persistStore(store);

// Las exportamos 
export { persistor, store };

 