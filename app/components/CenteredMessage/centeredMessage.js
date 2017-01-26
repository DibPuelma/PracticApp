import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';

import styles from './styles';

export default class CenteredMessage extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}> {this.props.message} </Text>
      </View>
    );
  }
}
