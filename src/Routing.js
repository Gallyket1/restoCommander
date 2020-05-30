import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Restos from "./Restos";
import Etablissement from "./components/Etablissement";
import EtablissementDetails from "./components/EteblissementDetails";
import ArticleDetails from "./components/ArticleDetails";
import ListEtablissements from "./components/ListEtablissements";
import Basket from "./components/Basket";
import {View, Text} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import App from "../App";
import AddToBasket from "./components/AddToBasket";
import TopToBasket from "./components/TopToBasket";
import UsePaypal from "./components/UsePaypal";
import Paypal from "./components/Paypal";
import PaypalBouton from "./components/PaypalBouton";
import AfterPayment from "./components/AfterPayment";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const ToBasketStack = createStackNavigator();

export function TabHeader (){
  return (
      <Tab.Navigator>
        <Tab.Screen name = {"Tous"} component = {ListEtablissements}/>
        <Tab.Screen name = {"Burgers"} component = {Restos}/>
        <Tab.Screen name = {"Pizerrias"} component = {Restos}/>
      </Tab.Navigator>

  )
}

export function Routing(){
  return(
    <NavigationContainer style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen name={"Tous"} component = {TabHeader}/>
        <Stack.Screen name = {"Etablissement"} component = {Etablissement}/>
        <Stack.Screen name = {"Ah"} component = {AddToBasket}/>
        <Stack.Screen name = {"Paypal"} component = {Paypal} options = {{tabBarVisible: false, headerLeft: null}}/>
        <Stack.Screen
          name = {"EtablissementDetails"}
          component = {EtablissementDetails}
        />
        <Stack.Screen
          name = {"ArticleCheck"}
          component = {ArticleDetails}
          initialParams={{amount: 0, montantTotal: 0}}
        />
        <Stack.Screen
          name ={"Panier"}
          component ={Basket}
          options = {{tabBarVisible: false, headerLeft: null}}
        />
        {/*<Stack.Screen name = {"Eho"} component = {TopToBasket}/>*/}
        <Stack.Screen
          name = {"After"}
          component = {AfterPayment}
          options = {{tabBarVisible: false, headerLeft: null}}/>
      </Stack.Navigator>
      </NavigationContainer>
  )
}
