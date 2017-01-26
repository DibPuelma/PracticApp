import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  BackAndroid
} from 'react-native';
import styles from './styles';

import backButtonHandler from '../../lib/backButtonHandler';

import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner'

export default class PollAnswered extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._accept = this._accept.bind(this);
    this.state = {
      ready: false,
      uri: "https://practicapi.herokuapp.com/company/" +
      props.pollAnswers.companyId +
      "/poll/" +
      props.pollAnswers.pollId +
      "/answered_poll"
    }
  }

  componentDidMount(){
    console.log("URI: " + this.state.uri);
    fetch(this.state.uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId: this.props.pollAnswers.employeeId,
        sellPointId: this.props.pollAnswers.sellPointId,
        userId: this.props.pollAnswers.userId,
        answers: this.props.pollAnswers.answers
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({ready: true});
    })
    .catch((error) => {
      console.error(error);
    });
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
    if(!this.state.ready) {
      return(
        <LoadingSpinner/>
      );
    }
    else {
      return(
        <View style={styles.container}>
        <View style={styles.card}>
        <Text style={styles.title}> Tus respuestas fueron registradas ¡Gracias! </Text>
        <Text style={styles.normalText}> Tu opinión servirá para que mejoremos nuestra atención </Text>
        <Button onPress={() => this._accept()} title="Aceptar" color="#841584"
        accessibilityLabel="Acepta"
        />
        </View>
        </View>
      );
    }
  }
  _accept(){
    this.props.navigator.replace({id:'QRReader'});
    return true;
  }
}
