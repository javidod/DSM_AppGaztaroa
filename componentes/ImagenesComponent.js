import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImageManipulator from "expo-image-manipulator";

class Imagenes extends Component {
    state = {
        image: null,
    };
    // Permisos para acceder a la libreria
    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Es necesario asignar los permisos para acceder a esta función.');
            }
        }
    };

    rotate90 = async () => {
        //console.log(this.state.image );
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.image,
            [{ rotate: 90 }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        this.setState({ image: manipResult.uri });
        //console.log(manipResult.uri);
    };

    rotate270 = async () => {
        //console.log(this.state.image );
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.image,
            [{ rotate: -90 }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        this.setState({ image: manipResult.uri });
        //console.log(manipResult.uri);
    };

    espejoVertical = async () => {
        //console.log(this.state.image );
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.image,
            [{ flip: ImageManipulator.FlipType.Vertical }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        this.setState({ image: manipResult.uri });
        //console.log(manipResult.uri);
    };
    cogerImagen = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            //console.log(result);
        } catch (E) {
            //console.log(E);
        }
    };

    render() {
        let { image } = this.state;
        let botones = <View></View>;

        // Solo cargar botones si hay una imagen mostrandose
        if (image !== null) {
        botones =
            <View style={{ flexDirection: "column" }}>
                <View style={{ padding: 5 }}>
                    <Button title="Rotar 90º" onPress={this.rotate90} />
                </View>
                <View style={{ padding: 5 }}>
                    <Button title="Rotar -90º" onPress={this.rotate270} />
                </View>
                <View style={{ padding: 5 }}>
                    <Button title="Espejo vertical" onPress={this.espejoVertical} />
                </View>
            </View>
        }

        return (
            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'center', /*flexDirection: 'column',*/
                justifyContent: 'space-evenly',
            }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderWidth:1 ,borderColor: '#000000', }} />}
                {botones}
                <Button title="Elige una imagen de la galería." onPress={this.cogerImagen} />

            </View>
        );
    }
}

export default Imagenes;