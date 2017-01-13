import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'center',
  },
  loginColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent:'center',
    maxWidth:250
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#E6F4F6',
    marginBottom: 20
  },
  title: {
    color: '#888888',
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold'
  },
    loginButtons: {
    flexDirection: 'row',
    marginBottom: 10
  },
  fullWidthButton: {
    flex: 1,
    backgroundColor: '#3FA9F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  fullWidthButtonText: {
    fontSize: 15,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }
});
