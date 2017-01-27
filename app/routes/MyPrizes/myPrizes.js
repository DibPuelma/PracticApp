import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

import prizesData from './prizesData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings';

var MyPrizesStatus = {
  WAITING: 'waiting',
  READY  : 'ready'
};

export default class MyPrizes extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      status: MyPrizesStatus.WAITING,
      dataSource: ds.cloneWithRows([])
    };

    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount(){
    this._userPrizesRequest();
  }

  componentWillMount(){
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
    if (this.state.status === MyPrizesStatus.WAITING) {
      return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
      </View>
      )
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
              <TouchableHighlight onPress={() => this._goToDetails(rowData)} >
                <View style={styles.listElement}>
                  <View style={{ flex: 1 }}>
                    <Image source={{uri: rowData.Contest.Company.logo}} style={styles.image} />
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={3} style={styles.companyName} textAlign='left'>
                      {rowData.Contest.Company.name}
                    </Text>
                    <Text numberOfLines={3} style={styles.prize} textAlign='left'>
                      {rowData.name}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          enableEmptySections={true}
        />
      </View>
    );
  }

  _userPrizesRequest() {
    var user_id = this.props.user.id;
    var url = settings.USER_PRIZES_REQUEST.replace(":id", user_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
    })
    .then((response) => response.json());
    
    var myPrizes = this;

    promise.then(function(result) {
      console.log(result);      
      myPrizes.setState({ status: myPrizes.READY });

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
      myPrizes.setState({ dataSource: ds.cloneWithRows(result) });
    }, function(err) { // error
      console.log(err);    
    });
  }

  _goToDetails(rowData){
    this.props.navigator.push({id:'PrizeDetails', prizeData: rowData})
  }
}
