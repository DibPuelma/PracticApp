import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';

var HomePage     = require('./components/HomePage');
var LoginPage    = require('./components/LoginPage');
var MainPage     = require('./components/MainPage');
var RegisterPage = require('./components/RegisterPage');

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'HomePage'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
  renderScene(route, navigator) {
    if (route.id === 'HomePage') {
      return (<HomePage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'LoginPage') {
      return (<LoginPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MainPage') {
      return (<MainPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'RegisterPage') {
      return (<RegisterPage navigator={navigator} {...route.passProps} />);
    }

    return this._noRoute(navigator);
  }
  _noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>No route :0</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
