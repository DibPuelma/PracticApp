import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Picker
} from 'react-native';
export default class Poll extends Component {

  state = {
    a1: '3',
    a2: '3',
    a3: '3',
    mode: Picker.MODE_DIALOG,
  };

  render(){
    poll = this.props.data.data.data;
    switch(poll){
      case 'encuesta1':
      return(
        <View style={styles.container}>
        <Text style={styles.question}>¿El vendedor conocía los productos?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a1}
        onValueChange={(value) => this.setState({a1: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>

        <Text style={styles.question}>¿El vendedor lo trató respetuosamente?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a2}
        onValueChange={(value) => this.setState({a2: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>

        <Text style={styles.question}>¿El vendedor estuvo pendiente de usted?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a3}
        onValueChange={(value) => this.setState({a3: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>
        </View>
      );
      case 'encuesta2':
      return(
        <View style={styles.container}>
        <Text style={styles.question}>¿La tienda estaba ordenada?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a1}
        onValueChange={(value) => this.setState({a1: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>

        <Text style={styles.question}>¿Le gustan los productos de la tienda?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a2}
        onValueChange={(value) => this.setState({a2: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>

        <Text style={styles.question}>¿Qué nota le pondría a la tienda en general?</Text>
        <Picker style={styles.answer}
        selectedValue={this.state.a3}
        onValueChange={(value) => this.setState({a3: value})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>
        </View>
      );
      default:
      return(
        <Text style={styles.question}> Código no es válido </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  question: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    width: Dimensions.get('window').width
  },
  answer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    width: Dimensions.get('window').width
  }
});
