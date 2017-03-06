import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  NetInfo
} from 'react-native';

import accountData from './accountData';
import backButtonHandler from '../../lib/backButtonHandler';
import styles from './styles';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import NotConnected from '../../components/NotConnected/NotConnected';
import settings from '../../config/settings';

var status = {
  READY: 'ready',
  WAITING: 'waiting',
  NOTCONNECTED: 'notConnected'
}

export default class EvaluationDetails extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._backToPrevious = this._backToPrevious.bind(this);
    var uri = settings.USER_REQUEST.replace(":id", props.user.id);
    this.state = {
      status: status.WAITING,
      uri: uri
    };
  }

  componentDidMount(){
    this._checkNetwork();
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.replace({id: 'QRReader'});
    return true; // This is important to prevent multiple calls
  }

  render(){
    if (this.state.status === status.WAITING) {
      return (
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
        <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userData}>
        <Text style={styles.name}> Hola {this.state.userData.first_name} {this.state.userData.last_name}</Text>
        <Text style={styles.email}> {this.state.userData.email} </Text>
        </View>
        <View style={styles.badgesContainer}>

        <View style={styles.rowOfBadges}>
        <View style={styles.badge}>
        <Text style={styles.normalText}> Puntos </Text>
        <Text style={styles.normalText}> {accountData.points} </Text>
        </View>

        <View style={styles.badge}>
        <Text style={styles.normalText}> Evaluación Promedio </Text>
        <Text style={styles.normalText}> {accountData.totalAverage} </Text>
        </View>

        <View style={styles.badge}>
        <Text style={styles.normalText}> Premios Ganados </Text>
        <Text style={styles.normalText}> {accountData.prizesWon} </Text>
        </View>
        </View>

        <View style={styles.rowOfBadges}>
        <View style={styles.badge}>
        <Text style={styles.normalText}> Encuestas contestadas </Text>
        <Text style={styles.normalText}> {accountData.pollsAnswered} </Text>
        </View>

        <View style={styles.badge}>
        <Text style={styles.normalText}> Tiendas ayudadas </Text>
        <Text style={styles.normalText}> {accountData.storesHelped} </Text>
        </View>

        <View style={styles.badge}>
        <Text style={styles.normalText}> Marcas Ayudadas </Text>
        <Text style={styles.normalText}> {accountData.brandsHelped} </Text>
        </View>
        </View>

        <View style={styles.badge}>
        <Text style={styles.normalText}> Nivel </Text>
        <Text style={styles.normalText}> {accountData.level} </Text>
        </View>

        </View>
        </ScrollView>
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
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userData: responseJson,
        status: status.READY
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
