import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  message: {
    fontSize: 24,
    textAlign: 'center'
  }
})
