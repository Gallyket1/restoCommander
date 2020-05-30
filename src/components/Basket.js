import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native'
import { AsyncStorage } from 'react-native';
import BasketElement from "./BasketElement";
import ModalPayment from "./ModalPayment";

export default function Basket({navigation, route}){
  let {elementToAdd, etsdeliveryPrice} = route.params

  let [articles, setArticles] = useState([])

  let [currency, setCurrency] = useState(0)
  let [currAvailable, setCurrAvailable] = useState(false)
  let [showModal, setShowModal] = useState(false)

  let getCurrency = async () => {
    let a = await fetch('http://data.fixer.io/api/latest?access_key=47d1072be475be23487ef204a3261608&symbols=CDF,USD&format=1', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    let b = await a.json()
    if(b.success === true){
      //console.log(b.rates.CDF)
      setCurrency(parseFloat(b.rates.CDF))
      setCurrAvailable(true)
    }
  }
  let totalQuantity = (list) => {
    return list.reduce((acc, item) => parseFloat(acc) + parseFloat(item.quantity), 0)
  }

  useEffect( () => {
    let unmounted = false;
      getData()
      getCurrency()

    return () => {
      unmounted = true;
    }
    //storeDataInLocalStorage(articles)
    //console.log(elementToAdd)
  },[]);


  let unikId = 1;

  let getData = async () => {
    let listOfArticles = []
    //await AsyncStorage.removeItem("maman")
    try {
      if(elementToAdd == null){
        listOfArticles = JSON.parse(await AsyncStorage.getItem("maman"));
        setArticles(listOfArticles)
      }else{
        listOfArticles = JSON.parse(await AsyncStorage.getItem("maman"));
        if(listOfArticles !== null){
          listOfArticles.push(elementToAdd);
          setArticles(listOfArticles)
          storeDataInLocalStorage(listOfArticles)
        }else{
          if(elementToAdd !== null){
            listOfArticles = [elementToAdd]
            setArticles(listOfArticles)
            storeDataInLocalStorage(listOfArticles)
            //console.log('f')
            //setArticles(listOfArticles)
          }
        }
      }
    }
    catch(e) {
      // error reading value
    }
    //storeDataInLocalStorage(articles)
  }

  let storeDataInLocalStorage =  (list) => {
    let price = totalPrice(list, etsdeliveryPrice)
    let quantity = totalQuantity(list)
     AsyncStorage.setItem("maman", JSON.stringify(list))
     AsyncStorage.setItem("totalPrice", JSON.stringify(price))
     AsyncStorage.setItem("nombreElement", JSON.stringify(quantity))
  }

  let clearLocalStorage = async () => {
    await AsyncStorage.removeItem("maman")
    await AsyncStorage.removeItem("nombreElement")
    await AsyncStorage.removeItem("totalPrice")
  }

  const reorderArticle = (list) =>{
    list.reduce((acc, article) => {
      acc["article.id"] = {type: article.quantity};
      console.log(acc)
      return acc;
    },{});
  }

  let adjustAmount = async (index, ops) =>{
    console.log(index)
    let newArray = [... articles];
    let toIncrease = newArray[index].quantity;
    if(ops === 'add'){
      toIncrease += 1;
    }else{
        toIncrease -= 1
      }
    if(toIncrease > 0){
      newArray[index].quantity = toIncrease;
    }else{
      newArray.splice(index, 1)
    }
    await AsyncStorage.setItem("maman", JSON.stringify(newArray))
    await AsyncStorage.setItem("nombreElement", JSON.stringify(totalQuantity(newArray)))
    await AsyncStorage.setItem("totalPrice", JSON.stringify(totalPrice(newArray, etsdeliveryPrice)))
    setArticles(newArray);
  }

  let totalPrice = (list, init) => {
    return list.reduce((accumulator, article) =>
      parseFloat(accumulator) + parseFloat(article.price)*parseFloat(article.quantity), init)
  }

  let sous_total = 0;

  if(articles){
    sous_total = totalPrice(articles, 0)
  }
  let total = sous_total + parseFloat(etsdeliveryPrice);

  let total_dollars = Math.round((total *100.0/currency))/100

  let key = -1;

  let listElems = articles.map((article, index) =>
    <View key={index}>
      <BasketElement
        quantity = {article.quantity}
        name = {article.name}
        chosenAcc={article.chosenAcc}
        chosenBoisson= {article.chosenBoisson}
        chosenSauce = {article.chosenSauce}
        price = {article.price}
        key = {index}
        add={() => adjustAmount(index, 'add')}
        remove={() => adjustAmount(index, 'remove')}

      />
    </View>
    )


  if(articles.length === 0){
    return (
      <View style = {styles.emptyBasketContainer}>
        <Text>Votre panier est vide ! {JSON.stringify(articles)}</Text>
        <View tyle={{marginTop: 10}}>
          <Button title = {"Faire les achats"} onPress={() =>
            navigation.push('Tous')}/>
        </View>
      </View>
    )
  }else if(articles.length !== 0 && !currAvailable){
    return (
      <ActivityIndicator size={30}/>
    )
  }
  return (
    <View style = {{flex: 1}}>
      <ScrollView>
        {listElems}
        <View style={styles.container}>
          <View style={styles.TextContainer}>
            <Text>Sous total</Text>
          </View>
          <View style={styles.TextContainer}>
            <Text>{sous_total + " FC"}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.TextContainer}>
            <Text>Frais de livraison</Text>
          </View>
          <View style={styles.TextContainer}>
            <Text>{etsdeliveryPrice + " FC"}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.TextContainer}>
            <Text>Total</Text>
          </View>
          <View style={styles.TextContainer}>
            <Text>{total + " FC" + "/" + total_dollars + " USD"}</Text>
          </View>
        </View>
      </ScrollView>
      <ModalPayment
        toCheckout = {() => navigation.push('Paypal', {toPay: total_dollars})}
      />
      <View>
        <Button title={"Payer"} color={"green"} onPress={() => navigation.push('Paypal', {toPay: total_dollars})}/>
        <Button title = {"Continuer les achats"} color={"orange"} onPress={() =>
          navigation.push('Tous', {totalPrice: 558, nombreElement: 21})}/>
      </View>

    </View>

    );
}

const styles = StyleSheet.create({

  container: {
    flexDirection:'row',
    marginLeft: 30,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },

  TextContainer: {
    flex: 1
  },
  priceContainer: {
    flex: 1
  },
  emptyBasketContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  }
})

