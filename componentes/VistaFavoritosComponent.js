import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent.js';
import { borrarFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})

class VistaFavoritos extends Component {

    borrarFavorito(excursionId) {
        this.props.borrarFavorito(excursionId);
    }

    // Funcion que crea la alerta
    crearBotolonAlerta = (item) =>
        Alert.alert(
            "¿Borrar excursión favorita?",
            "Confirme que desea borrar la excursión: " + item.nombre,
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log(item.nombre + ' Favorito no borrado'),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.props.borrarFavorito(item.id) }
            ],
            { cancelable: false }
        );

    render() {
        const { navigate } = this.props.navigation;
        // En this.props.favoritos tenemos los ids de las excursiones favoritas - > Array [0,1,2,3,]
        //console.log(this.props.favoritos)

        const renderFavoritoItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    //onPress: () => this.props.borrarFavorito(item.id)
                    onPress: () => {this.crearBotolonAlerta(item)}
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        leftAvatar={{ source: { uri: item.imagen } }}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        onLongPress= {() => {this.crearBotolonAlerta(item)}}
                    />
                </Swipeout>
            );
        }

        if (this.props.excursiones.isLoading) {
            return (
                <IndicadorActividad />
            );
        }

        else if (this.props.excursiones.errMess) {
            return (
                <View>
                    <Text>{this.props.excursiones.errMess}</Text>
                </View>
            );
        }

        else {
            // Construimos las excursiones favoritas
            let excursiones_favoritas = [];
            for (var i = 0; i < this.props.favoritos.length; i++) {
                excursiones_favoritas.push(this.props.excursiones.excursiones[this.props.favoritos[i]]);
            }
            return (
                <FlatList
                    // Metemos como dato las excursiones favoritas
                    data={excursiones_favoritas}
                    renderItem={renderFavoritoItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);