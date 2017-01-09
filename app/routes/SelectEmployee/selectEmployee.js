import React, { Component } from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View,
  BackAndroid,
  Alert
} from 'react-native';

import styles from './styles';
import employeesData from './employeesData.json';
import backButtonHandler from '../../lib/backButtonHandler';

export default class SelectEmployee extends Component{

  constructor(props){
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }
  componentWillMount(){
    this._addBackEvent();
  }

  componentWillUnmount() {
    this._removeBackEvent();
  }

  _addBackEvent() {
    BackAndroid.addEventListener('hardwareBackPress', this._backToPrevious);
    this.singletonBackButtonHandler.addFunction(this._backToPrevious);
  }

  _removeBackEvent() {
    BackAndroid.removeEventListener('hardwareBackPress', this._backToPrevious);
    this.singletonBackButtonHandler.removeFunction(this._backToPrevious);
  }

  _backToPrevious() {
    console.log("Poping SE");
    Alert.alert(
      '¿Quieres salir de la encuesta?',
      'Recuerda que con solo 1 minuto de tu tiempo puedes ayudar a esta tienda a mejorar su servicio. Además estarás participando por premios mensuales',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Sí', onPress: () => this.props.navigator.replace({id: 'scanner'})},
      ]
    )
    return true; // This is important to prevent multiple calls
  }

  render(){
    store = this.props.data.data.data;
    switch (store) {
      case 'encuesta1':
      return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}> ¿Quién lo atendió hoy? </Text>

        <View style={styles.card}>

        {employeesData.images.map((source, i) => (
          <TouchableHighlight style={styles.imageChoice} key={i} onPress={() => this._buttonPressed((i+1), true)}>
          <Image style={styles.imageChoice}
          source={{uri: source}}
          />
          </TouchableHighlight>
        ))}

        <TouchableHighlight style={styles.textContainer}
        onPress={() => this._buttonPressed(0, true)}>
        <Text style={styles.textChoice}> No lo recuerdo </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.textContainer}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={styles.textChoice}> No me atendieron </Text>
        </TouchableHighlight>

        </View>
        </ScrollView>
      );
      case 'encuesta2':
      return (
        <ScrollView>

        <TouchableHighlight onPress={() => this._buttonPressed(1, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(2, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(3, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(4, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight style={{width: 150, height: 150}}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={{fontSize:20}}> No lo recuerdo </Text>
        </TouchableHighlight>

        <TouchableHighlight style={{width: 150, height: 150}}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={{fontSize:20}}> No me atendieron </Text>
        </TouchableHighlight>

        </ScrollView>
      );
      default:
      return(
        <Text> Código no es válido </Text>
      );
    }
  }
  _buttonPressed(employeeId, wasAtended){
    pollData = {wasAtended:wasAtended, store:this.props.data.data.data, employeeId:employeeId}
    this.props.navigator.push({id:'poll', pollData:pollData});
  }
}
