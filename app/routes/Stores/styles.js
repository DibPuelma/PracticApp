import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
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
  scrollview: {
    flex: 1,
    marginLeft: 10,
    marginTop: 72,
    marginRight: 10,
    marginBottom: 10
  },
  container: {
    elevation: 3
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10
  }
});
