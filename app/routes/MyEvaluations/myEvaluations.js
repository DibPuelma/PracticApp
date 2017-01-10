import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import evaluationsData from './evaluationsData.json';
export default class MyEvaluations extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["row 1", "row 2"])
    };
  }
  componentDidMount(){
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(evaluationsData.evaluations)});
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => (
        <View>
        <Image source={{uri:rowData.logo}} style={styles.image} />
        <Text numberOfLines={3} style={styles.comment}>{rowData.comment}</Text>
        <Text style={styles.average}>{rowData.average}</Text>
        </View>
      )
    }
    />
    </View>
  );
}
}
