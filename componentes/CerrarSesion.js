import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { logOut, resetFavoritos } from '../redux/ActionCreators';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
    resetFavoritos: () => dispatch(resetFavoritos()),
  })


class CerrarSesion extends Component {
    
    cerrarSesion = () =>{
        this.props.resetFavoritos();
        this.props.logOut();
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={{ fontSize: 20, margin: 20 }} >Logeado como: {this.props.login.user}</Text>
                <Button title="Cerrar Sesión" onPress={this.cerrarSesion} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginTop: 15,
        marginBottom: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CerrarSesion); 