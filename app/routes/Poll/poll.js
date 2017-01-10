import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Button,
  TextInput,
  BackAndroid
} from 'react-native';

import styles from './styles';
import attendedJson from './jsonattended.json';
import backButtonHandler from '../../lib/backButtonHandler';

import MyStarRating from '../../components/MyStarRating/myStarRating';

export default class Poll extends Component {
  constructor(props){
    super(props);
    this.state = {text: '', totalQuestions: attendedJson["questions"].length};
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    for(i = 0; i < this.state.totalQuestions; i++){
      this.state[i.toString()] = 0;
    }
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

  //TODO: Setear valor default de las estrellas programaticamente cuando llega el JSON
  render(){
    wasAtended = this.props.pollData.wasAtended;
    if(wasAtended){
      return(
        <View style={styles.container}>
        <View style={styles.card}>

        {attendedJson.questions.map((text, i) =>
        (<View key={i} style={styles.question}>
        <Text style={styles.questionText}>{text}</Text>
        <MyStarRating isDisabled={false} onChange={(value) => this._handleStarChange(i.toString(), value)}/>
        </View>)
        )}

        <View style={styles.question}>
        <Text style={styles.questionText}>Si quieres déjanos un comentario</Text>
        <TextInput
        style={styles.textInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />

        </View>
        <View style={styles.sendButton}>
        <Button onPress={() => this._sendPoll()} title="Enviar encuesta" color="#841584"
        accessibilityLabel="Envía la encuesta"
        />
        </View>

        </View>
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
        <View style={styles.card}>

        {attendedJson.questions.map((text, i) =>
        (<View key={i} style={styles.question}>
        <Text style={styles.questionText}>{text}</Text>
        <MyStarRating onChange={(value) => this._handleStarChange(i.toString(), value)}/>
        </View>)
        )}

        <View style={styles.question}>
        <Text style={styles.questionText}>Si quieres déjanos un comentario</Text>
        <TextInput
        style={styles.textInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />

        </View>
        <View style={styles.sendButton}>
        <Button onPress={() => this._sendPoll()} title="Enviar encuesta" color="#841584"
        accessibilityLabel="Envía la encuesta"
        />
        </View>

        </View>
        </View>
      );
    }
  }
  _handleStarChange(question, value){
    newState = {};
    newState[question] = value;
    this.setState(newState);
  }
  _sendPoll(){
    pollAnswers = {comment: this.state.text, stars: []}
    for(i = 0; i < this.state.totalQuestions; i++){
      pollAnswers["stars"][i] = this.state[i.toString()];
    }
    pollData = this.props.pollData;
    this.singletonBackButtonHandler.removeAllListeners();
    this.props.navigator.push({id:'pollAnswered', pollData:pollData, pollAnswers:pollAnswers});
  }
}
