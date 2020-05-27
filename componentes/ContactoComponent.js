import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import * as MailComposer from 'expo-mail-composer';
import { colorGaztaroaOscuro } from '../comun/comun';

class Contacto extends Component {

    // Funcion para enviar correo
    enviarCorreo(){
        MailComposer.composeAsync({
            // Destinatarios en forma array
            recipients: ['gaztaroa@gaztaroa.com'],
            // Concepto
            subject:'Contacto - appGaztaroa',
            // Texto predefinido para el cuerpo del correo
            body:'Me gustaría participar en las salidas de montaña que se organizan a través de appGaztaroa.'
        });
      }

    render() {
        return (
            <Animatable.View animation="zoomInDown" duration={3000} delay={500}>
                <Card title="Información de contacto"
                    featuredTitle="Contacto">
                    <Text style={{ margin: 10 }}>
                        Kaixo Mendizale!{'\n'}{'\n'}
                Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.{'\n'}{'\n'}
                Para lo que quieras, estamos a tu disposición!{'\n'}{'\n'}
                Tel: +34 948 277151{'\n'}{'\n'}
                Email: gaztaroa@gaztaroa.com
                </Text>
                    <Button
                        title='Contacto'
                        buttonStyle={{ backgroundColor: colorGaztaroaOscuro }}
                        onPress={this.enviarCorreo}
                    />
                </Card>
            </Animatable.View>
        );
    }
}

export default Contacto;