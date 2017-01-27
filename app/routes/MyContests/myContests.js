import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import sampleData from './sampleData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';
import dateFormatter from '../../lib/dateFormatter';
import settings from '../../config/settings'

var MyContestsStatus = {
  WAITING: 'waiting',
  READY  : 'ready'
};

export default class MyContests extends Component{
  constructor(props) {
    super(props);

    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { status: MyContestsStatus.WAITING,
      dataSource: ds.cloneWithRows([]) };
    }

    componentDidMount() {
      this._userContestsRequest();
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

      if (this.state.status === MyContestsStatus.WAITING ) {
        return (
          <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} style={[styles.centering, {height: 50}]} size="large" color="#3FA9F5"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={styles.listElement}>
          <View style={{ flex: 1 }}>
          <Image source={{uri:rowData.Company.logo}} style={styles.image} />
          </View>
          <View style={styles.info}>
          <Text numberOfLines={1} style={styles.companyName} textAlign='left'>
          {rowData.Company.name}
          </Text>
          <Text numberOfLines={1} style={styles.contestDate} textAlign='left'>
          Sorteo: {dateFormatter.getDateSpanish(rowData.draw_date)}
          </Text>
          <Text numberOfLines={1} style={styles.contestDate} textAlign='left'>
          Ganador: {rowData.winner !== null ? rowData.winner : "-----"}
          </Text>
          </View>
          </View>
        )}
        enableEmptySections={true}
        />
        </View>
        </ScrollView>
      );
    }

    _goToDetails(rowData){
      this.props.navigator.push({id:'PrizeDetails', prizeData: rowData})
    }

    _userContestsRequest() {
      /*
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"])
    };
    //this.setState({ dataSource: this.state.dataSource.cloneWithRows(prizesData.prizes)});
    */

    var user_id = this.props.user.id;
    var url = settings.USER_CONTESTS_REQUEST.replace(":id", user_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    var myContests = this;

    /*promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
    resolve("Stuff worked!");
  }, 100);
});*/

promise.then(function(result) {
  //result = sampleData;

  console.log(result);
  myContests.setState({ status: myContests.READY });
  console.log("################## RESULT");
  console.log(result);
  console.log("################## RESULT");
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  myContests.setState({ dataSource: ds.cloneWithRows(result) });
}, function(err) { // error
  console.log(err);
});
}
}
