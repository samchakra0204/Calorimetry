/*import { View, Text, Platform, FlatList } from 'react-native'
import React, { useRef } from 'react'
import RecipeIntro from './../../components/recipeintro'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeIngredients from '../../components/recipeingredients';
import RecipeSteps from '../../components/recipesteps';
import Button from './../../components/button'
import ActionSheet from 'react-native-actionsheet';
import AddToMealActionSheet from '../../components/addtomealactionsheet';

export default function RecipeDetail() {
    const { recipeId } = useLocalSearchParams();
    const actionSheetRef = useRef(null);
    console.log(recipeId);
    const RecipeDetail = useQuery(api.recipe.GetRecipeById, {
        id: recipeId == undefined && 'jd79330a2v69bc5wfbbbh85rnx7her51'
    });
    console.log(RecipeDetail);
    return (
        <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
                <View style={{
                    padding: 20,
                    paddingTop: Platform.OS === 'ios' ? 60 : 60,
                    backgroundColor: 'white',
                    height: '100%'
                }}>
                    <RecipeIntro RecipeDetail={RecipeDetail} />
                    <RecipeIngredients RecipeDetail={RecipeDetail} />
                    <RecipeSteps RecipeDetail={RecipeDetail} />
                    <View style={{
                        marginTop: 15
                    }}>
                        <Button title={'Add to Meal Plan'}
                            onPress={() => actionSheetRef.current.show()}
                        />
                    </View>
                    <ActionSheet ref={actionSheetRef} options={['Cancel']}
                        cancelButtonIndex={0}
                    >
                        <AddToMealActionSheet RecipeDetail={RecipeDetail}
                            hideActionSheet={() => actionSheetRef.current.hide()}
                        />
                    </ActionSheet>
                </View>
            }
        ></FlatList>
    )
}*/

/*import { View, Text, Platform, FlatList, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import RecipeIntro from './../../components/recipeintro'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeIngredients from '../../components/recipeingredients';
import RecipeSteps from '../../components/recipesteps';
import Button from './../../components/button'
import AddToMealActionSheet from '../../components/addtomealactionsheet';
import { Id } from 'convex/values';

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  if (!recipeId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }
  const RecipeDetail = useQuery(
  api.recipe.GetRecipeById,
  recipeId ? { id: recipeId } : undefined
);

if (!recipeId || !RecipeDetail) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading recipe...</Text>
    </View>
  );
}

  return (
    <>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <View style={{
            padding: 20,
            paddingTop: Platform.OS === 'ios' ? 60 : 60,
            backgroundColor: 'white',
            height: '100%'
          }}>
            <RecipeIntro RecipeDetail={RecipeDetail} />
            <RecipeIngredients RecipeDetail={RecipeDetail} />
            <RecipeSteps RecipeDetail={RecipeDetail} />
            <View style={{ marginTop: 15 }}>
              <Button title={'Add to Meal Plan'} onPress={() => setShowModal(true)} />
            </View>
          </View>
        }
      />

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        transparent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            maxHeight: '85%'
          }}>
            <AddToMealActionSheet
              RecipeDetail={RecipeDetail}
              hideActionSheet={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}*/

import { View, Text, Platform, FlatList, Modal } from 'react-native';
import React, { useState } from 'react';
import RecipeIntro from './../../components/recipeintro';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeIngredients from '../../components/recipeingredients';
import RecipeSteps from '../../components/recipesteps';
import Button from './../../components/button';
import AddToMealActionSheet from '../../components/addtomealactionsheet';

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);

  if (typeof recipeId !== 'string') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Invalid recipe ID</Text>
      </View>
    );
  }

  const RecipeDetail = useQuery(api.recipe.GetRecipeById, { id: recipeId });

  if (!RecipeDetail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <View
            style={{
              padding: 20,
              paddingTop: Platform.OS === 'ios' ? 60 : 60,
              backgroundColor: 'white',
              height: '100%',
            }}
          >
            <RecipeIntro RecipeDetail={RecipeDetail} />
            <RecipeIngredients RecipeDetail={RecipeDetail} />
            <RecipeSteps RecipeDetail={RecipeDetail} />
            <View style={{ marginTop: 15 }}>
              <Button title={'Add to Meal Plan'} onPress={() => setShowModal(true)} />
            </View>
          </View>
        }
      />

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 10,
              maxHeight: '85%',
            }}
          >
            <AddToMealActionSheet
              RecipeDetail={RecipeDetail}
              hideActionSheet={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
