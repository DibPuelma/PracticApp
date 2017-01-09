import React, { Component } from 'react';
import {
  Text,
  View
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
        onBarCodeRead={this.props.onCodeRead}>
          <Text style={styles.capture} >[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}
