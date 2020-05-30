import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import Logo from "./Logo";
import { Icon } from 'react-native-elements'


export default function Etablissement ({navigation, deliveryPrice, etsName, etsId,
                                         etsDeliveryTime, etsDescription, etsMinDeliveryPrice,
                                         etsOpeningHour, etsClosingHour}) {
  let iconSize = 14
  return (
    <View key={etsId} style = {styles.allContainer}>
        <View style={styles.container}>
          <View style = {styles.firstBox}>
            <Logo/>
          </View>
          <View style = {styles.secondBox}>
            <Text style = {styles.etsTitle}>{etsName}</Text>
            <View style = {styles.descriptionsContainer}>
              <Text style = {styles.descriptionText}>{etsDescription}</Text>
            </View>
            <View style = {styles.etsOpenHoursContainer}>
              <Icon color = {'grey'} name = 'access-time' size={iconSize}/>
              <Text style = {styles.textRight}>{etsDeliveryTime}</Text>
              <Icon style = {styles.icon} color = {'grey'} name = 'directions-bike' size={iconSize}/>
              <Text style = {styles.textRight}>{deliveryPrice}</Text>
            </View>
            <View style = {styles.etsOpenHoursContainer}>
              <Icon color = {'grey'} name = 'monetization-on' size={iconSize}/>
              <Text style = {styles.textRight}>{'Min. ' + etsMinDeliveryPrice}</Text>
            </View>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  allContainer: {
    alignItems: 'center'
  },
  container: {
    borderWidth: 0.3,
    flexDirection:'row',
    margin: 10
  },
  firstBox: {
    flex: 2,
    borderRightWidth: 0.1,
    padding: 20,
  },
  secondBox: {
    flex: 5,
    alignItems: 'center',
    padding: 5
  },
  etsTitle: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textShadowColor: 'pink',
    textShadowOffset: {height: 0, width: -1},
    textShadowRadius: 10
  },
  etsOpenHoursContainer: {
    marginTop:5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  textRight: {
    marginLeft: 5
  },
  etsDeliveryContainer: {
    marginTop:2,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  descriptionsContainer: {
    alignSelf: 'flex-start'
  },
  descriptionText:{
    fontSize: 16,
    color: 'blue',
    fontStyle: 'italic'
  },
  icon: {
    marginLeft: 15
  }
})
