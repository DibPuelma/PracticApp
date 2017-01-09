import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';

import styles from './styles';

import attendedJson from './jsonattended.json'

import MyStarRating from '../../components/MyStarRating/myStarRating';

export default class Poll extends Component {
  constructor(props){
    super(props);
    this.state = {text: '', totalQuestions: attendedJson["questions"].length}
    for(i = 0; i < this.state.totalQuestions; i++){
      console.log("dentro de addquestion " + i.toString() + ":" + 3);
      this.state[i.toString()] = 3;
    }
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
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        </View>

        <Button onPress={() => this._sendPoll()} title="Enviar encuesta" color="#841584"
        accessibilityLabel="Envía la encuesta"
        />

        </View>
        </View>
      );
    }
  }
  _handleStarChange(question, value){
    newState = {};
    console.log("question es: " + question + " value es: " + value);
    newState[question] = value;
    this.setState(newState);
    console.log(this.state);
  }
  _sendPoll(){
    pollAnswers = {comment: this.state.text, stars: []}
    for(i = 0; i < this.state.totalQuestions; i++){
      pollAnswers["stars"][i] = this.state[i.toString()];
    }
    console.log(this.state);
    console.log(pollAnswers);
    pollData = this.props.pollData;
    this.props.navigator.push({id:'pollAnswered', pollData:pollData, pollAnswers:pollAnswers});
  }
}
