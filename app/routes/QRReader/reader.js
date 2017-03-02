import React, { Component } from 'react';
import { Button } from 'react-native-elements'

import {
  Text,
  View,
  TouchableHighlight,
  Image
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
        <View style={styles.contentContainer}>
        <Image
          style={styles.QRImage}
          source={require('../../images/qr_code.png')}
        />
        <Text style={styles.instructionsText}> Busca el código QR en los locales adheridos, escanéalo y gana descuentos y productos gratis instantáneamente </Text>

        <Button
          raised
          iconLeft
          buttonStyle={{marginTop: 40, height: 60, width: 250}}
          icon={{name: 'qrcode', type: 'font-awesome'}}
          title='ESCANEAR CÓDIGO'
          onPress={() => {this.setState({showCamera:true})}}
          />
        </View>
      );
    }
  }
  _onFocusChanged() {
    console.log("lsdflsfh");
  }
}
