import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements'

import {
  AppRegistry,
  View,
  Text,
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
import settings from '../../config/settings';

export default class Poll extends Component {
  constructor(props){
    super(props);
    var pollToGet = props.pollData.wasAttended ? "attended_poll" : "unattended_poll";
    var uri = settings.SELLPOINT_POLL_REQUEST.replace(":company_id", props.pollData.companyId).replace(":sell_point_id", props.pollData.sellPointId).replace(":poll_type", pollToGet);
    this.state = {
      ready: false,
      uri: uri,
      error: ''
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
      <View style={styles.iconAndTextContainer}>
      <Icon
      reverse
      name='assignment'
      type='material-icon'
      color='#517fa4'
      />
      </View>
      <Text style={styles.title}>
      {this.props.pollData.employeeName !== null ? 'Encuesta para ' + this.props.pollData.employeeName : 'Local ' + this.props.pollData.storeName }
      </Text>
      <View style={styles.card}>
      {this.state.pollData.Questions.map((question, i) => {
        return this._getQuestion(question, i);
      })}

      <View style={styles.sendButton}>
      <Text style={{color: 'red', margin: 5, textAlign: 'center'}}> {this.state.error} </Text>
      <Button
        raised
        iconRight
        buttonStyle={{marginTop: 10, width: 250}}
        backgroundColor='#517fa4'
        icon={{name: 'send', type: 'material-icon'}}
        title='ENVIAR ENCUESTA'
        onPress={() => this._sendPollAlert()}
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
  for (var i = 0; i < this.state.pollData.Questions.length; i++) {
    if(this.state[this.state.pollData.Questions[i].id] === null || this.state[this.state.pollData.Questions[i].id] === ''){
      this.setState({error: 'Hubo un error, verifica que contestaste todas las preguntas'})
      return;
    }
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
      <View style={styles.iconAndTextContainer}>
      <Icon
      reverse
      name='comment'
      type='material-icon'
      color='#517fa4'
      />
      <Text style={styles.questionText}>{question.text} (opcional)</Text>
      </View>
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
      <View style={styles.iconAndTextContainer}>
      <Icon
      reverse
      name='star'
      type='material-icon'
      color='#517fa4'
      />
      <Text style={styles.questionText}>{question.text}</Text>
      </View>
      <MyStarRating style={styles.stars} isDisabled={false} onChange={(value) => this._addValueToState(question.id, value)}/>
      </View>
    );

    case 'options':
    return (
      <View key={i} style={styles.question}>
      <View style={styles.iconAndTextContainer}>
      <Icon
      reverse
      name='group-work'
      type='material-icon'
      color='#517fa4'
      />
      <Text style={styles.questionText}>{question.text}</Text>
      </View>
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
      <View style={styles.iconAndTextContainer}>
      <Icon
      reverse
      name='hdr-strong'
      type='material-icon'
      color='#517fa4'
      />
      <Text style={styles.questionText}>{question.text}</Text>
      </View>
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
