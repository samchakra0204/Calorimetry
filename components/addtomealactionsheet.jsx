import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Coffee, Sandwich, Utensils } from 'lucide-react-native';
import Button from './button';
import { UserContext } from '../context/userContext';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import moment from 'moment';
import { RefreshDataContext } from '../context/refreshdatacontext';

export default function AddToMealActionSheet({ RecipeDetail, hideActionSheet }) {
  const [dateList, setDateList] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMeal, setSelectedMeal] = useState();
  const { setRefreshData } = useContext(RefreshDataContext);
  const {user} = useContext(UserContext);
  const CreateMealPlan = useMutation(api.mealplan.CreateMealPlan)
  const mealOption = [
    {
      title: 'Breakfast',
      icon: Coffee
    },
    {
      title: 'Lunch',
      icon: Sandwich
    },
    {
      title: 'Dinner',
      icon: Utensils
    }
  ]
  useEffect(() => {
    GenerateDates()
  }, [])
  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY')
      result.push(nextDate);
    }
    console.log(result);
    setDateList(result);
  }
  const AddToMealPlan= async()=>{
    if(!selectedDate && !selectedMeal) {
      Alert.alert('Please Select All Details');
      return ;
    }
    console.log('✅ Meal Plan Added For Date:', selectedDate);
  console.log('✅ Meal Type:', selectedMeal);
    const result=await CreateMealPlan({
      date: selectedDate,
      mealType: selectedMeal,
      recipeId: RecipeDetail?._id,
      uid: user?._id
    })
    console.log(result);
    setRefreshData(Date.now());
    Alert.alert('Added!');
    hideActionSheet();
  }

  return (
    <View style={{
      padding: 20
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      }}>AddToMeal</Text>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
      }}>Select Date</Text>
      <FlatList
        data={dateList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: 7,
              borderWidth: 1,
              borderRadius: 15,
              margin: 5,
              backgroundColor: selectedDate == item ? 'skyblue' : 'white',
              borderColor: selectedDate == item ? 'blue' : 'gray'
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '500'
            }}>{moment(item, 'DD/MM/YYYY').format('ddd')}</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold'
            }}>{moment(item, 'DD/MM/YYYY').format('DD')}</Text>
            <Text style={{
              fontSize: 16
            }}>{moment(item, 'DD/MM/YYYY').format('MMM')}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
      }}>Select Meal</Text>
      <FlatList
        data={mealOption}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedMeal(item.title)}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 10,
              borderWidth: 1,
              borderRadius: 15,
              margin: 5,
              backgroundColor: selectedMeal === item.title ? 'skyblue' : 'white',
              borderColor: selectedMeal === item.title ? 'blue' : 'gray',
            }}
          >
            <item.icon size={28} color="black" />
            <Text style={{ marginTop: 5, fontSize: 16 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
      />
      <View style={{
        marginTop: 15
      }}>
        <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan}/>
        <TouchableOpacity 
        onPress={()=>hideActionSheet()}
        style={{
          padding: 15
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 20
          }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}