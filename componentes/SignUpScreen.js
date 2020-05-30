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

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.  state = {
      email: "",
      password: {
        val: "",
        valid: true
      },
      confirmPassword: {
        val: "",
        valid: false
      }
    };
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
          password: {
            ...prevState.password,
            val: val
          },
          confirmPassword: {
            ...prevState.confirmPassword,
            valid: prevState.confirmPassword.val === val
          }
        }
      });
    }
    if (key === "confirmPassword") {
      this.setState(prevState => {
        return {
          ...prevState,
          confirmPassword: {
            ...prevState.confirmPassword,
            val: val,
            valid: val === this.state.password.val
          }
        }
      });
    }
  };

  // Hay que pasar la variable navigate para permitir la navegacion entre pantallas, la forma de la documentacion no funcionaba en mi caso
  signupHandler = ({navigate}) => {
  
    const apiKey = "AIzaSyDoZhhxZFLStJCxBXOGlr7nkX_BL9s-M0Y";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;

    //console.log(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password.val,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        //console.log(err);
        alert("Authentication failed, please try again!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        //console.log(parsedRes);
        if (!parsedRes.idToken) {
          alert(parsedRes.error.message);
        } else {
          this.props.logIn(this.state.email)
          navigate('Inicio',/* { user: this.state.email }*/)
        }
      });
  };
  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.contianer}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Sign Up</Text>
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
          value={this.state.password.val}
          onChangeText={val => this.updateInputState("password", val)}
          underlineColorAndroid="#1E90FF"
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm password"
          autoCapitalize="none"
          value={this.state.confirmPassword.val}
          onChangeText={val => this.updateInputState("confirmPassword", val)}
          underlineColorAndroid="#1E90FF"
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.button} >
          <Button title="SignUp" onPress={() => this.signupHandler({ navigate })} disabled={(this.state.email === "" || !this.state.confirmPassword.valid)} />
        </View>
        <Text style={styles.text}>Already have an account? <Text onPress={() => navigate('Login')} style={styles.navigateText}>Login</Text></Text>
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
    marginBottom: 25
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);