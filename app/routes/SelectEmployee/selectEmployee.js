import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import {
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View,
  BackAndroid,
  Alert,
  ActivityIndicator,
  NetInfo
} from 'react-native';

import styles from './styles';
import employeesData from './employeesData.json';
import backButtonHandler from '../../lib/backButtonHandler';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import NotConnected from '../../components/NotConnected/NotConnected';
import CenteredMessage from '../../components/CenteredMessage/centeredMessage';
import settings from '../../config/settings';

var status = {
  WAITING: 'waiting',
  READY: 'ready',
  NOTCONNECTED: 'notConnected'
};

export default class SelectEmployee extends Component{

  constructor(props){
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    var uri = settings.SELLPOINT_BY_CODE_REQUEST.replace(":code", props.codeData.data)
    console.log('uri: ', uri);
    this.state = {
      uri: uri,
      status: status.WAITING,
      storeData: {},
      validCode: false
    }
  }

  componentDidMount() {
    this._checkNetwork();
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  render(){
    if(this.state.status === status.WAITING) {
      return (
        <LoadingSpinner/>
      );
    }
    else if (this.state.status === status.READY && !this.state.validCode) {
      return (
        <CenteredMessage message="Código invalido, solamente puede escanear en locales adheridos" />
      )
    }
    else if(this.state.status === status.NOTCONNECTED) {
      return (
        <NotConnected tryAgain={this._checkNetwork} />
      );
    }
    else if (this.state.status === status.READY && this.state.validCode) {
      return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}> Local {this.state.storeData.location} </Text>
        <List containerStyle={{marginTop: 20}}>
        {
          this.state.storeData.Employees.map((employee, i) => {
            return (
              <ListItem
              roundAvatar
              onPress={() => this._buttonPressed(employee.id, true, employee.name)}
              avatar={{uri:this._getEmployeePicture(employee.picture)}}
              key={i}
              title={employee.name + ' ' + employee.last_name}
              />
            )
          })
        }
        <ListItem
        roundAvatar
        onPress={() => this._buttonPressed(0, true, null)}
        avatar={{uri:this._getEmployeePicture('')}}
        key='noRemember'
        title='No lo recuerdo'
        />
        <ListItem
        roundAvatar
        onPress={() => this._buttonPressed(0, false, null)}
        avatar={{uri:this._getEmployeePicture('')}}
        key='notAttended'
        title='No me atendieron'
        />
        </List>
        </ScrollView>
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
      if(responseJson !== null){
        this.setState({
          storeData: responseJson,
          status: status.READY,
          validCode: true
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _backToPrevious() {
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

  _buttonPressed(employeeId, wasAttended, employeeName){
    var sellPointPollId = wasAttended ? this.state.storeData.attended_poll_id : this.state.storeData.unattended_poll_id
    pollData = {
      wasAttended:wasAttended,
      companyId:this.state.storeData.company_id,
      employeeId:employeeId,
      pollId:sellPointPollId,
      sellPointId:this.state.storeData.id,
      storeName:this.state.storeData.location,
      employeeName:employeeName
    }
    this.props.navigator.push({id:'Poll', pollData:pollData});
  }

  _getEmployeePicture(picture){
    if(picture !== "") {
      return picture;
    }
    return 'http://www.free-icons-download.net/images/user-icon-27998.png';
  }
}
