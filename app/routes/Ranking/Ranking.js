'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';


class RankingPage extends Component {

  constructor(props){
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }
  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.replace({id:'QRReader'});
    return true; // This is important to prevent multiple calls
  }

  render() {
     return (
      <View style={styles.container}>
        <Text>Ranking Page</Text>
      </View>
    );
  }
}


module.exports = RankingPage;
