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
} from 'react-native';

class HomePage extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        />
    );
  }

  renderScene(route, navigator) {
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
            <TouchableHighlight style={styles.fullWidthButton} underlayColor="#66CCF5" onPress={this._sayHello.bind(this)}>
              <Text style={styles.fullWidthButtonText}>ENTRAR CON FACEBOOK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  
  _goToLogin() {
    this.props.navigator.push({id: 'LoginPage'});
  }

  _goToRegister() {
    this.props.navigator.push({id: 'RegisterPage'});
  }

  _sayHello() {
    console.log("Hi");
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          返回
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Titutlo
        </Text>
      </TouchableOpacity>
    );
  }
};

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
  fullWidthButtonFirst: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  fullWidthButtonFirstText: {
    fontSize: 15,
    color: '#A7A7A7',
    paddingTop: 10,
    paddingBottom: 10
  },
  fullWidthButtonText: {
    fontSize: 15,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }
});

module.exports = HomePage;
