/*import { View, Text, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateSelectionCard from '../../components/dateselectioncard';
import TodaysMealPlan from '../../components/todaysmealplan';
import TodayProgress from './../../components/todayprogress';
import GenerateRecipeCard from './../../components/generaterecipecard';

export default function Progress() {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 60
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
      }}>
        Progress
      </Text>

      <DateSelectionCard
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TodaysMealPlan date={selectedDate} />
      <TodayProgress />
      <GenerateRecipeCard />
    </ScrollView>
  );
}*/

import { View, Text, Platform, FlatList } from 'react-native';
import React, { useState } from 'react';
import DateSelectionCard from '../../components/dateselectioncard';
import TodaysMealPlan from '../../components/todaysmealplan';
import TodayProgress from './../../components/todayprogress';
import GenerateRecipeCard from './../../components/generaterecipecard';

export default function Progress() {
  const [selectedDate, setSelectedDate] = useState();

  const renderContent = () => {
    return (
      <>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 10
        }}>
          Progress
        </Text>

        <DateSelectionCard
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TodaysMealPlan date={selectedDate} />
        <TodayProgress />
        <GenerateRecipeCard />
      </>
    );
  };

  return (
    <FlatList
      data={['content']} // dummy item
      renderItem={renderContent}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 60
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

