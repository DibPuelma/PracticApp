import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';

import QRReader from './routes/QRReader/reader';
import Poll from './routes/Poll/poll';
import SelectEmployee from './routes/SelectEmployee/selectEmployee';
import PollAnswered from './routes/PollAnswered/pollAnswered';
import MyEvaluations from './routes/MyEvaluations/myEvaluations';
import EvaluationDetails from './routes/EvaluationDetails/evaluationDetails';

export default class Practicapp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Navigator
      initialRoute={{id:'scanner'}}
      renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator){
    switch(route.id){
      case 'scanner':
      return (
        <QRReader navigator={navigator}
        onCodeRead={(data) => {
          navigator.replace({id: 'selectEmployee', data: {data}});
        }}
        onButtonPressed= {() => {
          navigator.replace({id: 'myEvaluations'});
        }}
        />
      );
      case 'poll':
      return (
        <Poll pollData={route.pollData} navigator={navigator}/>
      );
      case 'selectEmployee':
      return(
        <SelectEmployee data={route.data} navigator={navigator} />
      );
      case 'pollAnswered':
      return(
        <PollAnswered pollData={route.pollData} navigator={navigator} pollAnswers={route.pollAnswers} />
      );
      case 'myEvaluations':
      return(
        <MyEvaluations navigator={navigator}/>
      );
      case 'evaluationDetails':
      return(
        <EvaluationDetails navigator={navigator} evaluationData={route.evaluationData} />
      );
    }
  }
}
