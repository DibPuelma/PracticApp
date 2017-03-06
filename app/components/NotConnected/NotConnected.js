import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native';
import { Button, Icon } from 'react-native-elements'

import styles from './styles'

export default class NotConnected extends Component{
  render() {
    return (
      <View style={styles.container}>
      <Icon
      size={100}
      name='signal-wifi-off'
      type='material-icon'
      color='#868686'
      />
      <Text> Ups! No hay conexión </Text>
      <Button
        raised
        iconLeft
        buttonStyle={{marginTop: 40, height: 60, width: 250}}
        icon={{name: 'refresh', type: 'font-awesome'}}
        title='VOLVER A INTENTAR'
        onPress={this.props.tryAgain}
        />
      </View>
    );
  }
}
