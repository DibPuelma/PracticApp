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
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    elevation: 3
  },
  iconAndTextContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingBottom: 20,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  questionText: {
    textAlign: 'center',
    fontSize: 20,
    flex: 4
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
