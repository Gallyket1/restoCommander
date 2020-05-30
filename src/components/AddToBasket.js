import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Icon} from "react-native-elements";
import {Badge} from "react-native-elements"


export default function AddToBasket(props) {
  let message = props.reading ? 'Panier' + '(' + props.price + ' FC' + ')' : 'Ajouter ' + props.price + ' FC';
  return(
      <TouchableOpacity disabled={props.disableTO} style = {styles.container} onPress={props.sendToBasket}>
        <View style = {styles.badgeAndIconContainer}>
          {props.badgeValue?
            <View style = {styles.icon}>
              <Icon name={'shopping-cart'} color={"white"}/>
              <Badge
                value={props.badgeValue}
                containerStyle={styles.badgeStyle}
                status="warning" />
            </View>: null}
        </View>
        <View style = {styles.textContainer}>
          <Text style = {styles.text}>{message}</Text>
        </View>
        
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 0.1,
    backgroundColor: 'dodgerblue',
    marginTop: 0,
    flexDirection: 'row',
    borderColor: 'orange',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  icon: {
    flex: 0.5,
  },
  badgeStyle: {
    position: 'absolute',
    top: -10,
    right: -12
  },
  badgeAndIconContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5
  }
})
