import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  NetInfo
} from 'react-native';

import storeData from './storeData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings';

import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import NotConnected from '../../components/NotConnected/NotConnected';

var StoresStatus = {
  WAITING     : 'waiting',
  READY       : 'ready',
  NOTCONNECTED: 'notConnected'
};

export default class Stores extends Component {

  constructor(props) {
    super(props);
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    this.state = {
      status: StoresStatus.WAITING,
      storeData: [],
      uri: settings.COMPANIES_REQUEST
    };
  }

  componentDidMount() {
    this._checkNetwork();
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
      return(
        <LoadingSpinner/>
      );
    }
    else if(this.state.status === StoresStatus.NOTCONNECTED) {
      return (
        <NotConnected tryAgain={this._checkNetwork} />
      );
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

  _checkNetwork = () => {
    this.setState({status: StoresStatus.WAITING});
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
        this._load();
      }
      else {
        this.setState({status: StoresStatus.NOTCONNECTED})
      }
    });
  }

  _load = () => {
    var promise = fetch(this.state.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    var stores = this;

    promise.then(function(result) {
      stores.setState({
        status: StoresStatus.READY,
        storeData: result
      });
    }, function(err) { // error
      console.log(err);
    });
  }
}
