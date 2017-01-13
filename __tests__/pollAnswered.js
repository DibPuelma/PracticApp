import 'react-native';
import React from 'react';
import PollAnswered from '../app/routes/PollAnswered/pollAnswered'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PollAnswered />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
