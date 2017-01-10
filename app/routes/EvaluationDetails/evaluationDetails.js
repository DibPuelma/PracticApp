import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  BackAndroid,
  ScrollView
} from 'react-native';

import MyStarRating from '../../components/MyStarRating/myStarRating';
import backButtonHandler from '../../lib/backButtonHandler';
import styles from './styles';

      export default class EvaluationDetails extends Component {
  constructor(props){
    super(props);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this._backToPrevious = this._backToPrevious.bind(this);
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
    console.log(this.props.evaluationData.questions);
    return(
      <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={{uri:this.props.evaluationData.logo}} />
      <Text style={styles.storeName}> {this.props.evaluationData.store}</Text>
      {this.props.evaluationData.questions.map((questionObject, i) => (
        <View key={i} style={styles.questionContainer}>
          <Text style={styles.question}> {questionObject.question} </Text>
          <MyStarRating style={styles.starAnswer} initialRate={questionObject.stars}/>
        </View>
      )
      )}
        <View style={styles.questionContainer}>
          <Text style={styles.question}> Tu comentario </Text>
          <Text style={[styles.answer, styles.textAnswer]}> {this.props.evaluationData.comment}</Text>
        </View>
      </ScrollView>
      </View>
    );
  }
}
