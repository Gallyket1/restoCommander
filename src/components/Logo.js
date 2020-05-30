import React from 'react'
import {Image, View, Text, StyleSheet} from 'react-native'

export default function Logo({logo}) {
  return (
    <View style={styles.container}>
      <Image style = {styles.image}source = {require('./chicken.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  image: {
    height: 70,
    width: 70
  }
})
