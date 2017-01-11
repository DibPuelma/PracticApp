import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import Drawer from 'react-native-drawer'

import { EventEmitter } from 'fbemitter';

var SplashPage   = require('./components/SplashPage');

var HomePage     = require('./components/HomePage');
var LoginPage    = require('./components/LoginPage');
var MainPage     = require('./components/MainPage');
var RegisterPage = require('./components/RegisterPage');
var ControlPanel = require('./components/ControlPanel');

var MyAccountPage     = require('./components/MyAccountPage');
var MySweepstakesPage = require('./components/MySweepstakesPage');
var MyPrizesPage      = require('./components/MyPrizesPage');
var MyEvaluationsPage = require('./components/MyEvaluationsPage');
var ShopsPage         = require('./components/ShopsPage');
var RankingPage       = require('./components/RankingPage');

var burgerIcon = require('./images/ic_menu_black_48dp.png')

let _emitter = new EventEmitter();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;

    _emitter.addListener('openMenu', () => {
      self._drawer.open();
    });

    _emitter.addListener('back', () => {
      self._navigator.pop();
    });

    AsyncStorage.getItem("user").then((value) => {
      console.log("LOADED: " + value);
      
      if (value) {
        this._navigator.replace({id: 'MainPage', passProps: {user: JSON.parse(value)}}); 
      } else {
        this._navigator.replace({id: 'HomePage', displayNavbar: false}); 
      }
    }).done();
  }

  navigate(route) {
    if (route.id === 'Logout') {
      // TODO: add facebook logout call here
      AsyncStorage.setItem('user', '');
      this._navigator.replace({id: 'HomePage', displayNavbar: false}); 
      this._drawer.close();
    } else {
      this._navigator.replace(route);
      this._drawer.close();
    }
  }

  render() {
    return (
      <Drawer 
        content={<ControlPanel closeDrawer={this.closeDrawer.bind(this)} navigate={this.navigate.bind(this)} />} 
        ref={(ref) => this._drawer = ref} 
        {...drawerProps}
        >
        <Navigator
          ref={(ref) => this._navigator = ref}
          initialRoute={{id: 'SplashPage', displayNavbar: false}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={
            <NavigationBar
              navigationStyles={Navigator.NavigationBar.StylesIOS} 
              style={{backgroundColor: '#3FA9F5'}}
              routeMapper={NavigationBarRouteMapper}
              />
          }
          />
        </Drawer> 
    );
  }
  //Navigator.NavigationBar
  renderScene(route, navigator) {
    // Init
    if (route.id === 'SplashPage') {
      return (<SplashPage navigator={navigator} />);
    }

    // Login
    if (route.id === 'HomePage') {
      return (<HomePage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'LoginPage') {
      return (<LoginPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'RegisterPage') {
      return (<RegisterPage navigator={navigator} {...route.passProps} />);
    }

    // App
    if (route.id === 'MainPage') {
      return (<MainPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyAccountPage') {
      return (<MyAccountPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MySweepstakesPage') {
      return (<MySweepstakesPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyPrizesPage') {
      return (<MyPrizesPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyEvaluationsPage') {
      return (<MyEvaluationsPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'ShopsPage') {
      return (<ShopsPage navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'RankingPage') {
      return (<RankingPage navigator={navigator} {...route.passProps} />);
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

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }
}


class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.displayNavbar === false) {
        return null;
      }
    }

    return super.render();
  }
}



var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, paddingLeft: 20}}
           onPress={() => {_emitter.emit('openMenu')}}>
        <Image
          style={{marginTop:-8, width: 42, height: 42, tintColor: '#FFF'}}
          source={burgerIcon}
        />
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
    var title;
    switch (route.id) {
      case 'HomePage'         : title = ''; break;
      case 'LoginPage'        : title = ''; break;
      case 'RegisterPage'     : title = ''; break;
      case 'MainPage'         : title = 'Escanner'; break;
      case 'MyAccountPage'    : title = 'Mi Cuenta'; break;
      case 'MySweepstakesPage': title = 'Mis Sorteos'; break;
      case 'MyPrizesPage'     : title = 'Mis Premios'; break;
      case 'MyEvaluationsPage': title = 'Mis Evaluaciones'; break;
      case 'ShopsPage'        : title = 'Tiendas'; break;
      case 'RankingPage'      : title = 'Ranking'; break;
    }

    return (
      <Text style={{color: 'white', fontSize: 16, flex: 1}}>
        {title}
      </Text>
    );
  }
};

var styles = {

};

//  content: {<ControlPanel />},
var drawerProps = {
  type: "overlay",
  tapToClose: true,
  openDrawerOffset: 0.2, // 20% gap on the right side of drawer
  panCloseMask: 0.2,
  closedDrawerOffset: -3,
  styles: drawerStyles,
  tweenHandler: (ratio) => ({
      main: { opacity:(2-ratio)/2 }
    })
};

const drawerStyles = {
  drawer: {
    shadowColor: '#000000', 
    shadowOpacity: 1.0,
    shadowRadius: 8
  },
  main: {paddingLeft: 3},
}
