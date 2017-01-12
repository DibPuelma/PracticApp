import {
  StyleSheet,
  Dimensions
} from 'react-native'

module.exports = StyleSheet.create({
  container:{
    marginLeft: 10,
    marginTop: 72,
    marginRight: 10,
    marginBottom: 10
  },
  listElement: {
    flex: 5,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#565656'
  },
  image: {
    flex: 1,
    width: 60,
    height: 60,
  },
  comment: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10
  },
  average: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center'
  }
})
