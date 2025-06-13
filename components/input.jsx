import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function input({placeholder, label, password = false, onChangeText=()=>{}, value}) {
  return (
    <View style={{
      marginTop: 15
    }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18
      }}>{label}</Text>
    <TextInput placeholder={placeholder} 
    secureTextEntry={password}
    onChangeText={(value)=>onChangeText(value)}
    style={{
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 18,
        paddingVertical: 20,
        width: '100%',
        marginTop: 2
    }}/>
    </View>
  )
}