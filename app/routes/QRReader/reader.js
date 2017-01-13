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
      </Camera>
      </View>
    );
  }
  _onFocusChanged() {

  }
}
