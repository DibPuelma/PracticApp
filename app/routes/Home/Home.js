'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

import styles from './styles';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginColumn}>
          <View style={styles.logo} />
          <Text style={styles.title}>¡Bienvenido!</Text>
          <View style={styles.loginButtons}>
            <TouchableHighlight style={styles.fullWidthButtonFirst} underlayColor="#F7F7F7" onPress={this._goToLogin.bind(this)}>
              <Text style={styles.fullWidthButtonFirstText}>ENTRAR</Text>
            </TouchableHighlight>

            <View style={{width: 10}}></View>

            <TouchableHighlight style={styles.fullWidthButton} underlayColor="#66CCF5" onPress={this._goToRegister.bind(this)}>
              <Text style={styles.fullWidthButtonText}>REGISTRARSE</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.loginButtons}>
            <LoginButton
              style={styles.facebookButton}
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    /*alert("Login was successful with permissions: " + result.grantedPermissions);*/
                    this._goToMain();
                  }
                }
              }
              onLogoutFinished={() => alert("User logged out")}/>
            </View>
        </View>
      </View>
    );
  }

  _goToLogin() {
    this.props.navigator.push({id: 'LoginPage', displayNavbar: false});
    return true;
  }

  _goToRegister() {
    this.props.navigator.push({id: 'RegisterPage', displayNavbar: false});
    return true;
  }

  _goToMain() {
    var homepage = this;
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        let accessToken = data.accessToken
        alert(accessToken.toString())

        const responseInfoCallback = (error, result) => {
          if (error) {
            console.log(error)
            alert('Error fetching data: ' + error.toString());
          } else {
            console.log(result)
            //alert('Success fetching data: ' + result.toString());

            // TODO: Parse birthday to age
            var user = {name: result.first_name, lastName: result.last_name, gender: result.gender[0], age: 23, email: result.email};
            homepage.setState({user: user});

            AsyncStorage.setItem("user", JSON.stringify(user));

            homepage.props.navigator.replace({id: 'QRReader', passProps: {user: this.state.user}}); //resetTo
          }
        }

        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name,gender,birthday'
              }
            }
          },
          responseInfoCallback
        );

        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    )

  }
}
