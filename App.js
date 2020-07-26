/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { connect,Provider } from 'react-redux';
import * as Action from './Redux/action';
import {store} from './Redux/store';
import Main from './main';

import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import AsyncStorage from '@react-native-community/async-storage';


console.disableYellowBox=true;

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require("./translations/ar.json"),
  en: () => require("./translations/en.json"),
  fr: () => require("./translations/fr.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = (tag) => {
  // fallback if no available language fits
  const fallback = { languageTag: tag, isRTL: false };

  const { languageTag, isRTL } =
    // RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;

  console.log(languageTag);
};

class App extends React.Component  {

  constructor(props) {
    super(props);
    // setI18nConfig('en')
    this.state = {
      tag: null
    }
  }

  async componentDidMount() {
    var tag = await AsyncStorage.getItem('tag');
    if(tag){
      setI18nConfig(tag)
    }else{
      setI18nConfig('en');
    }
    this.setState({tag});
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig('en');
    this.forceUpdate();
  };

  render(){
    console.log('root');
    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex:1}}>
          {this.state.tag?<Main />:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size={'large'}/>
            </View>}
          {/* <Text style={{}} onPress={()=>{
            setI18nConfig('ar');
            this.forceUpdate();
          }}>{translate("hello")}</Text> */}
        </SafeAreaView>
      </Provider>
    );
  }
};

export default App;
