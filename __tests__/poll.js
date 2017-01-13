import 'react-native';
import React from 'react';
import Poll from '../app/routes/Poll/poll'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

pollDataTrue = {
  "wasAtended" : true
}
pollDataFalse = {
  "wasAtended": false
}

it('renders correctly with attention true', () => {
  const tree = renderer.create(
    <Poll pollData={pollDataTrue}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with attention false', () => {
  const tree = renderer.create(
    <Poll pollData={pollDataFalse}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
