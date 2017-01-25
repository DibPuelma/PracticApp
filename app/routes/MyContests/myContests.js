import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import settings from '../../config/settings'

var MyContestsStatus = {
  WAITING: 'waiting',
  READY  : 'ready'
};

export default class MyContests extends Component{
  constructor(props) {
    super(props);

    this.state = { status: MyContestsStatus.WAITING };
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount() {
    this._userContestsRequest();
  }

  componentWillMount() {
    this.singletonBackButtonHandler.addBackEvent(this._backToPrevious);
    this._userContestsRequest();
  }

  componentWillUnmount() {
    this.singletonBackButtonHandler.removeBackEvent(this._backToPrevious);
  }

  _backToPrevious() {
    this.props.navigator.replace({id:'QRReader'});
    return true; // This is important to prevent multiple calls
  }

  /*
  <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
              <TouchableHighlight onPress={() => this._goToDetails(rowData)} >
                <View style={styles.listElement}>
                  <Image source={{uri:rowData.logo}} style={styles.image} />
                  <View style={styles.prize}>
                    <Text numberOfLines={3} style={styles.prizeText}>{rowData.prize}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
        />
  */

  render() {
    return (
      <View style={styles.container}>
        { this.state.status === MyContestsStatus.WAITING &&
          <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
        }        
      </View>
    );
  }

  _goToDetails(rowData){
    this.props.navigator.push({id:'PrizeDetails', prizeData: rowData})
  }

  _userContestsRequest() {
    // TODO: change promise to API request to settings.USER_CONTESTS_REQUEST
   
    /*
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"])
    };
    //this.setState({ dataSource: this.state.dataSource.cloneWithRows(prizesData.prizes)});
    */

    var myContests = this;

    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("Stuff worked!");
      }, 5000);
    });

    promise.then(function(result) { 
      console.log(result);      
      myContests.setState({status: myContests.READY});

    }, function(err) { // error
      console.log(err);    
    });
  }
}
