import React, { Component } from 'react';
import { Icon } from 'react-native-elements'

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
import settings from '../../config/settings';

export default class EvaluationDetails extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._backToPrevious = this._backToPrevious.bind(this);
    var uri = settings.EVALUATIONS_DETAILS_REQUEST.replace(":user_id", props.user.id).replace(":answered_poll_id", props.sellPointData.id);
    this.state = {
      ready: false,
      uri: uri
    };
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
              <View style={styles.iconAndTextContainer}>
              <Icon
              reverse
              name='star'
              type='material-icon'
              color='#517fa4'
              />
              <Text style={styles.question}> {answer.Question.text} </Text>
              </View>
              <MyStarRating isDisabled={true} style={styles.starAnswer} initialRate={answer.number_value}/>
              </View>
            )
          }
          else if(answer.string_value !== null){
            return (
              <View key={i} style={styles.questionContainer}>
              <View style={styles.iconAndTextContainer}>
              <Icon
              reverse
              name='comment'
              type='material-icon'
              color='#517fa4'
              />
              <Text style={styles.question}> {answer.Question.text} </Text>
              </View>
              <Text style={[styles.answer, styles.textAnswer]}> "{answer.string_value}"</Text>
              </View>
            )
          }
          else if(answer.boolean_value !== null){
            return (
              <View key={i} style={styles.questionContainer}>
              <View style={styles.iconAndTextContainer}>
              <Icon
              reverse
              name='hdr-strong'
              type='material-icon'
              color='#517fa4'
              />
              <Text style={styles.question}> {answer.Question.text} </Text>
              </View>
              <Text style={[styles.answer, styles.bigTextAnswer]}> "{answer.boolean_value ? "Sí" : "No"}"</Text>
              </View>
            )
          }
          else{
            return(
              <View key={i} style={styles.questionContainer}>
              <View style={styles.iconAndTextContainer}>
              <Icon
              reverse
              name='group-work'
              type='material-icon'
              color='#517fa4'
              />
              <Text style={styles.question}> {answer.Question.text} </Text>
              </View>
              <Text style={[styles.answer, styles.bigTextAnswer]}> "{answer.PossibleOption.value}" </Text>
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
