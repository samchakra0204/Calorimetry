import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import Colors from './../shared/colors';
import { UserContext } from './../context/userContext'
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RefreshDataContext } from '../context/refreshdatacontext';

export default function todayprogress() {
    const {user} = useContext(UserContext);
    const [totalCaloriesConsumed, setTotalCaloriesConsumed]=useState(0);
    const convex=useConvex();
    const {refreshData, setRefreshData} = useContext(RefreshDataContext)
    useEffect(()=>{
        user&&GetTotalCaloriesConsumed();
    },[user, refreshData])
    const GetTotalCaloriesConsumed=async()=>{
        const result=await convex.query(api.mealplan.GetTotalCaloriesConsumed, {
            date: moment().format('DD/MM/YYYY'),
            uid: user?._id
        })
        console.log(result);
        setTotalCaloriesConsumed(result);
    }
    return (
        <View style={{
            marginTop: 15,
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Today's Goal</Text>
                <Text style={{
                    fontSize: 18
                }}>{moment().format('MMM DD, yyyy')}</Text>
            </View>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
                color: 'blue'
            }}>{totalCaloriesConsumed}/{user?.calories} KCal</Text>
            <Text style={{
                textAlign: 'center',
                marginTop: 2,
                fontSize: 16
            }}>You are doing Great !</Text>
            <View style={{
                backgroundColor: 'gray',
                height: 10,
                borderRadius: 99,
                marginTop: 15,
                opacity: 0.7
            }}>
                <View style={{
                    backgroundColor: 'blue',
                    width: '70%',
                    height: 10,
                    borderRadius: 99
                }}>

                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <Text>Calories Consumed</Text>
                <Text>Keep it up ! 🔥</Text>
            </View>
        </View>
    )
}