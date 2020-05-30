import React, {Component, useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Routing, TabHeader} from "./src/Routing";
import {Header} from "react-native-elements";
import AddToBasket from "./src/components/AddToBasket";
import TopToBasket from "./src/components/TopToBasket";

export default function App({navigation}) {

    return (
      <View style={{flex: 1}}>
        <Routing/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
