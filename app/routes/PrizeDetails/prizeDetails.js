import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView
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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri:this.props.prizeData.Contest.Company.logo}} />
          <Text style={styles.storeName}> { this.props.prizeData.Contest.Company.name }</Text>
          <Text style={styles.mediumText}> { this.props.prizeData.name }</Text>
          <Text style={styles.normalText}> { this.props.prizeData.description }</Text>
          <Text style={styles.codeTitle}>Código:</Text>
          <Text style={styles.code}> {this.props.prizeData.code} </Text>
        </View>
      </ScrollView>
    );
  }
}
