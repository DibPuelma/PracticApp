import 'react-native';
import React from 'react';
import Register from '../app/routes/Register/Register'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Register />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
