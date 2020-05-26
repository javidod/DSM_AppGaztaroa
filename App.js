import React from 'react';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
//import { ConfigureStore } from './redux/configureStore';
//const store = ConfigureStore();
import { store } from './redux/configureStore';

import ComprobarConexion from './componentes/ComprobarConexionComponent';

export default class App extends React.Component {

  render() {
        return (
      <Provider store={store}>
          {/* Safe Area arriba para cuando no hay conexión*/}
          <ComprobarConexion></ComprobarConexion>
        <Campobase />
      </Provider>
    );
  }
}
