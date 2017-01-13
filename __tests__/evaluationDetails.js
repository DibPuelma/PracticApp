import 'react-native';
import React from 'react';
import EvaluationDetails from '../app/routes/EvaluationDetails/evaluationDetails'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

evaluationData = {
  "questions": [
    {"question":"¿La tienda está ordenada?", "stars": 2},
    {"question":"¿Le gustan los productos de la tienda?", "stars":3},
    {"question":"¿Qué nota le pondría a la tienda en general?", "stars":2}
  ]

}
it('renders correctly', () => {
  const tree = renderer.create(
    <EvaluationDetails evaluationData={evaluationData}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
