/*import { View, Text } from 'react-native'
import React from 'react'

export default function RecipeCard({recipe}) {
    const recipeJson = recipe?.jsonData
  return (
    <View style={{
        flex: 1,
        margin: 5
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}>{recipe?.recipeName}</Text>
      <View>
        <Text>{recipeJson?.calories}</Text>
      </View>
    </View>
  )
}*/

import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function RecipeCard({ recipe }) {
  const recipeJson = recipe?.jsonData;

  return (
    <Link href={`/recipe-detail?recipeId=${recipe?._id}`} asChild>
      <Pressable style={styles.card}>
        <Text style={styles.title}>{recipe?.recipeName}</Text>
        <View>
          <Text>🔥 {recipeJson?.calories} kcal</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
