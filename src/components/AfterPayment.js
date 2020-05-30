import React, {useEffect, useRef} from 'react'
import {StyleSheet, Button, Text, View, Animated, Easing} from "react-native";
import {Icon} from "react-native-elements";

export default function AfterPayment({navigation}){

  let iconValue = useRef(new Animated.Value(2000)).current

  let AnimatedIcon = Animated.createAnimatedComponent(Icon)

  useEffect( () =>  {
    Animated.timing(
      iconValue, {
        toValue: 35,
        duration: 300,
      }
    ).start()
  })

  return (
    <Animated.View style={{alignItems: 'center', marginTop: 150}}>
      <AnimatedIcon name={"check"} size={iconValue} color={"green"} reverse={true}/>
      <View>
        <Text style = {{fontWeight: "bold"}}>Merci pour votre commande !</Text>
      </View>
      <View style = {styles.retourButtonContainer}>
        <Button title={"Retour à l'accueil"} onPress={() => {navigation.push('Tous')}}/>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  retourButtonContainer: {
    marginTop: 30,
  },
  textRetourButton: {
    color: 'white'
  }
})
