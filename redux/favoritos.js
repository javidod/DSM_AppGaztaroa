import * as ActionTypes from './ActionTypes';

import firebase from '../comun/comun';

export const favoritos = (state = [], action) => {
    switch (action.type) {
        /*case ActionTypes.ADD_FAVORITO:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        */
        case ActionTypes.ADD_FAVORITO:
            console.log(action.payload);
            if (state.some(el => el === action.payload.excursionId)) {
                // Si hay usuario
                if (action.payload.user) {
                    action.payload.user = action.payload.user.replace(".", "");
                    firebase.database().ref('/favoritos/' + action.payload.user).set(state);
                }
                return state;
            } else {
                // Si hay usuario
                if (action.payload.user) {
                    action.payload.user = action.payload.user.replace(".", "");
                    firebase.database().ref('/favoritos/' + action.payload.user).set(state.concat(action.payload.excursionId));
                }
                return state.concat(action.payload.excursionId);
            }
        /*case ActionTypes.BORRAR_FAVORITO:
        
        return state.filter((favorito) => favorito !== action.payload);*/
        case ActionTypes.BORRAR_FAVORITO:
            // Si hay usuario
            if (action.payload.user) {
                action.payload.user = action.payload.user.replace(".", "");
                firebase.database().ref('/favoritos/' + action.payload.user).set(state.filter((favorito) => favorito !== action.payload.excursionId));
            }
            return state.filter((favorito) => favorito !== action.payload.excursionId);

        case ActionTypes.DOWNLOAD_FAVORITOS:
            console.log("download_fav");
            console.log(action.payload);
            // Si en la base de datos ese usuario tiene guardado algun favorito lo cargamos en state.favoritos
            if (action.payload){
                state = action.payload;
            }else{ // Si no tiene nada en la base de datos cargamos state.favoritos como vacio
                state = [];
            }
    
            return state;

        case ActionTypes.RESET_FAVORITOS:
            console.log("RESET_FAVORITOS");
            state = [];
            return state;

        default:
            return state;
    }
};

