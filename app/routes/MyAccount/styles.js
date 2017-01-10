import {
  StyleSheet,
  Dimensions
} from 'react-native';

module.exports = StyleSheet.create({
  background: {
    height: 600,
    margin: 10,
    elevation: 3,
    backgroundColor: '#E6E6E6',
    borderColor: '#C6C6C6',
    borderWidth: 1
  },
  container: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#E6E6E6',
  },
  userData: {
    marginTop: 20,
    alignItems: 'center'
  },
  name: {
    fontSize: 20
  },
  email: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  badgesContainer: {
    marginTop: 20,
    height: 400,
    flexWrap: 'wrap'
  },
  rowOfBadges: {
    flexDirection: 'row',
    flex: 3,
  },
  badge: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    backgroundColor: '#f84a4a',
    borderRadius: 8
  },
  normalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5
  }
});
