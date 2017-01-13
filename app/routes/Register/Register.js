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
  AsyncStorage,
  Picker
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';

var LoginStatus = {
  SLEEPING: 'slepping',
  REQUESTING: 'requesting',
  LOGGED: 'logged'
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', lastName: '', email: '', password: '', confirmPassword: '', status: LoginStatus.SLEEPING};
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
      <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.loginColumn}>
          <View style={styles.logo} />
          <Text style={styles.title}>Registro</Text>
            { this.state.error &&
              <Text style={{color: 'red'}}>{this.state.error}</Text>
            }

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                style={{height: 40, flex:1}}
                placeholder="Nombre"
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                style={{height: 40, flex:1}}
                placeholder="Apellido"
                onChangeText={(text) => this.setState({lastName: text})}
              />
            </View>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                style={{height: 40, flex:1}}
                placeholder="Correo"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>

            <View style={{flexDirection: 'row', marginLeft: 6}}>
              <Text style={{fontSize: 12, color: '#999', flex: 1}}>Género:</Text>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <Picker style={{flex: 1}} onValueChange={(g) => this.setState({gender: g})}>
                <Picker.Item label="Masculino" value="m" />
                <Picker.Item label="Femenino" value="f" />
                <Picker.Item label="Otro" value="o" />
              </Picker>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <DatePicker
                style={{flex: 1}}
                date={this.state.birthdate}
                mode="date"
                placeholder="Fecha de nacimiento"
                format="DD/MM/YYYY"
                minDate="01/01/1900"
                maxDate="01/01/2010"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(birthdate) => {this.setState({birthdate: birthdate})}}
              />
            </View>


            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                secureTextEntry={true}
                style={{height: 40, flex:1}}
                placeholder="Contraseña"
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                maxLength = {30}
                secureTextEntry={true}
                style={{height: 40, flex:1}}
                placeholder="Confirmar Contraseña"
                onChangeText={(text) => this.setState({confirmPassword: text})}
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
      </ScrollView>
    );
  }

  _login() {
    // Change login status
    this.setState({text: '', status: LoginStatus.REQUESTING, error: false});

    // Collect user input
    var name            = this.state.name;
    var lastName        = this.state.lastName;
    var email           = this.state.email;
    var password        = this.state.password;
    var confirmPassword = this.state.confirmPassword;

    var birthdate = this.state.birthdate;
    var gender    = this.state.gender;

    var validation = this._validate(name, lastName, email, password, confirmPassword, birthdate);
    if (!validation.result) {
      this._setError(validation.message);
      return;
    }

    // Make a login request
    var login = this;

    var promise = new Promise(function(resolve, reject) {
      var response = login._validateAPI(email, password) ? {status: 'ok'} : {status: 'error'};

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

      var user = {name: name, lastName: lastName, gender: gender, birthdate: birthdate, email: email};
      login.setState({user: user});

      AsyncStorage.setItem("user", JSON.stringify(user));

      login._goToMain();
    }, function(err) { // error
      // TODO: switch depending on response error
      console.log(err);
      login._setError('Usuario o contraseña inválidos');
    });
  }

  _validate(name, lastName, email, password, confirmPassword, birthdate) {
    if (name.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0 ||
        confirmPassword.length == 0 || birthdate === undefined)
      return {result: false, message: 'Debes llenar todos los campos'};

    if (password !== confirmPassword)
      return {result: false, message: 'Las contraseñas deben coincidir'};

    return {result: true};
  }

  _validateAPI(email, password) {
    return true;
  }

  _setError(message) {
    this.setState({status: LoginStatus.SLEEPING, error: message});
  }

  _backToMainMenu() {
    this.props.navigator.pop();
    return true; // This is important to prevent multiple calls
  }

  _goToMain() {
    this.removeBackEvent();
    this.props.navigator.push({id: 'QRReader', passProps: {user: this.state.user}});
  }
}
