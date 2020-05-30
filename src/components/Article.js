import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, TouchableHighlight, ScrollView} from "react-native";
import { Icon } from 'react-native-elements'
import AmountPrice from "./AmountPrice";

export default function Article (props) {
  return (
      <View style={styles.articleContainer}>
        <View style={styles.plusBox}>
          <Icon
            name='directions-bike'/>
        </View>
        <View style = {styles.nameContainer}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
        <View style = {styles.photoAndDescrContainer}>
          <ScrollView style = {styles.descriptionsContainer}>
            <Text style={styles.descriptionText}>
              {props.description}
            </Text>
          </ScrollView>
          <View style={styles.photoContainer}>
            <Image style = {styles.photo} source={props.photo} />
          </View>
        </View>
        <View style = {styles.priceContainer}>
          <Text style={styles.priceText}>{props.price}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  articleContainer: {
    height: 250,
    width: 320,
    borderWidth: 1,
    margin: 7,
    overflow: 'hidden',
  },

  firstLineContainer:{
    flexDirection: 'row'
  },

  plusBox: {
    height: 40,
    width: 40,
    borderLeftWidth: 0.4,
    borderBottomWidth: 0.4,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    display: 'flex',
  },
  nameContainer: {
    marginLeft: 7
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 22
  },
  priceContainer: {
    alignSelf: 'flex-start',
    margin: 7
  },
  priceText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20
  },

  photoAndDescrContainer: {
    flexDirection: 'row',
    height: 100,
    overflow: 'hidden'
  },
  descriptionsContainer: {
    marginLeft: 7,
    flex: 1
  },
  descriptionText: {
    fontStyle: 'italic',
  },
  photoContainer: {
    flex: 1,
  },
  photo :{
    height: 100,
    width: 100,
    borderRadius: 40,
  },
})
