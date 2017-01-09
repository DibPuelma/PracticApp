import {
  StyleSheet,
  Dimensions
} from 'react-native'
module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#E6E6E6',
    backgroundColor: '#E6E6E6',
    elevation: 3
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30
  },
  normalText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30
  }
});
