import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './../shared/colors';
import { useRouter } from 'expo-router';

export default function generaterecipecard() {
  const router = useRouter();
  return (
    <LinearGradient 
    colors={['blue', 'pink']}
    style={{
        marginTop: 15,
        padding: 15,
        borderRadius: 15
    }}>
      <Text style={{
        fontSize: 23,
        fontWeight: 'bold',
        colors: Colors.WHITE
      }}>Need Meal Ideas ? ✨</Text>
      <Text style={{
        color: Colors.WHITE,
        fontSize: 18,
        opacity: 0.8,
        marginTop: 7
      }}>Let AI Generate it for you</Text>
      <TouchableOpacity 
      onPress={()=>router.push('/generate-ai-recipe')}
      style={{
        padding: 12,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 15
      }}>
        <Text style={{
            fontSize: 18,
            color: 'green'
        }}>Generate with AI ↗️</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}