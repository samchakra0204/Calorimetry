/*import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import GenerateRecipeCard from './../../components/generaterecipecard'
import {useQuery} from 'convex/react'
import {api} from './../../convex/_generated/api'
import RecipeCard from './../../components/recipecard'

export default function meals() {
  const recipeList = useQuery(api.recipe.GetAllRecipes);
  console.log(recipeList);

  return (
    <View style={{
      padding: 20,
      paddingTop: Platform.OS=='ios'?60:60
    }}> 
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold'
      }}>Discover Recipes 🍛</Text>
      <GenerateRecipeCard />
      <View>
        <FlatList 
         data={recipeList}
         renderItem={({item}) => (
          <RecipeCard recipe={item} />
         )}
        />
      </View>
    </View>
  )
}*/

/*import { View, Text, Platform, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import GenerateRecipeCard from './../../components/generaterecipecard'
import { useQuery } from 'convex/react'
import { api } from './../../convex/_generated/api'
import RecipeCard from './../../components/recipecard'

export default function Meals() {
  const recipeList = useQuery(api.recipe.GetAllRecipes);
  const { width } = useWindowDimensions();

  const cardWidth = 180; // Adjust as per your card size
  const gap = 10;
  const columns = Math.floor((width - 40) / (cardWidth + gap)); // 40 = padding * 2

  return (
    <ScrollView contentContainerStyle={{
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 60,
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15
      }}>Discover Recipes 🍛</Text>

      <View style={{ marginBottom: 30 }}>
        <GenerateRecipeCard />
      </View>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {recipeList?.map((item) => (
          <View key={item._id} style={{ width: `${100 / columns - 1}%`, marginBottom: 10 }}>
            <RecipeCard recipe={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}*/

import { View, Text, Platform, useWindowDimensions, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import GenerateRecipeCard from './../../components/generaterecipecard'
import { useQuery } from 'convex/react'
import { api } from './../../convex/_generated/api'
import RecipeCard from './../../components/recipecard'

export default function Meals() {
  const recipeList = useQuery(api.recipe.GetAllRecipes);
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');

  const cardWidth = 180;
  const gap = 10;
  const columns = Math.floor((width - 40) / (cardWidth + gap));

  const matchedRecipes = searchQuery.trim().length > 0
    ? recipeList?.filter((r) =>
        r?.recipeName?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : [];

  return (
    <ScrollView contentContainerStyle={{
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 60,
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15
      }}>Discover Recipes 🍛</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search recipe name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ddd'
        }}
      />

      <View style={{ marginBottom: 30 }}>
        <GenerateRecipeCard />
      </View>

      {/* Matched Recipes */}
      {matchedRecipes.length > 0 && (
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Matched Recipes:</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            {matchedRecipes.map((item) => (
              <View key={item._id} style={{ width: `${100 / columns - 1}%`, marginBottom: 10 }}>
                <RecipeCard recipe={item} />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* All Recipes */}
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>All Recipes:</Text>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {recipeList?.map((item) => (
          <View key={item._id} style={{ width: `${100 / columns - 1}%`, marginBottom: 10 }}>
            <RecipeCard recipe={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
