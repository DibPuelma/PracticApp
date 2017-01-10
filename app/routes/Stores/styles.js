import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  background: {
    height: 600,
    margin: 10,
    elevation: 3,
    backgroundColor: '#E6E6E6',
    borderColor: '#C6C6C6',
    borderWidth: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#E6E6E6',
  },
  logo: {
    width: 120,
    height: 120,
    margin: 10
  }
});
