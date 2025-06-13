/*import { View, Text, Platform, Image } from 'react-native';
import React from 'react';
import { PlusSquare } from 'lucide-react-native';
import { Flame, Clock } from 'lucide-react-native';

export default function RecipeIntro({ RecipeDetail }) {
  const RecipeJson = RecipeDetail?.jsonData;
  return (
    <View>
      <Image
        source={{ uri: RecipeDetail?.imageUrl }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15
        }}
      />
      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>
          {RecipeDetail?.recipeName}
        </Text>
        <PlusSquare width={220} height={30} stroke='blue' />
      </View>
      <Text style={{
        fontSize: 16,
        marginTop: 6,
        color: 'gray',
        lineHeight: 25
      }}>{RecipeJson?.description}</Text>
      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Flame stroke="orange" width={30} height={30} strokeWidth={2} style={{ marginRight: 10 }} />
          <Text style={{
            fontSize: 16,
            color: 'red'
          }}>Calories</Text>
          <Text style={{
            fontSize: 16,
            color: 'orange'
          }}>{RecipeJson?.calories}</Text>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Clock stroke="blue" width={30} height={30} strokeWidth={2} />
          <Text style={{
            fontSize: 16,
            color: 'green'
          }}>Cook Time</Text>
          <Text style={{
            fontSize: 16,
            color: 'green'
          }}>{RecipeJson?.cooktime}</Text>
        </View>
      </View>
    </View>
  );
}*/

import { View, Text, Platform, Image, StyleSheet } from 'react-native';
import React from 'react';
import { PlusSquare, Flame, Clock } from 'lucide-react-native';

export default function RecipeIntro({ RecipeDetail }) {
  const RecipeJson = RecipeDetail?.jsonData;

  return (
    <View>
      {/*<Image
        source={{ uri: RecipeDetail?.imageUrl }}
        style={styles.image}
      />*/}
      {/*<View style={styles.titleRow}>
        <Text style={styles.titleText}>
          {RecipeDetail?.recipeName}
        </Text>
        <PlusSquare size={24} stroke='blue' />
      </View>*/}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {RecipeDetail?.recipeName}
        </Text>
        <PlusSquare size={24} stroke="blue" />
      </View>

      <Text style={styles.description}>{RecipeJson?.description}</Text>

      {/* Icon Info Row */}
      <View style={styles.infoContainer}>
        {/* Calories Column */}
        <View style={styles.infoColumn}>
          <Flame stroke="orange" width={30} height={30} strokeWidth={2} />
          <Text style={styles.label}>Calories</Text>
          <Text style={styles.value}>{RecipeJson?.calories || '--'} kcal</Text>
        </View>

        {/* Cook Time Column */}
        <View style={styles.infoColumn}>
          <Clock stroke="green" width={30} height={30} strokeWidth={2} />
          <Text style={styles.label}>Cook Time</Text>
          <Text style={styles.value}>{RecipeJson?.cooktime || '--'} min</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15
  },
  titleRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  description: {
    fontSize: 16,
    marginTop: 6,
    color: 'gray',
    lineHeight: 25
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  infoColumn: {
    alignItems: 'center',
    gap: 4
  },
  label: {
    fontSize: 14,
    color: 'orange',
    marginTop: 4
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    color: 'red'
  }
});


