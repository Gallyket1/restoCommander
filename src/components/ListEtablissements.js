import React, {useState, useEffect} from 'react'
import Etablissement from "./Etablissement";
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import TopToBasket from "./TopToBasket";

export default function ListEtablissements({navigation, route}) {

  console.log(route.params)

  let tot = 1;
  let elems = 1

  let [basketElems, setBasketElems] = useState({tot, elems})


  useEffect( () =>  {
    console.log(route.params)
    if(route.params?.totalPrice != null){
      console.log("haha")
      let {totalPrice, nombreElement} = route.params
      setBasketElems({totalPrice, nombreElement})
    }
  }, [])

  //let

  let [data, setData] = useState(dummyData)

  let ets = data.map((element, index) =>
      <TouchableOpacity
        key={index}
        onPress={() =>navigation.push('EtablissementDetails', {etsId: element.etsId, etsdeliveryPrice: element.deliveryPrice})}
      >
        <Etablissement
          key={index}
          etsI={element.etsId}
          etsName={element.etsName}
          etsDescription={element.etsDescription}
          deliveryPrice={element.deliveryPrice}
          etsDeliveryTime={element.etsDeliveryTime}
          etsMinDeliveryPrice={element.etsMinDeliveryPrice}
        />
      </TouchableOpacity>
    )
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {ets}
      </ScrollView>
        <TopToBasket
          navigation={navigation}
        />
    </View>
  )
}


let dummyData = [{
  etsId: 1,
  etsName: 'Super Burger De Kin',
  etsDeliveryTime: '45 min',
  etsDescription: 'Burger, glace et autre',
  etsMinDeliveryPrice: '15000 FC',
  etsType: 'Burger',
  etsOpeningHour: '8h',
  etsClosingHour: '22h',
  deliveryPrice: '0'
},
  {
    etsId: 2,
    etsName: 'Pizza de luxe Gombe',
    etsDeliveryTime: '1h',
    etsDescription: 'Pizza, pitta et autres',
    etsMinDeliveryPrice: '16000 FC',
    etsType: 'Pizzeria',
    etsOpeningHour: '8h30',
    etsClosingHour: '23h',
    deliveryPrice: '1000'
  },]
