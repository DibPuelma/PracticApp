import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 6,
    marginTop: 68,
    marginRight: 4,
    marginBottom: 4
  },
  preview: {
    flex: 1
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  instructionsText: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 80,
    paddingBottom: 80,
    borderColor: '#FFFFFF',
    borderBottomColor: '#E6E6E6',
    borderWidth: 2
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 80,
    borderColor: '#A6A6A6',
    borderWidth: 1,
    fontSize: 30,
    backgroundColor: '#3FA9F5'
  }

});
