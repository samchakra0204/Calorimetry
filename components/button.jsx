import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from './../shared/colors.jsx';

export default function Button({ title, onPress, loading = false }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 13,
        backgroundColor: '#4682B4',
        width: '100%',
        borderRadius: 15
      }}
    >
      {loading?<ActivityIndicator color={'white'}/>:
      <Text
        style={{
          fontSize: 18,
          color: Colors.WHITE,
          textAlign: 'center'
        }}
      >
        {title}
      </Text>}
    </TouchableOpacity>
  );
}