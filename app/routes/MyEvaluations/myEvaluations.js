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
      uri: 'https://practicapi.herokuapp.com/user/1/answered_poll'
    };
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount(){
    //TODO: replace 3 for user_id or username.
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
  //TODO: add logo
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
          <TouchableHighlight onPress={() => this._goToDetails(rowData.id)} >
          <View style={styles.listElement}>
          <Image source={{uri:"http://zapalook.com.ar/wp-content/uploads/2015/07/logo-Amphora.jpg"}} style={styles.image} />
          {this._getComment(rowData.Answers)}

          <Text style={styles.average}>{rowData.id}</Text>
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
  {console.log("Answers es")}
  {console.log("Typo   " + typeof(answers))}
  {console.log(answers)}
  {console.log("Primer elemento   ")}
  {console.log(answers[0])}
  var comment = "No se registró ningún comentario"
  answers.map((data) => {
    if(data.string_value !== null){
      comment = data.string_value;
    }
  })
  return (<Text numberOfLines={3} style={styles.comment}>{comment}</Text>)
}
_goToDetails(id){
  this.props.navigator.push({id:'EvaluationDetails', answeredPollId: id})
}
}
