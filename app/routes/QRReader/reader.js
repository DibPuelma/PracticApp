import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';
import Camera from 'react-native-camera';

export default class QRReader extends Component {

  render() {

    return (
      <View style={styles.container}>
      <Camera
      ref={(cam) => {
        this.camera = cam;
      }}
      style={styles.preview}
      aspect={Camera.constants.Aspect.fill}
      onBarCodeRead={this.props.onCodeRead}
      defaultOnFocusComponent={true}
      onFocusChanged={this._onFocusChanged.bind(this)}>
      <TouchableHighlight onPress={this.props.onButtonPressedEval} >
      <Text style={styles.capture} >[EVALUACIONES]</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.props.onButtonPressedPrizes} >
      <Text style={styles.capture} >[PREMIOS]</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.props.onButtonPressedStores} >
      <Text style={styles.capture} >[TIENDAS]</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.props.onButtonPressedAccount} >
      <Text style={styles.capture} >[CUENTA]</Text>
      </TouchableHighlight>
      </Camera>
      </View>
    );
  }
  _onFocusChanged() {

  }
}
