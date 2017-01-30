import {
  BackAndroid,
  Alert
} from 'react-native';

module.exports = {
  instance: {},
  init: function(){
    return {
      addedFunctions: [],
      addFunction: function(func){
        this.addedFunctions.push(func);
      },
      removeFunction: function(func){
        this.addedFunctions.pop()
      },
      addBackEvent: function(func){
        BackAndroid.addEventListener('hardwareBackPress', func);
        this.addFunction(func);
      },
      removeBackEvent: function(func){
        BackAndroid.removeEventListener('hardwareBackPress', func);
        this.removeFunction(func);
      },
      removeAllListeners: function(){
        while (this.addedFunctions.length > 0) {
          torem = this.addedFunctions.pop();
          BackAndroid.removeEventListener('hardwareBackPress', torem);
        }
      }
    };
  },
  getInstance: function(){
    if(Object.keys(this.instance).length === 0){
      this.instance = this.init();
    }
    return this.instance;
  }
}
