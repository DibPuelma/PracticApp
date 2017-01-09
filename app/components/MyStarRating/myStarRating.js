import React, { Component } from 'react'
import StarRating from 'react-native-star-rating';

export default class MyStarRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3
    };
  }

  render(){
    return(
      <StarRating
      disabled={false}
      maxStars={5}
      rating={this.state.starCount}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      emptyStar={'ios-star-outline'}
      selectedStar={(rating) => this._onStarRatingPress(rating)}
      starColor={'gold'}
      iconSet={'Ionicons'}
      />
    );
  }

  _onStarRatingPress(rating){
    this.setState({starCount: rating});
    this.props.onChange(rating);
  }
}
