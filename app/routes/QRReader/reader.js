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
      <TouchableHighlight onPress={this.props.onButtonPressed} >
      <Text style={styles.capture} >[CAPTURE]</Text>
      </TouchableHighlight>
      </Camera>
      </View>
    );
  }
  _onFocusChanged() {

  }
}
