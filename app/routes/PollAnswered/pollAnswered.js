import React, { Component } from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import styles from './styles';
export default class PollAnswered extends Component {

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}> ¡Gracias por contestar la encuesta! </Text>
        <Text style={styles.normalText}> Tu opinión servirá para que cada vez te atiendan mejor </Text>
        <Button onPress={() => this._accept()} title="Aceptar" color="#841584"
        accessibilityLabel="Acepta"
        />
      </View>
      </View>

      // <View>
      // <Text> Gracias por contestar la encuesta </Text>
      // <Text> Tienda: {this.props.pollData.store} </Text>
      // <Text> Vendedor: {this.props.pollData.employeeId} </Text>
      // {this.props.pollAnswers.stars.map((answer, i) => (<Text key={i}> Pregunta {i+1}: {this.props.pollAnswers.stars[i]} estrellas </Text>))}
      // <Text> Comentario: {this.props.pollAnswers.comment} </Text>
      // <Button onPress={() => this._accept()} title="Aceptar" color="#841584"
      // accessibilityLabel="Acepta"
      // />
      // </View>
    );
  }
  _accept(){
    this.props.navigator.replace({id:'scanner'});
  }
}
