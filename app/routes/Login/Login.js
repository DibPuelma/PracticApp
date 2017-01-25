'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  AsyncStorage
} from 'react-native';
import styles from './styles';

import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings'

var LoginStatus = {
  SLEEPING  : 'slepping',
  REQUESTING: 'requesting',
  LOGGED    : 'logged'
}

var _navigator;

export default class Login extends Component {
  constructor(props) {
    super(props);
    _navigator = this.props.navigator;
    this.state = {username: '', password: '', status: LoginStatus.SLEEPING};
    this._backToMainMenu = this._backToMainMenu.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentWillMount() {
    this.singletonBackButtonHandler.addBackEvent(this._backToMainMenu);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToMainMenu);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginColumn}>
          <View style={styles.logo} />
          <Text style={styles.title}>Entrar</Text>
            { this.state.error &&
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            }

            <View style={{flexDirection: 'row'}}>
              <TextInput
                maxLength = {30}
                style={{height: 40, flex:1}}
                placeholder="Usuario"
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
              />
            </View>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                secureTextEntry={true}
                style={{height: 40, flex:1}}
                placeholder="Contraseña"
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
              />
            </View>

          <View style={styles.loginButtons}>
            { this.state.status === LoginStatus.SLEEPING &&
            <TouchableHighlight style={styles.fullWidthButton} underlayColor="#66CCF5" onPress={this._login.bind(this)}>
              <Text style={styles.fullWidthButtonText}>ENTRAR</Text>
            </TouchableHighlight>
            }
            { this.state.status === LoginStatus.REQUESTING &&
              <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
            }
            { this.state.status === LoginStatus.LOGGED &&
              <Text style={{color: '#0C0'}}>Sesión iniciada</Text>
            }
          </View>
        </View>
      </View>
    );
  }

  _login() {
    // Change login status
    console.log("LoginPage hello");
    this.setState({text: '', status: LoginStatus.REQUESTING, error: false});

    // Collect user input
    var username = this.state.username;
    var password = this.state.password;

    if (!this._validate(username, password)) {
      this._setError('Debes ingresar ambos campos');
      return;
    }

    // Make a login request
    var login = this;

    var promise = fetch(settings.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password: password })  
    })
    .then((response) => response.json());

    promise.then(function(result) { // ok
      console.log(result);

      if (result.code != "OK") {
        switch (result.code) {
          case 'WRONG_PASSWORD':
            login._setError('Contraseña inválida');
            break;
          case 'USER_DOES_NOT_EXIT':
            login._setError('El usuario no existe');
            break;
        } 
        return;
      }
      
      login.setState({status: LoginStatus.LOGGED});

      login.setState({user: result.user})
      AsyncStorage.setItem("user", JSON.stringify(result.user));

      login._goToMain();
    }, function(err) {
      login._setError('Error interno, inténtalo de nuevo');
      console.log(err);
    });
  }

  _validate(username, password) {
    return (username.length > 0 && password.length > 0);
  }

  _validateAPI(username, password) {
    return (username == 'a' && password == 'a');
  }

  _setError(message) {
    this.setState({status: LoginStatus.SLEEPING, error: message});
  }

  _backToMainMenu() {
    _navigator.pop();
    return true; // This is important to prevent multiple calls
  }

  _goToMain() {
    _navigator.replace({id: 'QRReader', passProps: {user: this.state.user}}); //
  }
}
