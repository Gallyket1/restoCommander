import React, {useEffect, useState} from 'react';
import AddToBasket from "./AddToBasket";
import { AsyncStorage, View, Button, TouchableOpacity} from 'react-native';

export default function TopToBasket({navigation}){

  let x = {totPrice: 0, elems: 0}

  let [text, setText] = useState("I'm in")
  let [BasketElement, setBasketElement] = useState(x)

  let getBasket =  async () => {

    if(AsyncStorage.multiGet(["totalPrice", "nombreElement"]) != null){
      (AsyncStorage.multiGet(["totalPrice", "nombreElement"])).then((res) => {
        const b = res[0][1]
        const c = res[1][1]
        //console.log("b = " + b)
        setBasketElement({totPrice: b, elems: c})
        console.log(BasketElement)
      })
    }

  }

  useEffect( () =>  {
    let isUnmounted = false;

    getBasket().then(() => {
      if (!isUnmounted) {
        setText("I'm gone")
      }
    });
    return () => {
      isUnmounted = true
    }
    //console.log(BasketElement)
  }, [BasketElement.totPrice])

  return(
    <View>
      <TouchableOpacity onPress={() => navigation.push('Panier', {elementToAdd: null})}>
        {BasketElement.elems > 0?
          <AddToBasket
            reading ={true}
            disableTO ={true}
            price = {BasketElement.totPrice}
            badgeValue={BasketElement.elems}
          />: null}
      </TouchableOpacity>
    </View>
  )
}
