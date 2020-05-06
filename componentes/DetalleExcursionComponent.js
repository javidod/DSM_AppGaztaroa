import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { colorGaztaroaOscuro } from '../comun/comun';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId,valoracion,autor,comentario) => dispatch(postComentario(excursionId,valoracion,autor,comentario)),
})


function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card
                featuredTitle={excursion.nombre}
                image={{ uri: baseUrl + excursion.imagen }}>
                <Text style={{ margin: 10 }}>
                    {excursion.descripcion}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#015afc'
                        onPress={() => props.toggleModal()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {


    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
            </View>
        );
    };

    return (
        <Card title='Comentarios' >
            <FlatList
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valoracion: 3,
            autor: '',
            comentario:'',
            showModal: false
        }
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario:'',
            showModal: false
        });
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    gestionarComentario(excursionId) {
        console.log(JSON.stringify(this.state));
        //this.props.postComentario(excursionId,valoracion,autor,comentario);
        this.props.postComentario(excursionId,this.state.valoracion,this.state.autor,this.state.comentario);
        this.toggleModal();
        this.resetForm(); 
    }

    valoracionCompletada = (valoracion) => {
        this.setState({ valoracion: valoracion });
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />

                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm(); }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm(); }}>
                    <View style={styles.modal}>
                        <Rating showRating fractions="{1}" startingValue={this.state.valoracion} onFinishRating={this.valoracionCompletada} />
                        <Input
                            placeholder="Autor"
                            inputStyle={{ paddingLeft:10 }}      
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            style={styles}
                            onChangeText={value => this.setState({ autor: value })}
                        />
                        <Input
                            placeholder="Comentario"
                            inputStyle={{ paddingLeft:8 }}      
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            style={styles}
                            onChangeText={value => this.setState({ comentario: value })}
                        />
                         <Text></Text>
                        <Button 
                            style={styles.button}
                            onPress={() => {this.gestionarComentario(excursionId)}}
                            color={colorGaztaroaOscuro}
                            title="ENVIAR"
                        />
                        <Text></Text>
                        <Button
                            style={styles.button}
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color={colorGaztaroaOscuro}
                            title="CERRAR"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    button :{
        margin: 30,
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);