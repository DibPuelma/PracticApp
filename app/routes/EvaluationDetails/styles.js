import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  background: {
    flex: 1,
    marginLeft: 10,
    marginTop: 72,
    marginRight: 10,
    marginBottom: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C6C6C6',
    borderWidth: 1
  },
  container: {
    alignItems: 'center'
  },
  iconAndTextContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 80,
    margin: 5
  },
  storeName: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    borderBottomColor: '#c6c6c6',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  questionContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingBottom: 20,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flex:4
  },
  answer: {
    marginTop: 10
  },
  textAnswer: {
    textAlign: 'center',
    fontSize: 18
  },
  bigTextAnswer: {
    textAlign: 'center',
    fontSize: 24
  }
})
