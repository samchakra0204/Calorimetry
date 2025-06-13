import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function RecipeSteps({RecipeDetail}) {
    const steps = (RecipeDetail?.jsonData)?.steps;

  return (
    <View style={{
        marginTop: 15
    }}>
      <Text>Steps</Text>
      <FlatList 
      data={steps}
      renderItem={({item, index})=>(
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            padding: 10,
            flex: 1,
            alignItems: 'center',
            borderWidth: 0.3,
            borderRadius: 15
        }}>
            <Text style={{
                fontSize: 15,
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 99,
                paddingHorizontal: 15,
                color: 'white'
            }}>{index+1}</Text>
            <Text style={{
                fontSize: 15,
                flex: 1,
                flexShrink: 1
            }}>{item}</Text>
        </View>
      )}
      />
    </View>
  )
}