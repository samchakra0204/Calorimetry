import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

export default function homeheader() {
    const { user } = useContext(UserContext)
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }}>
      <Image source={require('./../assets/images/user.png')}
        style={{
            width: 60,
            height: 60,
            borderRadius: 99
        }}
      />
      <View>
        <Text style={{
            fontSize: 20
        }}>Hello, 👋</Text>
        <Text style={{
            fontSize: 23,
            fontWeight: 'bold'
        }}>{user?.name}</Text>
      </View>
    </View>
  )
}