import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import storeData from './storeData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings';

var StoresStatus = {
  WAITING: 'waiting',
  READY  : 'ready'
};

export default class Stores extends Component {

  constructor(props) {
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this.state = { 
      status: StoresStatus.WAITING,
      storeData: []
    };
  }

  componentDidMount() {
    this._companiesRequest();
  }

  componentWillMount() {
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.replace({id:'QRReader'});
    return true; // This is important to prevent multiple calls
  }

  render() {
    if (this.state.status === StoresStatus.WAITING) {
      return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
      </View>
      )
    }
    return(
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
        { this.state.storeData.length > 0 &&
          this.state.storeData.map((store, i) => (
            <View key={i} style={styles.logo}>
              <Image source={{ uri: store.logo }} style={styles.logo} />
            </View>
          ))
        }
        </View>
      </ScrollView>
    );
  }

  _companiesRequest() {
    var url = settings.COMPANIES_REQUEST;
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
    })
    .then((response) => response.json());
    
    var stores = this;

    promise.then(function(result) {
      stores.setState({ status: StoresStatus.READY , storeData: result });
    }, function(err) { // error
      console.log(err);    
    });
  }
}
