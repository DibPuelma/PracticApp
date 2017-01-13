import 'react-native';
import React from 'react';
import MyEvaluations from '../app/routes/MyEvaluations/myEvaluations'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <MyEvaluations />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
