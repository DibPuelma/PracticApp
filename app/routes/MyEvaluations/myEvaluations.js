import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import evaluationsData from './evaluationsData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';

export default class MyEvaluations extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
      ready: false,
      uri: 'https://practicapi.herokuapp.com/user/' + props.user.id + '/answered_poll'
    };
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount(){
    fetch(this.state.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson)});
      this.setState({ ready: true});
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

  _backToPrevious() {
    this.props.navigator.replace({id:'QRReader'});
    return true; // This is important to prevent multiple calls
  }
  render() {
    if (!this.state.ready) {
      return (
        <LoadingSpinner/>
      );
    }
    else {
      return (
        <View style={styles.container}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <TouchableHighlight onPress={() => this._goToDetails(rowData.id, rowData.location,rowData.logo)} >
          <View style={styles.listElement}>

          <View style={styles.sideContainer}>
          <Image source={{uri: rowData.logo}} style={styles.image} />
          </View>

          <View style={styles.middleContainer}>
          <Text numberOfLines={3} style={styles.comment}>{rowData.location}</Text>
          </View>

          <View style={styles.sideContainer}>
          {this._getAverageColor(rowData.avg)}
          </View>

          </View>
          </TouchableHighlight>
        )
      }
      />
      </View>
    );
  }

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
