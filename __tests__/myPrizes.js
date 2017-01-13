import 'react-native';
import React from 'react';
import MyPrizes from '../app/routes/MyPrizes/myPrizes'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <MyPrizes />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
