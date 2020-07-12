/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { connect,Provider } from 'react-redux';
import * as Action from './Redux/action';
import {store} from './Redux/store';
import Main from './main';

console.disableYellowBox=true;

class App extends React.Component  {

  render(){
    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex:1}}>
          <Main />
        </SafeAreaView>
      </Provider>
    );
  }
};

export default App;
