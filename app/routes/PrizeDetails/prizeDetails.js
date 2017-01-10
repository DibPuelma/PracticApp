import React, { Component } from 'react';
import {
  Image,
  Text,
  View
} from 'react-native';

import backButtonHandler from '../../lib/backButtonHandler';
import styles from './styles';

export default class PrizeDetails extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._backToPrevious = this._backToPrevious.bind(this);
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.pop();
    return true; // This is important to prevent multiple calls
  }

  render(){
    return(
      <View style={styles.background}>
      <View style={styles.container}>
      <Image style={styles.logo} source={{uri:this.props.prizeData.logo}} />
      <Text style={styles.storeName}> {this.props.prizeData.store}</Text>
      <Text style={styles.mediumText}> ¡Felicitaciones! Has ganado {this.props.prizeData.prize} pesos en productos {this.props.prizeData.store}.</Text>
      <Text style={styles.normalText}> Para canjearlos anda a cualquier tienda de la marca y muestra el código que aparece a continuación a cualquier vendedor</Text>
      <Text style={styles.code}> {this.props.prizeData.code} </Text>
      </View>
      </View>
    );
  }
}
