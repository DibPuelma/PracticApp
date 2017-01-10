import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

var _navigate;

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    _navigate = this.props.navigate;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Control Panel
        </Text>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'MainPage'})}>
          <Text style={styles.fullWidthButtonText}>Escanner</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'MyAccountPage'})}>
          <Text style={styles.fullWidthButtonText}>Mi Cuenta</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'MySweepstakesPage'})}>
          <Text style={styles.fullWidthButtonText}>Mis Sorteos</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'MyPrizesPage'})}>
          <Text style={styles.fullWidthButtonText}>Mis Premios</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'MyEvaluationsPage'})}>
          <Text style={styles.fullWidthButtonText}>Mis Evaluaciones</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'ShopsPage'})}>
          <Text style={styles.fullWidthButtonText}>Tiendas</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} underlayColor="#FFF" 
          onPress={() => this.props.navigate({id: 'RankingPage'})}>
          <Text style={styles.fullWidthButtonText}>Ranking</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

var styles = {
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  fullWidthButton: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 2
  },
  fullWidthButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10
  }
}

module.exports = ControlPanel;


/*        <Button
          onPress={() => {
            this.props.closeDrawer();
          }}
          text="Close Drawer"
        />
        */

