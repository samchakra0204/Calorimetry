import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

export default function loadingdialogue({loading = false}) {
  return (
    <Modal transparent visible={loading}>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000070'
        }}>
            <View style={{
                padding: 20, 
                borderRadius: 15,
                backgroundColor: 'blue',
                alignItems: 'center'
            }}>
                <ActivityIndicator size={'large'}
                color={'white'}/>
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    marginTop: 8
                }}>Loading...</Text>
            </View>
        </View>
    </Modal>
  )
}