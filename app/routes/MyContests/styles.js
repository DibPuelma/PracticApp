import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  scrollview: {
  },
  container: {
    flex: 1,
    marginTop: 72,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'center',
    marginTop: 72,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  listElement: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#EEE'
  },
  image: {
    flex: 1,
    height: 80
  },
  info: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  companyName: {
    fontSize: 22,
  },
  contestDate: {
    fontSize: 16
  }
});
