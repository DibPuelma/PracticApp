import 'react-native';
import React from 'react';
import backButtonHandler from '../app/lib/backButtonHandler'

_singletonBackButtonHandler = backButtonHandler.getInstance();

it('is a singleton', () => {
  _singletonBackButtonHandler2 = backButtonHandler.getInstance();
  expect(_singletonBackButtonHandler2).toBe(_singletonBackButtonHandler);
})
it('adds functions', () => {
  _singletonBackButtonHandler.addFunction(dummyFunction);
  _singletonBackButtonHandler.addFunction(dummyFunction);
  expect(_singletonBackButtonHandler.addedFunctions.length).toBe(2);
});

it('delete functions', () => {
  _singletonBackButtonHandler.removeFunction(dummyFunction);
  expect(_singletonBackButtonHandler.addedFunctions.length).toBe(1);
});

it('delete all functions', () => {
  _singletonBackButtonHandler.addFunction(dummyFunction);
  _singletonBackButtonHandler.addFunction(dummyFunction);
  _singletonBackButtonHandler.addFunction(dummyFunction);
  _singletonBackButtonHandler.removeAllListeners();
  expect(_singletonBackButtonHandler.addedFunctions.length).toBe(0);
});

dummyFunction = function (){
  return true;
}
