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
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    console.log("Poping SE");
    Alert.alert(
      '¿Quieres salir de la encuesta?',
      'Recuerda que con solo 1 minuto de tu tiempo puedes ayudar a esta tienda a mejorar su servicio. Además estarás participando por premios mensuales',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Sí', onPress: () => this.props.navigator.replace({id: 'QRReader'})},
      ]
    )
    return true; // This is important to prevent multiple calls
  }

  render(){
    store = this.props.codeData.data;
    console.log(store);
    switch (store) {
      case 'encuesta1'://contentContainerStyle
        return (
          <ScrollView style={styles.container}>
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
          <ScrollView style={styles.container}>

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
          <View style={{flex:1, marginTop: 72}}>
            <Text> Código no es válido </Text>
          </View>
        );
    }
  }
  _buttonPressed(employeeId, wasAtended){
    pollData = {wasAtended:wasAtended, store:this.props.codeData.data, employeeId:employeeId}
    this.props.navigator.push({id:'Poll', pollData:pollData});
  }
}
