// https://medium.com/@hasandader/react-native-firebase-authentication-using-apis-8bad8e7ea3cc

import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { logIn } from '../redux/ActionCreators';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (email) => dispatch(logIn (email))
  })


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        }
      }
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