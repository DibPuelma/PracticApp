import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import MyStarRating from '../../components/MyStarRating/myStarRating';
import backButtonHandler from '../../lib/backButtonHandler';
import styles from './styles';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';

export default class EvaluationDetails extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._backToPrevious = this._backToPrevious.bind(this);

    this.state = {ready: false, uri: 'https://practicapi.herokuapp.com/user/' + props.user.id + '/answered_poll/' + props.sellPointData.id};
  }

  componentDidMount(){
    console.log("uri: " + this.state.uri);
    fetch(this.state.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({answeredPoll: responseJson});
      this.setState({ready: true});
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
    if(!this.state.ready) {
      return (
        <LoadingSpinner/>
      );
    }
    else {
      return(
        <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={{uri:this.props.sellPointData.logo}} />
        <Text style={styles.storeName}> {this.props.sellPointData.name} </Text>
        {this.state.answeredPoll.Answers.map((answer, i) => {
          if(answer.number_value !== null){
            return (
              <View key={i} style={styles.questionContainer}>
              <Text style={styles.question}> {answer.Question.text} </Text>
              <MyStarRating isDisabled={true} style={styles.starAnswer} initialRate={answer.number_value}/>
              </View>
            )
          }
          else if(answer.string_value !== null){
            return (
              <View key={i} style={styles.questionContainer}>
              <Text style={styles.question}> {answer.Question.text} </Text>
              <Text style={[styles.answer, styles.textAnswer]}> {answer.string_value}</Text>
              </View>
            )
          }
          //TODO: add boolean_value to DATABASE
          // else if(answer.boolean_value !== null){
          //   return (
          //     <View key={i} style={styles.questionContainer}>
          //     <Text style={styles.question}> {answer.Question.text} </Text>
          //     <Text style={[styles.answer, styles.bigTextAnswer]}> {answer.boolean_value ? "Sí" : "No"}</Text>
          //     </View>
          //   )
          // }
          else{
            return(
              <View key={i} style={styles.questionContainer}>
              <Text style={styles.question}> {answer.Question.text} </Text>
              <Text style={[styles.answer, styles.bigTextAnswer]}> {answer.PossibleOption.value} </Text>
              </View>
            )
          }
        }
      )}

      </ScrollView>
      </View>
    );
  }
}
}
