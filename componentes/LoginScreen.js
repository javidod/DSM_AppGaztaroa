// https://medium.com/@hasandader/react-native-firebase-authentication-using-apis-8bad8e7ea3cc

import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { logIn } from '../redux/ActionCreators';
import { connect } from 'react-redux'

// Login google
// expo install expo-google-app-auth
// Crear credenciales https://www.youtube.com/watch?v=ZcaQJoXY-3Q
import * as Google from "expo-google-app-auth";
import firebase from '../comun/comun';

import { fetchFavoritos } from '../redux/ActionCreators';

const ANDROID_CLIENT_ID = "276429033850-eei945oioh3bjjm98ghch4dp3342e4lu.apps.googleusercontent.com";
const mapStateToProps = state => {
    return {
        favoritos: state.favoritos,
        login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (email) => dispatch(logIn (email)),
    fetchFavoritos: (user) => dispatch(fetchFavoritos(user)),
  })


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        }
      }
      signInWithGoogle = async () => {
        try {
          console.log('Intentando autenticar');
          const result = await Google.logInAsync({
            androidClientId: ANDROID_CLIENT_ID,
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
            //console.log("LoginScreen.js.js 21 | ", result.user);
            this.props.logIn(result.user.email)
             // Actualizamos los favoritos con los que tenemos en la base de datos
             this.props.fetchFavoritos(result.user.email);
            // Por alguna razon con navigate('Inicio') no funciona
            this.props.navigation.navigate('Inicio');
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      };
    updateInputState = (key, val) => {
        if (key === "email") {
            this.setState(prevState => {
                return {
                    ...prevState,
                    email: val
                }
            });
        }
        if (key === "password") {
            this.setState(prevState => {
                return {
                    ...prevState,
                    password: val
                }
            });
        }
    };

     // Hay que pasar la variable navigate para permitir la navegacion entre pantallas, la forma de la documentacion no funcionaba en mi caso
    loginHandler = ({navigate}) => {
        const apiKey = "AIzaSyDoZhhxZFLStJCxBXOGlr7nkX_BL9s-M0Y";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                //console.log(err);
                alert(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                //console.log(parsedRes);
                if (!parsedRes.idToken) {
                    alert(parsedRes.error.message);
                } else {
                    //console.log( this.state.email);
                    this.props.logIn(this.state.email)
                    // Actualizamos los favoritos con los que tenemos en la base de datos
                    this.props.fetchFavoritos(this.state.email);
                    navigate('Inicio'/*, { user: this.state.email }*/)
                }
            });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.contianer}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Login</Text>
                </View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={val => this.updateInputState("email", val)}
                    underlineColorAndroid="#1E90FF"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    autoCapitalize="none"
                    value={this.state.password}
                    onChangeText={val => this.updateInputState("password", val)}
                    underlineColorAndroid="#1E90FF"
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button title="Login" onPress={() => this.loginHandler({navigate})} style={styles.button} disabled={(this.state.email === "" || this.state.password === "")} />
                </View>
                <Button title="Login with Google" onPress={this.signInWithGoogle} />
                <Text style={styles.text}>Don't have an account? <Text onPress={() => navigate('SignUp')} style={styles.navigateText}>Sign Up</Text></Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerView: {
        marginBottom: 20
    },
    header: {
        fontWeight: "bold",
        fontSize: 26,
        color: "#1E90FF"
    },
    text: {
        color: "black"
    },
    navigateText: {
        color: "#1E90FF"
    },
    input: {
        width: "70%"
    },
    button: {
        marginTop: 15,
        marginBottom: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen); 