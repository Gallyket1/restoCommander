import React from 'react'
import {Picker, StyleSheet, View, Text} from "react-native";

export default function CustomSelect({list, handleSelectChange, title, option}){

  const options = list.map(element => <Picker.Item
    key={element.id} label = {element.name} value = {element.name}/>)
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}> {title}</Text>
      <Picker
        selectedValue={option}
        style={{ height: 30, width: 150, color: "grey" }}
        onValueChange={handleSelectChange}
      >
        {options}
      </Picker>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    color: 'orange',
    fontWeight: 'bold',
  }
})

