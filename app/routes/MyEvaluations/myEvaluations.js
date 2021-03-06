import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'

import {
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  NetInfo,
  ActivityIndicator,
  ListView
} from 'react-native';

import evaluationsData from './evaluationsData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import CenteredMessage from '../../components/CenteredMessage/centeredMessage';
import NotConnected from '../../components/NotConnected/NotConnected';

import settings from '../../config/settings';

var status = {
  WAITING      : 'waiting',
  EMPTY        : 'empty',
  READY        : 'ready',
  NOTCONNECTED : 'notConnected'
};

export default class MyEvaluations extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var uri = settings.USER_EVALUATIONS_REQUEST.replace(":id", props.user.id);
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
      status: status.WAITING,
      uri: uri
    };
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount(){
    this._checkNetwork()
  }

  componentWillMount(){
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.replace({id:'QRReader'});
    return true; // This is important to prevent multiple calls
  }
  render() {
    if (this.state.status === status.WAITING) {
      return (
        <LoadingSpinner/>
      );
    }
    else if(this.state.status === status.EMPTY) {
      return(
        <CenteredMessage message="Aún no contestas ninguna encuesta. Escanea un código QR en alguno de nuestros locales adheridos para hacerlo." />
      );
    }
    else if(this.state.status === status.NOTCONNECTED) {
      return (
        <NotConnected tryAgain={this._checkNetwork} />
      );
    }
    else {
      return (
        <ScrollView style={styles.container}>
        <List containerStyle={{marginTop: 20}}>
        {
          this.state.rawData.map((evaluation, i) => {
            return (
              <ListItem
              onPress={() => this._goToDetails(evaluation.id, evaluation.location,evaluation.logo)}
              avatar={{uri:evaluation.logo}}
              key={i}
              title={evaluation.location}
              subtitle={evaluation.avg !== null ? 'Promedio: ' + evaluation.avg.substring(0,3) : 'No existe promedio'}
              />
            )
          })
        }
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
    if(Object.keys(responseJson).length === 0) {
      this.setState({status: status.EMPTY})
    }
    else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson),
        status: status.READY,
        rawData: responseJson
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

_getComment(answers){
  var comment = "No se registró ningún comentario"
  answers.map((data) => {
    if(data.string_value !== null){
      comment = data.string_value;
    }
  })
  return (<Text numberOfLines={3} style={styles.comment}>{comment}</Text>)
}
_getAverageColor(average) {
  if(average === null){
    return (
      <Text style={[styles.average]}>N/A</Text>
    );
  }
  if(average < 2){
    return (
      <Text style={[styles.average, {color: '#F03C02'}]}>{average.substring(0,3)}</Text>
    );
  }
  else if(average < 4) {
    return (
      <Text style={[styles.average, {color: '#F38630'}]}>{average.substring(0,3)}</Text>
    );
  }
  else if (average < 5){
    return (
      <Text style={[styles.average, {color: '#2DBB28'}]}>{average.substring(0,3)}</Text>
    );
  }
  else {
    return (
      <Text style={[styles.average, {color: '#E4C005'}]}>{average.substring(0,3)}</Text>
    );
  }
}
_goToDetails(id, name, logo){
  var sellPointData = {
    id:id,
    logo:logo,
    name:name
  };

  this.props.navigator.push({id:'EvaluationDetails', sellPointData:sellPointData})
}
}
