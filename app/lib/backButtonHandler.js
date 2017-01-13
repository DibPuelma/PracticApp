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


// addBackEvent: function(func) {
//   this.addedFunctions.push(func)
//   BackAndroid.addEventListener('hardwareBackPress', func);
// },
//
// removeBackEvent: function(func) {
//   BackAndroid.removeEventListener('hardwareBackPress', func);
//   this.addedFunctions.pop()
// },
//
// backToPrevious: function(component) {
//   console.log("poping");
//   component.props.navigator.pop();
//   return true; // This is important to prevent multiple calls
// },
//
// addBackEventWithAlert: function(func) {
//   BackAndroid.addEventListener('hardwareBackPress', func);
// },
//
// removeBackEventWithAlert: function(func) {
//   BackAndroid.removeEventListener('hardwareBackPress', func);
// },
//
// backToPreviousWithAlert: function(component) {
//   console.log("Replacing");
//   Alert.alert(
//     '¿Quieres salir de la encuesta?',
//     'Recuerda que con solo 1 minuto de tu tiempo puedes ayudar a esta tienda a mejorar su servicio. Además estarás participando por premios mensuales',
//     [
//       {text: 'No', style: 'cancel'},
//       {text: 'Sí', onPress: () => component.props.navigator.replace({id: 'scanner'})},
//     ]
//   )
//   return true; // This is important to prevent multiple calls
// }
