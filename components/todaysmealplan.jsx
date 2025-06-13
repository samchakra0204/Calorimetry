/*import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Button from './button'
import { UserContext } from '../context/userContext';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import moment from 'moment';
import MealPlanCard from './mealplancard';
import { RefreshDataContext } from '../context/refreshdatacontext';

/*export default function TodaysMealPlan({selectedDate}) {
  const [mealPlan, setMealPlan] = useState(null);
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const {refreshData, setRefreshData} = useContext(RefreshDataContext)
  useEffect(() => {
    user && GetTodaysMealPlan();
  }, [user, refreshData, selectedDate])
  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.mealplan.GetTodaysMealPlan, {
      date: selectedDate ?? moment().format('DD/MM/YYYY'),
      uid: user?._id
    })
    console.log(result);
    setMealPlan(result);
  }*/
/*export default function TodaysMealPlan({ date = null }) {
 const [mealPlan, setMealPlan] = useState(null);
 const { user } = useContext(UserContext);
 const convex = useConvex();
 const { refreshData } = useContext(RefreshDataContext);

 useEffect(() => {
   if (user && date !== null) {
     setMealPlan(null); // 🔁 Clear old data so "no plan" message can show
     GetTodaysMealPlan();
   }
 }, [user, refreshData, date]);

 const GetTodaysMealPlan = async () => {
   const result = await convex.query(api.mealplan.GetTodaysMealPlan, {
     date: date ?? moment().format('DD/MM/YYYY'),
     uid: user?._id
   });
   console.log('Selected date:', date, '| Meal plan:', result);
   setMealPlan(result);
 };

 return (
   <View style={{ marginTop: 15 }}>
     {!date && (
       <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Meal Plan</Text>
     )}

     {mealPlan === null || mealPlan.length === 0 ? (
       <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
         <Text>📅</Text>
         <Text style={{
           fontSize: 18,
           color: 'gray',
           marginBottom: 20
         }}>
           You don't have Meal Plan for {date ?? 'Today'}
         </Text>
         <Button title={'Create New Meal Plan'} />
       </View>
     ) : (
       <FlatList
         data={mealPlan}
         renderItem={({ item }) => (
           <MealPlanCard mealPlanInfo={item} />
         )}
       />
     )}
   </View>
 );
}

 /*return (
   <View style={{ marginTop: 15 }}>
     {!selectedDate && <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Meal Plan</Text>}
     {!mealPlan ?
       <View style={{
         display: 'flex',
         alignItems: 'center',
         padding: 20
       }}>
         <Text>📅</Text>
         <Text style={{
           fontSize: 18,
           color: 'gray',
           marginBottom: 20
         }}>You don't have Meal Plan for Today</Text>
         <Button title={'Create New Meal Plan'} />
       </View>
       : <View>
         <FlatList
           data={mealPlan}
           renderItem={({ item }) => (
             <MealPlanCard mealPlanInfo={item}/>
           )}
         />
       </View>
     }
   </View>
 )
}*/

/*import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router'; // ⬅️ Add this line
import moment from 'moment';
import { UserContext } from '../context/userContext';
import { RefreshDataContext } from '../context/refreshdatacontext';
import { useConvex } from 'convex/react';
import { api } from './../convex/_generated/api';
import MealPlanCard from './mealplancard'; // Adjust if needed
import Button from './button'

export default function TodaysMealPlan({ date = null }) {
  const [mealPlan, setMealPlan] = useState(null);
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const { refreshData } = useContext(RefreshDataContext);
  const router = useRouter(); // ⬅️ Add this line

  useEffect(() => {
    console.log('🔁 useEffect triggered - date:', date, 'refreshData:', refreshData);
    if (user) {
      setMealPlan(null); // Clear to trigger loading/empty state
      GetTodaysMealPlan();
    }
  }, [user, refreshData, date]);

  const GetTodaysMealPlan = async () => {
    const targetDate = date ?? moment().format('DD/MM/YYYY');
    console.log('📅 Fetching Meal Plan For Date:', targetDate);

    const result = await convex.query(api.mealplan.GetTodaysMealPlan, {
      date: targetDate,
      uid: user?._id
    });

    console.log('📋 Fetched Meal Plan:', result);
    setMealPlan(result);
  };


  return (
    <View style={{ marginTop: 15 }}>
      {!date && (
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Meal Plan</Text>
      )}

      {mealPlan === null || mealPlan.length === 0 ? (
        <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
          <Text>📅</Text>
          <Text style={{
            fontSize: 18,
            color: 'gray',
            marginBottom: 20
          }}>
            You don't have Meal Plan for {date ?? 'Today'}
          </Text>
          <Button
            title={'Create New Meal Plan'}
            onPress={() => router.push('/tabs/meals')} // ⬅️ Navigate to Meal page
          />
        </View>
      ) : (
        <FlatList
          data={mealPlan}
          renderItem={({ item }) => (
            <MealPlanCard mealPlanInfo={item} />
          )}
        />
      )}
    </View>
  );
}*/

import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { UserContext } from '../context/userContext';
import { RefreshDataContext } from '../context/refreshdatacontext';
import { useConvex } from 'convex/react';
import { api } from './../convex/_generated/api';
import MealPlanCard from './mealplancard';
import Button from './button';

export default function TodaysMealPlan({ date = null }) {
  const [mealPlan, setMealPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const { refreshData } = useContext(RefreshDataContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetTodaysMealPlan();
    }
  }, [user, refreshData, date]);

  const GetTodaysMealPlan = async () => {
    setIsLoading(true);
    const queryDate = date ?? moment().format('DD/MM/YYYY');
    console.log('📅 Fetching Meal Plan For Date:', queryDate);

    const result = await convex.query(api.mealplan.GetTodaysMealPlan, {
      date: queryDate,
      uid: user?._id
    });

    console.log('📋 Fetched Meal Plan:', result);
    setMealPlan(result);
    setIsLoading(false);
  };

  return (
    <View style={{ marginTop: 15 }}>
      {!date && (
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Meal Plan</Text>
      )}

      {isLoading ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'gray' }}>Loading...</Text>
        </View>
      ) : mealPlan.length === 0 ? (
        <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
          <Text>📅</Text>
          <Text style={{
            fontSize: 18,
            color: 'gray',
            marginBottom: 20
          }}>
            You don't have Meal Plan for {date ?? 'Today'}
          </Text>
          <Button
            title={'Create New Meal Plan'}
            onPress={() => router.push('/tabs/meals')}
          />
        </View>
      ) : (
        <FlatList
          data={mealPlan}
          renderItem={({ item }) => (
            <MealPlanCard mealPlanInfo={item} />
          )}
          keyExtractor={(item, index) => item._id ?? index.toString()}
        />
      )}
    </View>
  );
}
