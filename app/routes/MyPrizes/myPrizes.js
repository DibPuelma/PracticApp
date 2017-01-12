import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import prizesData from './prizesData';
import styles from './styles';
import backButtonHandler from '../../lib/backButtonHandler';

export default class MyPrizes extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"])
    };
    this._backToPrevious = this._backToPrevious.bind(this);
    this.singletonBackButtonHandler = backButtonHandler.getInstance();
  }

  componentDidMount(){
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(prizesData.prizes)});
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
    return (
      <View style={styles.container}>
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
      )
    }
    />
    </View>
  );
  }
  _goToDetails(rowData){
    this.props.navigator.push({id:'prizeDetails', prizeData: rowData})
  }
}
