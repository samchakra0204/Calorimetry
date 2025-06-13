import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function DateSelectionCard({ selectedDate, setSelectedDate }) {
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    generateDates();
  }, []);

  const generateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY');
      result.push(nextDate);
    }
    setDateList(result);
  };

  return (
    <View>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
      }}>
        Select Date
      </Text>

      <FlatList
        data={dateList}
        numColumns={4}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 7,
              borderWidth: 1,
              borderRadius: 15,
              margin: 5,
              backgroundColor: selectedDate === item ? 'skyblue' : 'white',
              borderColor: selectedDate === item ? 'blue' : 'gray'
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              {moment(item, 'DD/MM/YYYY').format('ddd')}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {moment(item, 'DD/MM/YYYY').format('DD')}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {moment(item, 'DD/MM/YYYY').format('MMM')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
