'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default class Splash extends Component {
  render() {
     return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
      </View>
    );
  }
}
