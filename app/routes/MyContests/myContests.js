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

import CenteredMessage from '../../components/CenteredMessage/centeredMessage';

var MyContestsStatus = {
  WAITING: 'waiting',
  EMPTY  : 'empty',
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
      if(this.state.status === MyContestsStatus.EMPTY) {
        return(
          <CenteredMessage message="Aún no estás participando en ningún sorteo. Realiza evaluaciones en locales adheridos para participar." />
        );
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

promise.then(function(result) {
  if(Object.keys(result).length === 0){
    myContests.setState({ status: MyContestsStatus.EMPTY });

  } else {
    myContests.setState({ status: MyContestsStatus.READY });
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    myContests.setState({ dataSource: ds.cloneWithRows(result) });
  }
}, function(err) { // error
  console.log(err);
});
}
}
