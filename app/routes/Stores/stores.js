import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView
} from 'react-native';

import storeData from './storeData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';


export default class Stores extends Component {

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
    this.props.navigator.replace({id:'scanner'});
    return true; // This is important to prevent multiple calls
  }

  render(){
    return(
      <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
      {storeData.stores.map((store, i) => (
        <View key={i} style={styles.logo}>
        <Image source={{uri: store}} style={styles.logo} />
        </View>
      ))}
      </ScrollView>
      </View>
    );
  }
}
