import 'react-native';
import React from 'react';
import Splash from '../app/routes/Splash/Splash'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Splash />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
