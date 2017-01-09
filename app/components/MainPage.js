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

class MainPage extends Component {

  constructor(props) {
    super(props);
    console.log(props.user);
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={Navigator.NavigationBar.StylesIOS} 
            style={{backgroundColor: '#3FA9F5'}}
            routeMapper={NavigationBarRouteMapper} />
        }
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <View style={styles.loginColumn}>
          <View style={styles.logo} />
        </View>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => console.log("hello menu")}>
        <Text style={{color: 'white', marginLeft: 10}}>
          Menu
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    /*return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          hOLA
        </Text>
      </TouchableOpacity>
    );*/
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
    <View style={styles.title}>
      <Text style={{color: 'white', fontSize: 16, flex: 1, paddingTop: 12}}>
        Main View
      </Text>
    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0, marginTop: 0
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

module.exports = MainPage;
