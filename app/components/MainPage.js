'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

class MainPage extends Component {
  render() {
     return (
      <View style={styles.container}>
        <Text>Main Page</Text>
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

module.exports = MainPage;
