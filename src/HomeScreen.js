import React from 'react'
import {Text, View, Button} from 'react-native'

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Vers le bord"
        onPress={() => navigation.navigate('Etablissement')}
      />
    </View>
  )
}
