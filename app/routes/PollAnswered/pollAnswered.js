import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  // BackAndroid,
  NetInfo
} from 'react-native';
import styles from './styles';

import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings';

import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import NotConnected from '../../components/NotConnected/NotConnected';

var status = {
  WAITING     : 'waiting',
  READY       : 'ready',
  NOTCONNECTED: 'notConnected'
};

export default class PollAnswered extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._accept = this._accept.bind(this);
    var uri = settings.POLL_ANSWERED.replace(':company_id', props.pollAnswers.companyId).replace(':poll_id', props.pollAnswers.pollId)
    this.state = {
      status: status.WAITING,
      uri: uri
    }
  }

  componentDidMount(){
    this._checkNetwork();
  }

  componentWillMount(){
    this._addBackEvent();
  }

  componentWillUnmount(){
    this._removeBackEvent();
  }

  _addBackEvent() {
    // BackAndroid.addEventListener('hardwareBackPress', this._accept);
    this.singletonBackButtonHandler.addFunction(this._accept);
  }

  _removeBackEvent() {
    // BackAndroid.removeEventListener('hardwareBackPress', this._accept);
    this.singletonBackButtonHandler.removeFunction(this._accept);
  }

  render(){
    if(this.state.status === status.WAITING) {
      return(
        <LoadingSpinner/>
      );
    }
    else if(this.state.status === status.NOTCONNECTED) {
      return (
        <NotConnected tryAgain={this._checkNetwork} />
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

  _checkNetwork = () => {
    this.setState({status: status.WAITING});
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
        this._load();
      }
      else {
        this.setState({status: status.NOTCONNECTED})
      }
    });
  }

  _load = () => {
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
      this.setState({status: status.READY});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _accept(){
    this.props.navigator.replace({id:'QRReader'});
    return true;
  }
}
