import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { Square, CheckSquare } from 'lucide-react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RefreshDataContext } from '../context/refreshdatacontext';

export default function MealPlanCard({ mealPlanInfo }) {
  const updateStatus=useMutation(api.mealplan.updateStatus);
  const {refreshData, setRefreshData} = useContext(RefreshDataContext)
  const onCheck=async(status)=>{
    const result=await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories: mealPlanInfo?.recipe?.jsonData?.calories
    });
    Alert.alert('Status Updated!');
    setRefreshData(Date.now());
  }
  return (
    <View style={{
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      backgroundColor: 'white',
      borderRadius: 15,
      marginTop: 10
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10, flex: 1
      }}>
        <View>
          <Text style={styles.mealTypeText}>{mealPlanInfo?.mealPlan?.mealType}</Text>
          <Text style={styles.recipeNameText}>{mealPlanInfo?.recipe?.recipeName}</Text>
          <Text style={styles.caloriesText}>{mealPlanInfo?.recipe?.jsonData?.calories}</Text>
        </View>
        <View>
          {mealPlanInfo?.mealPlan?.status !== true ? 
          <TouchableOpacity onPress={()=>onCheck(true)}>
            <Square size={24} stroke="black" />
          </TouchableOpacity> : <TouchableOpacity onPress={()=>onCheck(false)}>
            <CheckSquare size={24} stroke="green" />
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: 'white',
    color: 'blue',
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 99
  },
  recipeNameText: {
    fontSize: 18,       // ✅ fixed: fontsize → fontSize
    fontWeight: 'bold'  // ✅ fixed: fontweight → fontWeight
  },
  caloriesText: {
    fontSize: 16,        // ✅ fixed: fontsize → fontSize
    fontWeight: '500',   // ✅ fixed: fontweight → fontWeight
    marginTop: 5,        // ✅ fixed: margintop → marginTop
    color: 'red'
  }
})
