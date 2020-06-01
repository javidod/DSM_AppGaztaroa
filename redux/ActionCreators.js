import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';

export const fetchComentarios = () => (dispatch) => {
    return fetch(baseUrl + 'comentarios.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comentarios => dispatch(addComentarios(comentarios)))
    .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());

    return fetch(baseUrl + 'excursiones.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(excursiones => dispatch(addExcursiones(excursiones)))
    .catch(error => dispatch(excursionesFailed(error.message)));
};

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {
    
    dispatch(cabecerasLoading());

    return fetch(baseUrl + 'cabeceras.json')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(cabeceras => dispatch(addCabeceras(cabeceras)))
    .catch(error => dispatch(cabecerasFailed(error.message)));
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {
    
    dispatch(actividadesLoading());

    return fetch(baseUrl + 'actividades.json')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(actividades => dispatch(addActividades(actividades)))
    .catch(error => dispatch(actividadesFailed(error.message)));
};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId,user)  => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId,user));
    }, 2000);
};
/*
export const postFavorito = (excursionId)  => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 2000);
};
*/
/*
export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});*/
export const addFavorito = (excursionId,user) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: {excursionId:excursionId, user:user}
});

export const postComentario = (excursionId, valoracion, autor, comentario) => (dispatch) => {
    // Construimos el payload con el formato que tienen en db.json los comentarios
    const newComentario= {
        excursionId: excursionId,
        valoracion: valoracion,
        autor: autor,
        comentario: comentario,
    };
    // Añadimos la fecha
    newComentario.dia = new Date().toISOString();
    // Con thunk esperamos 2 segundos hasta llamar a añadir comentario
    console.log(newComentario);
    setTimeout(() => {
        dispatch(addComentario(newComentario));
    }, 2000);
};
 
export const addComentario = (comentario) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: comentario
});

/*export const borrarFavorito = (excursionId) => ({
    type: ActionTypes.BORRAR_FAVORITO,
    payload: excursionId
});*/

export const borrarFavorito = (excursionId,user) => ({
    type: ActionTypes.BORRAR_FAVORITO,
    payload: {excursionId:excursionId, user:user}
});

// Para controlar el login
export const logIn = (email) => ({
    type: ActionTypes.LOGIN,
    payload: email
});


export const logOut = () => ({
    type: ActionTypes.LOGOUT
}); 

export const fetchFavoritos = (user) => (dispatch) => {
    if (user) {
        user = user.replace(".", "");
    }
    return fetch(baseUrl + 'favoritos/' + user + '.json')
    .then(response => {
        if (response.ok) {
            console.log("ok");
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          console.log("error");
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(favoritos => dispatch(downloadFavoritos(favoritos)))
    .catch(error => dispatch(resetFavoritos()));
};

export const downloadFavoritos = (favoritos) => ({
    type: ActionTypes.DOWNLOAD_FAVORITOS,
    payload: favoritos
});

export const resetFavoritos = () => ({
    type: ActionTypes.RESET_FAVORITOS
});