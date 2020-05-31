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
                if (action.payload.user) {
                    action.payload.user = action.payload.user.replace(".", "");
                }
                //console.log(user);
                firebase.database().ref('/favoritos/' + action.payload.user).set(state);
                return state;
            } else {
                if (action.payload.user) {
                    action.payload.user = action.payload.user.replace(".", "");
                }
                //console.log(user);
                firebase.database().ref('/favoritos/' + action.payload.user).set(state.concat(action.payload.excursionId));
                return state.concat(action.payload.excursionId);
            }
        /*case ActionTypes.BORRAR_FAVORITO:
        
        return state.filter((favorito) => favorito !== action.payload);*/
        case ActionTypes.BORRAR_FAVORITO:
            if (action.payload.user) {
                action.payload.user = action.payload.user.replace(".", "");
            }
            console.log(state.filter((favorito) => favorito !== action.payload.excursionId));
            firebase.database().ref('/favoritos/' + action.payload.user).set(state.filter((favorito) => favorito !== action.payload.excursionId));
            return state.filter((favorito) => favorito !== action.payload.excursionId);

        default:
            return state;
    }
};

