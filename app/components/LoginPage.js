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
  BackAndroid,
  ScrollView,
  AsyncStorage
} from 'react-native';


var LoginStatus = {
  SLEEPING: 'slepping',
  REQUESTING: 'requesting',
  LOGGED: 'logged'
}

var _navigator;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    _navigator = this.props.navigator;
    this.state = {username: '', password: '', status: LoginStatus.SLEEPING};
  }

  componentWillMount() {
    this.addBackEvent();
  }

  componentWillUnmount() {
    this.removeBackEvent();
  }

  addBackEvent() {
    BackAndroid.addEventListener('hardwareBackPress', this._backToMainMenu);  // .bind(this)
  }

  removeBackEvent() {
    BackAndroid.removeEventListener('hardwareBackPress', this._backToMainMenu); // .bind(this)
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

    var promise = new Promise(function(resolve, reject) {
      var response = login._validateAPI(username, password) ? {status: 'ok'} : {status: 'error'};

      setTimeout(function() { // Wait for api simulation    
        if (response.status === 'ok') {
          resolve("Stuff worked!");
        } else {
          reject(Error("It broke"));
        }
      }, 1000);
    });

    promise.then(function(result) { // ok
      console.log(result);
      login.setState({status: LoginStatus.LOGGED});

      var user = {name: 'User1', lastName: 'User1', gender: 'm', age: 23, email: 'user1@abc.net'};
      login.setState({user: user})

      AsyncStorage.setItem("user", JSON.stringify(user));

      login._goToMain();
    }, function(err) { // error
      // TODO: switch depending on response error
      console.log(err);
      login._setError('Usuario o contraseña inválidos');
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
    this.removeBackEvent();
    _navigator.push({id: 'MainPage', passProps: {user: this.state.user}}); //
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'center',
  },
  loginColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent:'center',
    maxWidth:250
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#E6F4F6',
    marginBottom: 20
  },
  title: {
    color: '#888888',
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold'
  },
    loginButtons: {
    flexDirection: 'row',
    marginBottom: 10
  },
  fullWidthButton: {
    flex: 1,
    backgroundColor: '#3FA9F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  fullWidthButtonText: {
    fontSize: 15,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }
});

module.exports = LoginPage;


