'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';

class RankingPage extends Component {
  render() {
     return (
      <View style={styles.container}>
        <Text>Ranking Page</Text>
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

module.exports = RankingPage;
