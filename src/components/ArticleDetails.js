import React, {useEffect, useReducer, useState} from 'react'
import {StyleSheet, ScrollView, Image, View, Text, Picker, Button} from 'react-native'
import Logo from "./Logo";
import CustomSelect from "./CustomSelect";
import AmountPrice from "./AmountPrice";
import AddToBasket from "./AddToBasket";
import { AsyncStorage } from 'react-native';
import { Badge } from 'react-native-elements'


export default function ArticleDetails({handleSelectChange, article, route, navigation}){

  let {name} = route.params;
  let{id} = route.params
  let {amount} = route.params;
  let {photo} = route.params;
  let {options} = route.params;
  let {price} = route.params;
  let{etsdeliveryPrice} = route.params;

  let elemPanier  = {nombreElement: 0, montantTotal: 0}

  let [ElementsPanier, setElementsPanier] = useState(elemPanier);

  let getData = async () => {
    let listOfArticles = []
    try {
      listOfArticles = JSON.parse(await AsyncStorage.getItem("maman"));
      if(listOfArticles !== null){
        let montantTotal = listOfArticles.reduce((accumulator, article) =>
          parseFloat(accumulator) + parseFloat(article.price)*parseFloat(article.quantity), 0)
        let nombreElement = listOfArticles.reduce((accumulator, article) =>
          parseFloat(accumulator) + parseFloat(article.quantity), 0)
        setElementsPanier({nombreElement, montantTotal})
      }
    }
    catch(e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData()
  },[]);


  function reducer(quantity, action) {
    switch (action.type) {
      case 'increment':
        return quantity + 1;
      case 'decrement':
        return (quantity - 1 <= 0 ? 1 : quantity - 1);
      default:
        throw new Error();
    }
  }

  const [quantity, dispatch] = useReducer(reducer, 1)

  const accompagements = options.accompagements;
  const boissons = options.boissons;
  const sauces = options.sauces;

  const[chosenAcc, setChosenAcc] = useState(accompagements[0].name);
  const[chosenBoisson, setChosenBoisson] = useState(boissons[0].name);
  const[chosenSauce, setChosenSauce] = useState(sauces[0].name);

  const elementToAdd = {id, name, quantity, chosenAcc, chosenBoisson, chosenSauce, price}

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <Image source={photo} style = {styles.image}/>
          </View>
          <View style={styles.optionsContainer}>
            <CustomSelect
              list = {accompagements}
              title = {'Accompagnement'}
              option={chosenAcc}
              handleSelectChange={(value) => setChosenAcc(value)}
            />
            <CustomSelect
              list = {boissons}
              title = {'Boisson'}
              option={chosenBoisson}
              handleSelectChange={(value) => setChosenBoisson(value)}
            />
            <CustomSelect
              list = {sauces}
              title = {'Sauce'}
              option={chosenSauce}
              handleSelectChange={(value) => setChosenSauce(value)}
            />
          </View>
          <AmountPrice
            addAmount={() => dispatch({type: "increment"})}
            subtractAmount={() => dispatch({type: "decrement"})}
            quantity={quantity}
            price={parseFloat(price)}
          />
        </View>
      </ScrollView>
      <View style = {styles.basketInfoContainer}>
        <AddToBasket
          price={parseFloat(price)*quantity}
          sendToBasket={()=> navigation.push('Panier', {elementToAdd, etsdeliveryPrice})}
          badgeValue = {ElementsPanier.nombreElement}
        />
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 5
  },
  photoContainer: {
    flex: 1
  },
  optionsContainer: {
    marginTop:10,
    flex: 3
  },
  image:{
    height: 200,
    width: 500
  },
  basketInfoContainer: {
  }
})
