import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { ACTIVIDADES } from '../comun/actividades';

function Historia() {

    return (
        <Card
            title="Un poquito de historia"
            featuredTitle="Historia"
        >
            <Text
                style={{ margin: 10 }}>
                El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y
                pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido
                sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una
                bajera. Gaztaroa ya tenía su sede social.{"\n"}
                {"\n"}Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado
                por el club aportando vuestro granito de arena.{"\n"}
                {"\n"}Gracias!{"\n"}

            </Text>
        </Card>
    );

}

function RenderActividades(props) {

    // Obtenemos la informacion de las actividades
    const actividades = props.actividades;

    // Definimos como el componente FlatList va a renderizar la informacion
    const renderActividadesItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                title={item.nombre}
                subtitle={item.descripcion}
                hideChevron={true}
                leftAvatar={{ source: require('./imagenes/40Años.png') }}
            />
        );
    }

    // Introducimos en FlatList la info y el método de renderizarlo
    return (
        <Card
            title="Actividades y recursos"
            featuredTitle="Actividades y recursos"
        >
            <FlatList
                data={actividades}
                renderItem={renderActividadesItem}
                keyExtractor={actividades => actividades.id.toString()}
            />
        </Card>
    );
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }
    render() {

        return (
            <ScrollView>
                <Historia />
                <RenderActividades actividades={this.state.actividades} />
            </ScrollView>
        );
    }
}

export default QuienesSomos;