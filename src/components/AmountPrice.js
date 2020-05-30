import React from 'react'
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

const buttonSize = 18

export default function AmountPrice({quantity, addAmount, subtractAmount, price}){
  return (
    <View style = {styles.amountAndPriceContainer}>
      <View style = {styles.amountContainer}>
        <View style = {styles.minus}>
          <TouchableOpacity onPress={subtractAmount}>
            <Icon name={"remove"}
                  reverse={true}
                  color={'red'}
                  size={buttonSize}
                  disabled={quantity === 1}/>
          </TouchableOpacity>
        </View>
        <View style = {styles.amount}>
          <Text style = {styles.amountText}>{quantity}</Text>
        </View>
        <View style = {styles.plus}>
          <TouchableOpacity onPress={addAmount}>
            <Icon name={"add"} reverse={true} color={'green'} size={buttonSize}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.priceTotalContainer}>
          <Text style = {styles.priceTotalText}>{price*quantity + " FC"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  amountAndPriceContainer:{
    flexDirection: 'row',
    marginTop: 20,
  },
  amountContainer:{
    flexDirection: 'row',
    width: 120,
    height: 30,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 1
  },
  minus:{
    flex: 1
  },
  amount:{
    flex: 0.4
  },
  amountText:{
  },
  plus:{
    flex: 1
  },
  priceTotalContainer: {
    height: 45,
    width: 90,
    borderWidth: 1,
    alignSelf: 'flex-end',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'grey'
  },
  priceTotalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  }
})
