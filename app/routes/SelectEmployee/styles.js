import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingTop: 30
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#E6E6E6',
    backgroundColor: '#E6E6E6',
    elevation: 3,
    paddingTop: 20,
    paddingBottom: 20
  },
  imageChoice: {
    width: 120,
    height: 120,
    margin: 5,
  },
  textContainer: {
    width: 120,
    height: 120,
    margin: 5,
    borderColor: '#C6C6C6',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C6C6C6'
  },
  textChoice: {
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  }
});
