import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  BackAndroid
} from 'react-native';
import styles from './styles';

import backButtonHandler from '../../lib/backButtonHandler';

export default class PollAnswered extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._accept = this._accept.bind(this);
  }

  componentWillMount(){
    this._addBackEvent();
  }

  componentWillUnmount(){
    this._removeBackEvent();
  }

  _addBackEvent() {
    BackAndroid.addEventListener('hardwareBackPress', this._accept);
    this.singletonBackButtonHandler.addFunction(this._accept);
  }

  _removeBackEvent() {
    BackAndroid.removeEventListener('hardwareBackPress', this._accept);
    this.singletonBackButtonHandler.removeFunction(this._accept);
  }

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}> ¡Gracias por contestar la encuesta! </Text>
        <Text style={styles.normalText}> Tu opinión servirá para que cada vez te atiendan mejor </Text>
        <Button onPress={() => this._accept()} title="Aceptar" color="#841584"
        accessibilityLabel="Acepta"
        />
      </View>
      </View>

      // <View>
      // <Text> Gracias por contestar la encuesta </Text>
      // <Text> Tienda: {this.props.pollData.store} </Text>
      // <Text> Vendedor: {this.props.pollData.employeeId} </Text>
      // {this.props.pollAnswers.stars.map((answer, i) => (<Text key={i}> Pregunta {i+1}: {this.props.pollAnswers.stars[i]} estrellas </Text>))}
      // <Text> Comentario: {this.props.pollAnswers.comment} </Text>
      // <Button onPress={() => this._accept()} title="Aceptar" color="#841584"
      // accessibilityLabel="Acepta"
      // />
      // </View>
    );
  }
  _accept(){
    this.props.navigator.replace({id:'QRReader'});
    return true;
  }
}
