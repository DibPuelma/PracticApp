import {
  StyleSheet,
  Dimensions
} from 'react-native'

module.exports = StyleSheet.create({
  container:{
    marginTop: 20
  },
  listElement: {
    flex: 2,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    padding: 2,
    borderBottomWidth: 1,
    borderColor: '#969696'
  },
  image: {
    flex: 1,
    height: 80,
  },
  prize: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6'
  },
  prizeText: {
    fontSize: 25
  }
})
