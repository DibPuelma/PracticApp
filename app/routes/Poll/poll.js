import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Button,
  TextInput,
  BackAndroid,
  ScrollView,
  Picker,
  Alert
} from 'react-native';

import styles from './styles';
import attendedJson from './jsonattended.json';
import backButtonHandler from '../../lib/backButtonHandler';

import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import MyStarRating from '../../components/MyStarRating/myStarRating';

export default class Poll extends Component {
  constructor(props){
    super(props);
    var pollToGet = props.pollData.wasAttended ? "/attended_poll" : "/unattended_poll";
    this.state = {uri: "https://practicapi.herokuapp.com/company/" +
    props.pollData.companyId +
    "/sell_point/" +
    props.pollData.sellPointId +
    pollToGet
  }
  console.log("URI: " + this.state.uri);
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
    this.setState({pollData: responseJson});
    this.setState({ready: true});
    this.setState({totalQuestions: responseJson.Questions.length});
    for(i = 0; i < this.state.totalQuestions; i++){
      var keyValue = {}
      keyValue[responseJson.Questions[i].id] = "";
      this.setState(keyValue);
    }
    console.log("################# POLLDATA");
    console.log(this.state.pollData.Questions);
    console.log("################# POLLDATA");
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
  this.props.navigator.pop();
  return true; // This is important to prevent multiple calls
}

render(){
  wasAtended = this.props.pollData.wasAtended;
  if(!this.state.ready) {
    return(
      <LoadingSpinner/>
    )
  }
  else {
    return(
      <ScrollView style={styles.container}>
      <Text style={styles.title}> Encuesta para {this.props.pollData.storeName} </Text>
      <View style={styles.card}>
      {this.state.pollData.Questions.map((question, i) => {
        return this._getQuestion(question, i);
      })}

      <View style={styles.sendButton}>
      <Button onPress={() => this._sendPollAlert()} title="Enviar encuesta" color="#841584"
      accessibilityLabel="Envía la encuesta"
      />
      </View>

      </View>
      </ScrollView>
    );
  }
}
_addValueToState(question, value){
  var newValue = {};
  newValue[question] = value
  this.setState(newValue);
}
_sendPollAlert(){
  Alert.alert(
    '¿Estás listo con tus respuestas?',
    'Después de esto no hay vuelta atrás',
    [
      {text: 'No', style: 'cancel'},
      {text: 'Sí', onPress: () => this._sendPoll()},
    ]
  )
}
_sendPoll(){
  pollAnswers = {
    "employeeId":this.props.pollData.employeeId,
    "sellPointId":this.props.pollData.sellPointId,
    "userId":this.props.user.id,
    "pollId":this.props.pollData.pollId,
    "companyId":this.props.pollData.companyId,
    "answers":[]
  }
  this.state.pollData.Questions.map((question, i) => {
    var answer = {"question":question.id};
    switch (question.type) {
      case 'text':
      answer["string_value"] = this.state[question.id];
      break;
      case 'number':
      answer["number_value"] = this.state[question.id];
      break;
      case 'options':
      answer["possible_option_id"] = this.state[question.id];
      break;
      case 'boolean':
      answer["boolean_value"] = this.state[question.id];
      break;
    }
    pollAnswers.answers.push(answer);
  })
  console.log("IMPRIMIENDO pollAnswers");
  console.log(pollAnswers);
  this.singletonBackButtonHandler.removeAllListeners();
  this.props.navigator.push({id:'PollAnswered', pollAnswers:pollAnswers});
}
_getQuestion(question, i){
  switch(question.type){
    case 'text':
    return (
      <View key={i} style={styles.question}>
      <Text style={styles.questionText}>{question.text}</Text>
      <TextInput
      style={styles.textInput}
      onChangeText={(text) => this._addValueToState(question.id, text)}
      value={this.state.text}
      />
      </View>
    );

    case 'number':
    return (
      <View key={i} style={styles.question}>
      <Text style={styles.questionText}>{question.text}</Text>
      <MyStarRating style={styles.stars} isDisabled={false} onChange={(value) => this._addValueToState(question.id, value)}/>
      </View>
    );

    case 'options':
    return (
      <View key={i} style={styles.question}>
      <Text style={styles.questionText}>{question.text}</Text>
      <Picker
      style={styles.picker}
      selectedValue={this.state[question.id]}
      onValueChange={(option) => this._addValueToState(question.id, option)}>
      {this._getValues(question.OptionsContainer.PossibleOptions).map((option, i) => (
        <Picker.Item key={i} label={option.value} value={option.id} />
      ))}
      </Picker>
      </View>
    );

    case 'boolean':
    return (
      <View key={i} style={styles.question}>
      <Text style={styles.questionText}>{question.text}</Text>
      <View style={styles.booleanButtonsContainer}>
      <Button style={styles.booleanButton} onPress={() => this._addValueToState(question.id, true)} title="Sí" color="#841584"
      accessibilityLabel="Envía la encuesta"
      />
      <Button style={styles.booleanButton} onPress={() => this._addValueToState(question.id, false)} title="No" color="#841584"
      accessibilityLabel="Envía la encuesta"
      />
      </View>
      </View>
    )
  }
}
_getValues(possibleOptions){
  var values = [];
  values.push({"id": "null", "value": "-- Has tu elección --"})
  possibleOptions.map((possibleOption) => {
    var newValue = {"id": possibleOption.id, "value": possibleOption.value};
    values.push(newValue);
  })
  return values;
}
}
