/*import { View, Text } from 'react-native'
import React from 'react'
import Input from './../../components/input';
import { BodyPartMuscleIcon, BodyWeightIcon, FemaleSymbolIcon, MaleSymbolIcon, WeightScaleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Colors from './../../shared/colors';
import { StyleSheet } from 'react-native';

export default function preference() {
    return (
        <View style={{
            padding: 20,
            backgroundColor: 'white',
            height: '100%'
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 30
            }}>Tell us about Yourself</Text>
            <Text style={{
                fontSize: 16,
                textAlign: 'center',
                color: 'gray'
            }}>This help us Create your Personalized Meal Plan</Text>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Input placeholder={'eg 72'} label='Weight' />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Input placeholder={'eg 5.11'} label='Height (ft)' />
                </View>
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontWeight: 'medium',
                    fontSize: 18
                }}>Gender</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <View style={{
                        borderWidth: 1,
                        padding: 15,
                        borderColor: 'gray',
                        borderRadius: 15,
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <HugeiconsIcon icon={MaleSymbolIcon} size={40} color={Colors.BLUE} />
                    </View>
                    <View style={{
                        borderWidth: 1,
                        padding: 15,
                        borderColor: 'gray',
                        borderRadius: 15,
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <HugeiconsIcon icon={FemaleSymbolIcon} size={40} color={Colors.PINK} />
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>What's your Goal?</Text>

                <View style={styles.goalBox}>
                    <HugeiconsIcon icon={BodyWeightIcon} size={30} />
                    <Text style={styles.goalText}>Weight Loss</Text>
                    <Text style={styles.goalSubText}>Reduce Body Fat</Text>
                </View>

                <View style={styles.goalBox}>
                    <HugeiconsIcon icon={BodyPartMuscleIcon} size={30} />
                    <Text style={styles.goalText}>Muscle Gain</Text>
                    <Text style={styles.goalSubText}>Build Lean Muscle</Text>
                </View>

                <View style={styles.goalBox}>
                    <HugeiconsIcon icon={WeightScaleIcon} size={30} />
                    <Text style={styles.goalText}>Weight Gain</Text>
                    <Text style={styles.goalSubText}>Gain Healthy Weight</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
  goalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  goalSubText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5
  },
  goalBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})*/

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Input from './../../components/input';
import {
  BodyPartMuscleIcon,
  BodyWeightIcon,
  FemaleSymbolIcon,
  MaleSymbolIcon,
  WeightScaleIcon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Colors from './../../shared/colors';
import Button from '../../components/button';
import { useMutation } from 'convex/react';
import { api } from './../../convex/_generated/api';
import { UserContext } from './../../context/userContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import prompt from '../../shared/prompt';
import { CalculateCaloriesAI } from '../../services/aiModel';

export default function preference() {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState();
  const [goal, setGoal] = useState();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const UpdateUserPref = useMutation(api.users.UpdateUserPref)

  useEffect(() => {
    console.log('User context on preference load:', user);
    if (!user?._id) {
      Alert.alert('User not logged in', 'Please login again.', [
        {
          text: 'OK',
          onPress: () => router.replace('/auth/signin'),
        },
      ]);
    }
  }, [user]);

  const Oncontinue = async () => {
    console.log('User in preference screen:', user);

    if (!weight || !height || !gender) {
      Alert.alert('All Credentials Necessary');
      return;
    }

    /*if (!user || !user._id) {
      console.error('User UID is missing');
      Alert.alert('User not authenticated');
      return;
    }*/

    const uid = user._id;

    const promptData = {
      weight,
      height,
      gender,
      goal,
    };

    const PROMPT = JSON.stringify(promptData) + prompt.CALORIES_PROMPT;
    console.log('PROMPT sent to AI:', PROMPT);

    try {
      const AIResult = await CalculateCaloriesAI(PROMPT);
      const AIResp = AIResult.choices[0].message.content;

      console.log('AI raw response:', AIResp);

      /*const match = AIResp.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error('AI did not return valid JSON');
        router.replace('/tabs/home');
        return;
      }*/

      //const fixedJSON = AIResp.replace('```json', '').replace('```', '');
      //const JSONContent = JSON.parse(fixedJSON);
      const match = AIResp.match(/```json([\s\S]*?)```/);
      if (!match) {
        console.error('No JSON block found in AI response');
        router.replace('/tabs/home');
        return;
      }

      const jsonString = match[1].trim();

      const JSONContent = JSON.parse(jsonString);
      console.log('Parsed AI JSON:', JSONContent);

      const updatePayload = {
        uid,
        weight,
        height,
        gender,
        goal,
        ...JSONContent,
      };

      console.log("Sending to Convex:", updatePayload);
      await UpdateUserPref(updatePayload);

      setUser((prev) => ({
        ...prev,
        ...updatePayload,
      }));

      router.replace('/tabs/home');
    } catch (err) {
      console.error('Error in AI calories calculation:', err);
      router.replace('/tabs/home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Tell us about Yourself</Text>
      <Text style={styles.subHeading}>This help us Create your Personalized Meal Plan</Text>

      <View style={styles.inputRow}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input placeholder={'eg 72'} label='Weight (Kg)' labelStyle={{ fontWeight: 'bold' }}
            onChangeText={setWeight}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input placeholder={'eg 5.11'} label='Height (ft)' labelStyle={{ fontWeight: 'bold' }}
            onChangeText={setHeight}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity
            onPress={() => setGender('Male')}
            style={[
              styles.genderBox,
              gender === 'Male' && {
                borderColor: 'red',
                borderWidth: 2
              }
            ]}>
            <HugeiconsIcon icon={MaleSymbolIcon} size={40} color={Colors.BLUE} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender('Female')}
            style={[
              styles.genderBox,
              gender === 'Female' && {
                borderColor: 'red',
                borderWidth: 2
              }
            ]}>
            <HugeiconsIcon icon={FemaleSymbolIcon} size={40} color={Colors.PINK} />
          </TouchableOpacity>


        </View>
      </View>

      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>What's your Goal?</Text>

        <TouchableOpacity
          onPress={() => setGoal('Weight Loss')}
          style={[
            styles.goalBox,
            goal === 'Weight Loss' && {
              borderColor: 'red',
              borderWidth: 2
            }
          ]}>
          <HugeiconsIcon icon={BodyWeightIcon} size={30} style={styles.goalIcon} />
          <View>
            <Text style={styles.goalText}>Weight Loss</Text>
            <Text style={styles.goalSubText}>Reduce Body Fat</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal('Muscle Gain')}
          style={[
            styles.goalBox,
            goal === 'Muscle Gain' && {
              borderColor: 'red',
              borderWidth: 2
            }
          ]}>
          <HugeiconsIcon icon={BodyPartMuscleIcon} size={30} style={styles.goalIcon} />
          <View>
            <Text style={styles.goalText}>Muscle Gain</Text>
            <Text style={styles.goalSubText}>Build Lean Muscle</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal('Weight Gain')}
          style={[
            styles.goalBox,
            goal === 'Weight Gain' && {
              borderColor: 'red',
              borderWidth: 2
            }
          ]}>
          <HugeiconsIcon icon={WeightScaleIcon} size={30} style={styles.goalIcon} />
          <View>
            <Text style={styles.goalText}>Weight Gain</Text>
            <Text style={styles.goalSubText}>Gain Healthy Weight</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title={'continue'} onPress={Oncontinue} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
    paddingBottom: 40,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  genderLabel: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
  },
  genderRow: {
    flexDirection: 'row',
  },
  genderBox: {
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  goalSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  goalIcon: {
    marginRight: 15,
  },
  goalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalSubText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2,
  },
  buttonWrapper: {
    marginTop: 20,
    width: '100%',
  },
});

