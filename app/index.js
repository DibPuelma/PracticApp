import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';
import QRReader from './routes/QRReader/reader';
import Poll from './routes/Poll/poll';

export default class Practicapp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Navigator
      initialRoute={{id:'scanner'}}
      renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator){
    switch(route.id){
      case 'scanner':
      return (
        <QRReader navigator={navigator} onCodeRead={(data) => {
          navigator.replace({id: 'poll', data: {data}});
        }}
        />
      );
      case 'poll':
      return (
        <Poll data={route.data} navigator={navigator} />
      );
    }
  }
}
