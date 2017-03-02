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
import OneSignal from 'react-native-onesignal'; // Import package from node modules

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
import MyContests from './routes/MyContests/myContests';
import MyEvaluations from './routes/MyEvaluations/myEvaluations';
import MyPrizes from './routes/MyPrizes/myPrizes';
import EvaluationDetails from './routes/EvaluationDetails/evaluationDetails';
import Stores from './routes/Stores/stores';
import Ranking from './routes/Ranking/Ranking';

import PrizeDetails from './routes/PrizeDetails/prizeDetails'; //?

var burgerIcon = require('./images/ic_menu_black_48dp.png');
let _emitter = new EventEmitter();
var user = null;


// OneSignal.configure({
//   onIdsAvailable: function(device) {
//     console.log('UserId = ', device.userId);
//     console.log('PushToken = ', device.pushToken);
//   },
//   onNotificationOpened: function(message, data, isActive) {
//     if(data.hasOwnProperty('premio')){
//
//     }
//     console.log('MESSAGE: ', message);
//     console.log('DATA: ', data);
//     console.log('ISACTIVE: ', isActive);
    // Do whatever you want with the objects here
    // _navigator.to('main.post', data.title, { // If applicable
    //  article: {
    //    title: data.title,
    //    link: data.url,
    //    action: data.actionSelected
    //  }
    // });
//   }
// });
//
// OneSignal.enableInAppAlertNotification(true);

export default class Practicapp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;

    _emitter.addListener('openMenu', () => {
      this.openDrawer();
    });

    _emitter.addListener('back', () => {
      self._navigator.pop();
    });

    AsyncStorage.getItem("user").then((value) => {
      console.log("LOADED: " + value);

      if (value) {
        this._navigator.replace({id: 'QRReader', login: {user: JSON.parse(value)}});
      } else {
        this._navigator.replace({id: 'HomePage', displayNavbar: false});
      }
    }).done();


    OneSignal.configure({
      onIdsAvailable: (device) => {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
      },
      onNotificationReceived: (notification) => {
        console.log("notification received: ", notification);
      },
      onNotificationOpened: (openResult) => {
        this._processNotification(openResult);
      }
    });
  }

  navigate(route) {
    if (route.id === 'Logout') {
      // Delete user stored data
      AsyncStorage.setItem('user', '');
      user = null;

      // TODO: Facebook logout

      // Add redirect
      this._navigator.replace({id: 'HomePage', displayNavbar: false});
      this.closeDrawer();
    } else {
      this._navigator.replace(route);
      this.closeDrawer();
    }
  }

  componentWillUnmount() {
    console.log("qljefahndfhbaskfhbaskldjfbaslkdfjbaslkdfj");
    OneSignal.configure({
      onNotificationOpened: () => {}
    });
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
    // Set user if is a login request and is not set
    if ('login' in route && user == null) {
      user = route.login.user;
      console.log(user);
    }

    if (!('passProps' in route))
    route.passProps = {};

    if (user != null)
    route.passProps.user = user;

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
        onCodeRead={(data) => {navigator.replace({id: 'SelectEmployee', codeData: data})}}
        />);
      }
      if (route.id === 'MyAccount') {
        return (<MyAccount navigator={navigator} {...route.passProps} />);
      }
      if (route.id === 'MyContests') {
        return (<MyContests navigator={navigator} {...route.passProps} />);
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
      if (route.id === 'EvaluationDetails') {
        return(<EvaluationDetails navigator={navigator} answeredPollId={route.answeredPollId} sellPointData={route.sellPointData} {...route.passProps}/>);
      }
      if (route.id === 'Stores') {
        return (<Stores navigator={navigator} {...route.passProps} />);
      }

      if (route.id === 'PrizeDetails') {
        return(<PrizeDetails navigator={navigator} prizeData={route.prizeData}/>);
      }

      // Poll
      if (route.id === 'Poll') {
        return (<Poll pollData={route.pollData} navigator={navigator} {...route.passProps}/>);
      }
      if (route.id === 'SelectEmployee') {
        return(<SelectEmployee codeData={route.codeData} navigator={navigator} {...route.passProps}/>);
      }
      if (route.id === 'PollAnswered') {
        return(<PollAnswered pollData={route.pollData} navigator={navigator} pollAnswers={route.pollAnswers} {...route.passProps}/>);
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
      if (this._drawer != null)
      this._drawer.open();
    }

    closeDrawer() {
      if (this._drawer != null)
      this._drawer.close();
    }
    _processNotification(openResult){
      switch (openResult.notification.payload.additionalData.type) {
        case 'prize':
        this._navigator.replace({id: 'MyPrizes'});
        break;
        case 'evaluation':
        this._navigator.replace({id: 'MyEvaluation'});
        break;
      }
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

      case 'QRReader'         : title = 'Escaner'; break;
      case 'MyAccount'        : title = 'Mi Cuenta'; break;
      case 'MyContests'       : title = 'Mis Sorteos'; break;
      case 'PollAnswered'     : title = 'Encuesta contestada'; break; // ?
      case 'MyPrizes'         : title = 'Mis Premios'; break;
      case 'MyEvaluations'    : title = 'Mis Evaluaciones'; break;
      case 'Stores'           : title = 'Tiendas'; break;
      case 'EvaluationDetails': title = 'Detalles de la evaluación'; break;
      case 'SelectEmployee'   : title = 'Seleccione quién lo atendió'; break;
      case 'Poll'             : title = 'Conteste la encuesta'; break;

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
