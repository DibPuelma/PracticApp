import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({  
  container: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 72,
    marginBottom: 8,
    paddingBottom: 40,
    elevation: 3,
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderColor: '#C6C6C6',
    borderRadius: 10
  },
  logo: {
    width: 80,
    height: 80,
    margin: 5,
    marginTop: 40
  },
  storeName: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  mediumText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15
  },
  normalText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20
  },
  code: {
    fontSize: 50,
    textAlign: 'center'
  }
})
