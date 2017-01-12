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
//import { FBLoginManager } from 'react-native-facebook-login';

import Splash from './routes/Splash/Splash';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';

import ControlPanel from './components/ControlPanel/ControlPanel';

import QRReader from './routes/QRReader/reader';
import Poll from './routes/Poll/poll';
import SelectEmployee from './routes/SelectEmployee/selectEmployee';
import PollAnswered from './routes/PollAnswered/pollAnswered';

import MyAccount from './routes/MyAccount/myAccount';
import MyEvaluations from './routes/MyEvaluations/myEvaluations';
import MyPrizes from './routes/MyPrizes/myPrizes';
import EvaluationDetails from './routes/EvaluationDetails/evaluationDetails';
import Stores from './routes/Stores/stores';
import Ranking from './routes/Ranking/Ranking';

import PrizeDetails from './routes/PrizeDetails/prizeDetails'; //?

var burgerIcon = require('./images/ic_menu_black_48dp.png')

let _emitter = new EventEmitter();

export default class Practicapp extends Component {
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
        this._navigator.replace({id: 'QRReader', passProps: {user: JSON.parse(value)}}); 
      } else {
        this._navigator.replace({id: 'HomePage', displayNavbar: false}); 
      }
    }).done();
  }

  navigate(route) {
    if (route.id === 'Logout') {
      // Delete user stored data
      AsyncStorage.setItem('user', '');

      // TODO: Facebook logout

      // Add redirect
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
      return (<Splash navigator={navigator} />);
    }

    // Login
    if (route.id === 'HomePage') {
      return (<Home navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'LoginPage') {
      return (<Login navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'RegisterPage') {
      return (<Register navigator={navigator} {...route.passProps} />);
    }

    // General
    if (route.id === 'QRReader') {
      return (<QRReader navigator={navigator} {...route.passProps}
                onCodeRead={(data) => {navigator.replace({id: 'selectEmployee', codeData: data})}}
                />);
    }
    if (route.id === 'MyAccount') {
      return (<MyAccount navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyPolls') {
      return (<MyPolls navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyPrizes') {
      return (<MyPrizes navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'MyEvaluations') {
      return (<MyEvaluations navigator={navigator} {...route.passProps} />);
    }
    if (route.id == 'evaluationDetails') {
      return(<EvaluationDetails navigator={navigator} evaluationData={route.evaluationData} />);
    }
    if (route.id === 'Stores') {
      return (<Stores navigator={navigator} {...route.passProps} />);
    }
    if (route.id === 'Ranking') {
      return (<Ranking navigator={navigator} {...route.passProps} />);
    }

    if (route.id === 'prizeDetails') {
      return(<PrizeDetails navigator={navigator} prizeData={route.prizeData}/>);
    }

    // Poll
    if (route.id === 'poll') {
      return (<Poll pollData={route.pollData} navigator={navigator}/>);
    }
    if (route.id === 'selectEmployee') {
      return(<SelectEmployee codeData={route.codeData} navigator={navigator} />);
    }
    if (route.id === 'pollAnswered') {
      return(<PollAnswered pollData={route.pollData} navigator={navigator} pollAnswers={route.pollAnswers} />);
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

      case 'QRReader'         : title = 'Escanner'; break;
      case 'MyAccount'        : title = 'Mi Cuenta'; break;
      case 'PollAnswered'     : title = 'Mis Sorteos'; break;
      case 'MyPrizes'         : title = 'Mis Premios'; break;
      case 'MyEvaluations'    : title = 'Mis Evaluaciones'; break;
      case 'Stores'           : title = 'Tiendas'; break;
      case 'Ranking'          : title = 'Ranking'; break;
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


/**

  navigatorRenderScene(route, navigator){
    switch(route.id){
      case 'poll':
      return (
        <Poll pollData={route.pollData} navigator={navigator}/>
      );
      case 'selectEmployee':
      return(
        <SelectEmployee codeData={route.codeData} navigator={navigator} />
      );
      case 'pollAnswered':
      return(
        <PollAnswered pollData={route.pollData} navigator={navigator} pollAnswers={route.pollAnswers} />
      );

    }
  }
*/