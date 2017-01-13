import {
  StyleSheet,
  Dimensions
} from 'react-native';
module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    marginLeft: 0,
    marginTop: 72,
    marginRight: 0,
    marginBottom: 10

  },
  card: {
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#E6E6E6',
    backgroundColor: '#E6E6E6',
    elevation: 3
  },
  question: {
    alignItems: 'center',
    marginTop: 20
  },
  questionText: {
    textAlign: 'center',
    fontSize: 20
  },
  answer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    width: Dimensions.get('window').width
  },
  textInput: {
    width: 300,
    height: 100,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5
  }
});
