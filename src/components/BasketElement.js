import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

export default function BasketElement(props){

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style ={{color: 'green'}}>{props.quantity + 'x'}</Text>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.titleText}>{props.name}</Text>
        <Text style = {styles.optionsText}>{props.chosenAcc + ', ' + props.chosenBoisson + ', ' + props.chosenSauce}</Text>
      </View>
      <View style = {styles.priceContainer}>
        <Text>{parseFloat(props.price)*parseFloat(props.quantity)}</Text>
      </View>
      <View style = {styles.buttonContainer}>
        <TouchableOpacity onPress ={props.remove}>
          <Icon name ={"remove"} reverse={true} color={"red"} size={12}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={false}  onPress={props.add}>
          <Icon name ={"add"} reverse={true} color={"green"} size={12}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
    borderBottomWidth: 0.15,
    marginTop: 7,
    marginBottom: 2
  },
  amountContainer: {
    flex: 0.5,
    marginLeft: 10
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1
  },
  titleText: {
    fontWeight: 'bold',
  },
  amountText: {
  },
  optionsText: {
    fontSize: 10
  },
  priceContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }

})
