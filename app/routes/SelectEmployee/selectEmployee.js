import React, { Component } from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import styles from './styles';
import employeesData from './employeesData.json';

export default class SelectEmployee extends Component{
  render(){
    store = this.props.data.data.data;
    switch (store) {
      case 'encuesta1':
      return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}> ¿Quién lo atendió hoy? </Text>

        <View style={styles.card}>

        {employeesData.images.map((source, i) => (
          <TouchableHighlight style={styles.imageChoice} key={i} onPress={() => this._buttonPressed((i+1), true)}>
          <Image style={styles.imageChoice}
          source={{uri: source}}
          />
          </TouchableHighlight>
        ))}

        <TouchableHighlight style={styles.textContainer}
        onPress={() => this._buttonPressed(0, true)}>
        <Text style={styles.textChoice}> No lo recuerdo </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.textContainer}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={styles.textChoice}> No me atendieron </Text>
        </TouchableHighlight>

        </View>
        </ScrollView>
      );
      case 'encuesta2':
      return (
        <ScrollView>

        <TouchableHighlight onPress={() => this._buttonPressed(1, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(2, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(3, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this._buttonPressed(4, true)}>
        <Image style={{width: 150, height: 150}}
        source={require('../../images/user.png')}
        />
        </TouchableHighlight>

        <TouchableHighlight style={{width: 150, height: 150}}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={{fontSize:20}}> No lo recuerdo </Text>
        </TouchableHighlight>

        <TouchableHighlight style={{width: 150, height: 150}}
        onPress={() => this._buttonPressed(0, false)}>
        <Text style={{fontSize:20}}> No me atendieron </Text>
        </TouchableHighlight>

        </ScrollView>
      );
      default:
      return(
        <Text> Código no es válido </Text>
      );
    }
  }
  _buttonPressed(employeeId, wasAtended){
    pollData = {wasAtended:wasAtended, store:this.props.data.data.data, employeeId:employeeId}
    this.props.navigator.push({id:'poll', pollData:pollData});
  }
}
