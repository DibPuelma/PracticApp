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
  Alert,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import employeesData from './employeesData.json';
import backButtonHandler from '../../lib/backButtonHandler';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import CenteredMessage from '../../components/CenteredMessage/centeredMessage';

export default class SelectEmployee extends Component{

  constructor(props){
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this.state = {
      uri: 'https://practicapi.herokuapp.com/QR/' + props.codeData.data + '/sellpoint',
      ready: false,
      storeData: {},
      validCode: false
    }
  }

  componentDidMount() {
    fetch(this.state.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({storeData: responseJson});
      this.setState({ready: true});
      if (responseJson.sellpoint){
        this.setState({validCode: true});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  render(){
    if(!this.state.ready) {
      return (
        <LoadingSpinner/>
      );
    }
    else if (this.state.ready && !this.state.validCode) {
      return (
        <CenteredMessage message="Código invalido, solamente puede escanear en locales adheridos" />
      )
    }
    else if (this.state.ready && this.state.validCode) {
      return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}> Encuesta para {this.state.storeData.sellpoint.location} </Text>
        <Text style={styles.title}> ¿Quién lo atendió hoy? </Text>

        <View style={styles.card}>

        {this.state.storeData.employees.map((employee, i) => {
          return this._getEmployeePicture(employee, i);
        })
      }

      <TouchableHighlight style={styles.imageContainer}
      onPress={() => this._buttonPressed(0, true)}>
      <Text style={styles.textChoice}> No lo recuerdo </Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.imageContainer}
      onPress={() => this._buttonPressed(0, false)}>
      <Text style={styles.textChoice}> No me atendieron </Text>
      </TouchableHighlight>

      </View>
      </ScrollView>
    );
  }
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

_buttonPressed(employeeId, wasAttended){
  var sellPointPollId = wasAttended ? this.state.storeData.sellpoint.attended_poll_id : this.state.storeData.sellpoint.unattended_poll_id
  pollData = {
    wasAttended:wasAttended,
    companyId:this.state.storeData.sellpoint.company_id,
    employeeId:employeeId,
    pollId:sellPointPollId,
    sellPointId:this.state.storeData.sellpoint.id,
    storeName:this.state.storeData.sellpoint.location
  }
  this.props.navigator.push({id:'Poll', pollData:pollData});
}

_getEmployeePicture(employee, i){
  var imageSource = 'http://www.free-icons-download.net/images/user-icon-27998.png';
  if(employee.picture !== "") {
    console.log("distinto");
    imageSource = employee.picture;
  }
  console.log(imageSource);
  return (
    <View key={i} style={styles.imageContainer}>
    <TouchableHighlight onPress={() => this._buttonPressed(employee.id, true)}>
    <Image style={styles.image}
    source={{uri: imageSource}}
    />
    </TouchableHighlight>
    <Text style={styles.employeeName}> {employee.name} </Text>
    </View>
  );
}
}
