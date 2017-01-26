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
    marginTop: 10,
    marginBottom: 15
  },
  questionText: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
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
    marginBottom: 10,
    borderRadius: 5,
    elevation: 4
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  sendButton: {
    alignItems: 'center',
    marginBottom: 20
  },
  stars: {
    paddingBottom: 20
  },
  picker: {
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C6C6C6',
    paddingLeft: 100,
    elevation: 4
  },
  booleanButtonsContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  booleanButton: {
    flex: 2
  }

});
