import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  background: {
    height: 600,
    margin: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderColor: '#C6C6C6',
    borderWidth: 1
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
  },
  logo: {
    width: 80,
    height: 80,
    margin: 10
  },
  storeName: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  questionContainer: {
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  answer: {
    marginTop: 10
  },
  textAnswer: {
    textAlign: 'center',
    fontSize: 16
  }
})
