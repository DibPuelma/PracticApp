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

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

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
    this.props.navigator.push({id: 'LoginPage'});
  }

  _goToRegister() {
    this.props.navigator.push({id: 'RegisterPage'});
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
            homepage.setState({user: {name: result.first_name, lastName: result.last_name, gender: result.gender[0], age: 23, email: result.email}});

            homepage.props.navigator.push({id: 'MainPage', passProps: {user: this.state.user}}); //resetTo
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
  },
  facebookButton: {
    height: 32,
    width: 180,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5

  }
});

module.exports = HomePage;
