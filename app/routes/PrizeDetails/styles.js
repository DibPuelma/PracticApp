import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  background: {
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    height: 400,
    marginLeft: 20,
    marginRight: 20,
    elevation: 3,
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderColor: '#C6C6C6',
    borderWidth: 1
  },
  logo: {
    width: 80,
    height: 80,
    margin: 5
  },
  storeName: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  mediumText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15
  },
  normalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20
  },
  code: {
    fontSize: 50,
    textAlign: 'center'
  }
})
