import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';
import Camera from 'react-native-camera';

export default class QRReader extends Component {
  constructor(props){
    super(props);
    this.state = {showCamera: false}
  }
  render() {
    if(this.state.showCamera) {
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
        onFocusChanged={() => {}}>
        </Camera>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
        <Text style={styles.instructionsText}> Cuando estés en algún local adherido a nuestro servicio, simplemente presiona el botón para escanear el código QR.
        Con esto podrás evaluar el servicio, lo que te permite participar por premios y descuentos </Text>
        <TouchableHighlight onPress={() => {this.setState({showCamera:true})}}>
        <Text style={styles.buttonText}> ESCANEAR </Text>
        </TouchableHighlight>
        </View>
      );
    }
  }
  _onFocusChanged() {
    console.log("lsdflsfh");
  }
}
