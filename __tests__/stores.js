import 'react-native';
import React from 'react';
import Stores from '../app/routes/Stores/stores'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Stores />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
