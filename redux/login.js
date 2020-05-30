import * as ActionTypes from './ActionTypes';

// Ponemos el user a null al cargar la app
export const login = (state = { errMess: null, user: null }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return { ...state, errMess: null, user: action.payload };

        case ActionTypes.LOGOUT:
            return { ...state, errMess: null, user: null };

            default:
            return state;
    }
}; 