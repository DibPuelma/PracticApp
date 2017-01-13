import 'react-native';
import React from 'react';
import PrizeDetails from '../app/routes/PrizeDetails/prizeDetails'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

prizeData = {
  "prize":"$100.000",
  "store":"Americanino",
  "logo":"http://www.borde.cl/wp-content/uploads/2005/11/Americanino-2.png",
  "code":"187297"
}
it('renders correctly', () => {
  const tree = renderer.create(
    <PrizeDetails prizeData={prizeData}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
