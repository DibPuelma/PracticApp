'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

class SplashPage extends Component {
  render() {
     return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'center',
  }
});

module.exports = SplashPage;
