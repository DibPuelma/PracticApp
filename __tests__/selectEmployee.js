import 'react-native';
import React from 'react';
import SelectEmployee from '../app/routes/SelectEmployee/selectEmployee'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

storeData = {
  data:"encuesta1",
  type:"QR"
}
it('renders correctly', () => {
  const tree = renderer.create(
    <SelectEmployee codeData={storeData}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
